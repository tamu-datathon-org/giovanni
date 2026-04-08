from dotenv import load_dotenv
from pathlib import Path
import os
import asyncio
import discord
from datetime import datetime, timezone, timedelta
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

POLL_INTERVAL_SEC = 20
ANNOUNCE_GRACE = timedelta(seconds=30)


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
    description = event.get("description")
    delay = int(event.get("delay")) # delay in minutes

    ping = f"<@&{PING_ROLE_ID}>" if PING_ROLE_ID else "@everyone"
    lines = []
    
    # build title
    title = f"{ping} **{title}** is starting in {delay} minutes!" if delay != 0 else f"{ping} **{title}** is starting now!"
    lines.append(title)
            
    # build time
    time_str = None
    if start_time and end_time:
        try:
            start_dt = EVENT_TZ.localize(parse_dt(start_time))
            end_dt = EVENT_TZ.localize(parse_dt(end_time))
            time_str = f"Time: {start_dt.strftime('%I:%M %p')} - {end_dt.strftime('%I:%M %p %Z')}"
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
        
    # build location
    if location:
        lines.append(f"Location: {location}")

    # build description
    if description:
        lines.append(f"Description: {description}")

    return "\n".join(lines)

class MyClient(discord.Client):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.announced = set()

    async def on_ready(self):
        print(f"Logged in as {self.user}", flush=True)
        self.loop.create_task(self.announcement_loop())

    async def announcement_loop(self):
        await self.wait_until_ready()
        channel = self.get_channel(CHANNEL_ID) or await self.fetch_channel(CHANNEL_ID)
        print(f"Watching channel: {channel.name}", flush=True)
        events_len = 0
        while not self.is_closed():
            try:
                events = await asyncio.get_event_loop().run_in_executor(None, get_sheet_events)
                if(events_len != len(events)):
                    events_len = len(events)
                    print(f"Fetched {events_len} events", flush=True)
                now = datetime.now(timezone.utc)

                for event in events:
                    event_id = event.get("id")
                    start_str = event.get("startTime")
                    delay = int(event.get("delay"))  # delay in minutes

                    if not start_str or event_id is None:
                        continue

                    start_dt = EVENT_TZ.localize(parse_dt(start_str))
                    start_utc = start_dt.astimezone(timezone.utc)
                    announce_at = start_utc - timedelta(minutes=delay)
                    if not (announce_at <= now < announce_at + ANNOUNCE_GRACE):
                        continue
                    if event_id not in self.announced:
                        if PING_ROLE_ID:
                            mentions = discord.AllowedMentions(roles=True)
                        else:
                            mentions = discord.AllowedMentions(everyone=True)
                        await channel.send(build_message(event), allowed_mentions=mentions)
                        self.announced.add(event_id)
                        print(f"Announced: {event.get('title')}", flush=True)

            except Exception as e:
                print(f"Error: {e}", flush=True)

            await asyncio.sleep(POLL_INTERVAL_SEC)

intents = discord.Intents.default()
client = MyClient(intents=intents)
client.run(TOKEN)
