from dotenv import load_dotenv
from pathlib import Path
import os
import asyncio
import discord
from datetime import datetime, timezone
import pytz
import gspread
from google.oauth2.service_account import Credentials

root_dir = Path(__file__).resolve().parent.parent.parent.parent
dotenv_path = root_dir / '.env'
if dotenv_path.exists():
    load_dotenv(dotenv_path=dotenv_path)
else:
    load_dotenv()

TOKEN = os.getenv("DISCORD_TOKEN")
CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))
SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
SERVICE_ACCOUNT_EMAIL = os.getenv("GOOGLE_SERVICE_ACCOUNT_EMAIL")
PRIVATE_KEY = os.getenv("GOOGLE_PRIVATE_KEY").replace("\\n", "\n")
PING_ROLE_ID = os.getenv("DISCORD_PING_ROLE_ID")  # set to a role ID, or leave unset to ping @everyone
EVENT_TZ = pytz.timezone("America/Chicago")

def parse_dt(val):
    val = str(val).strip()
    for fmt in ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M", "%m/%d/%Y %H:%M:%S", "%m/%d/%Y %H:%M"]:
        try:
            return datetime.strptime(val, fmt)
        except:
            continue
    raise ValueError(f"Cannot parse datetime: {val}")

def get_sheet_events():
    creds = Credentials.from_service_account_info(
        {
            "type": "service_account",
            "project_id": "discord-bot-490222",
            "private_key_id": "f1821ed28e81a759633cf484b4fc4bcf98318a66",
            "private_key": PRIVATE_KEY,
            "client_email": SERVICE_ACCOUNT_EMAIL,
            "token_uri": "https://oauth2.googleapis.com/token",
        },
        scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
    )
    client = gspread.authorize(creds)
    sheet = client.open_by_key(SHEET_ID).sheet1
    return sheet.get_all_records()

def build_message(event):
    title = (str(event.get("title") or "Untitled")).strip()
    location = event.get("location")
    start_time = event.get("startTime")
    end_time = event.get("endTime")

    ping = f"<@&{PING_ROLE_ID}>" if PING_ROLE_ID else "@everyone"
    lines = [f"{ping} **{title}** is starting in 10 minutes!"]
    if location:
        lines.append(f"Location: {location}")

    time_str = None
    if start_time and end_time:
        try:
            start_dt = EVENT_TZ.localize(parse_dt(start_time))
            end_dt = EVENT_TZ.localize(parse_dt(end_time))
            time_str = f"Time: {start_dt.strftime('%I:%M %p')} – {end_dt.strftime('%I:%M %p %Z')}"
        except:
            pass
    elif start_time:
        try:
            start_dt = EVENT_TZ.localize(parse_dt(start_time))
            time_str = f"Starts at: {start_dt.strftime('%I:%M %p %Z')}"
        except:
            pass
    elif end_time:
        try:
            end_dt = EVENT_TZ.localize(parse_dt(end_time))
            time_str = f"Ends at: {end_dt.strftime('%I:%M %p %Z')}"
        except:
            pass
    if time_str:
        lines.append(time_str)

    return "\n".join(lines)

class MyClient(discord.Client):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.announced = set()

    async def on_ready(self):
        print(f"Logged in as {self.user}")
        self.loop.create_task(self.announcement_loop())

    async def announcement_loop(self):
        await self.wait_until_ready()
        channel = self.get_channel(CHANNEL_ID) or await self.fetch_channel(CHANNEL_ID)
        print(f"Watching channel: {channel.name}")

        while not self.is_closed():
            try:
                events = await asyncio.get_event_loop().run_in_executor(None, get_sheet_events)
                print(f"Fetched {len(events)} events")
                now = datetime.now(timezone.utc)

                for event in events:
                    event_id = event.get("ID")
                    start_str = event.get("startTime")
                    if not start_str or event_id is None:
                        continue

                    start_dt = parse_dt(start_str)
                    start_dt = EVENT_TZ.localize(start_dt)

                    delta = (start_dt.astimezone(timezone.utc) - now).total_seconds()
                    if 570 < delta <= 600 and event_id not in self.announced:
                        if PING_ROLE_ID:
                            mentions = discord.AllowedMentions(roles=True)
                        else:
                            mentions = discord.AllowedMentions(everyone=True)
                        await channel.send(build_message(event), allowed_mentions=mentions)
                        self.announced.add(event_id)
                        print(f"Announced: {event.get('title')}")

            except Exception as e:
                print(f"Error: {e}")

            await asyncio.sleep(30)

intents = discord.Intents.default()
client = MyClient(intents=intents)
client.run(TOKEN)