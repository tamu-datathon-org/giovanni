from dotenv import load_dotenv
from pathlib import Path
import os
import asyncio
import discord

root_dir = Path(__file__).resolve().parent.parent.parent.parent
dotenv_path = root_dir / '.env'
load_dotenv(dotenv_path=dotenv_path)

TOKEN = os.getenv("DISCORD_TOKEN")
CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))

class MyClient(discord.Client):
    async def on_ready(self):
        print(f"Logged in as {self.user} (id={self.user.id})")
        channel = self.get_channel(CHANNEL_ID)

        if channel is None:
            channel = await self.fetch_channel(CHANNEL_ID)

        await asyncio.sleep(1)
        await channel.send("Test")

intents = discord.Intents.default()
client = MyClient(intents=intents)
client.run(TOKEN)