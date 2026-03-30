# Discord Announcement Bot

This bot polls a Google Sheet and posts a Discord announcement **10 minutes before** each event starts.
To add or edit events just update the Google Sheet directly.

## What it does

- Reads event rows from the first worksheet in `GOOGLE_SHEET_ID`
- Parses `startTime`/`endTime` from each row
- Checks every 30 seconds for events that are 10 minutes away
- Sends one announcement per event ID to `DISCORD_CHANNEL_ID`
- Pings either:
  - a specific role via `DISCORD_PING_ROLE_ID`, or
  - `@everyone` when no role ID is configured

## Expected sheet columns

The bot currently expects these column names:

- `ID` (unique event identifier)
- `title`
- `location` (optional)
- `startTime`
- `endTime` (optional)

`startTime` and `endTime` can be in one of these formats:

- `YYYY-MM-DD HH:MM:SS`
- `YYYY-MM-DD HH:MM`
- `MM/DD/YYYY HH:MM:SS`
- `MM/DD/YYYY HH:MM`

Timezone used for parsing/display is currently hardcoded to `America/Chicago`.

## Environment variables

Required:

- `DISCORD_TOKEN`
- `DISCORD_CHANNEL_ID`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `DISCORD_PING_ROLE_ID` (if unset, bot uses `@everyone`)


## Run locally

From repo root:

```bash
cd apps/discord-bot
python3 -m venv venv
source venv/bin/activate (Mac)
venv\Scripts\activate (Windows)
pip install -r requirements.txt
python src/main.py
```


## Run with Docker

From `apps/discord-bot`:

```bash
docker build -t discord-bot .
docker run --name discord-bot --env-file ../../.env discord-bot
```

Detached with restart policy:

```bash
docker run -d --restart unless-stopped --name discord-bot --env-file ../../.env discord-bot
```

Logs:

```bash
docker logs -f discord-bot
```

Stop/remove:

```bash
docker stop discord-bot
docker rm discord-bot
```


## Reliability and improvement roadmap

Improvements:

1. **Persist announcement state**  
   `self.announced` resets on restart. Store announced IDs in Redis/DB/file so restarts do not duplicate pings.

2. **Make timing configurable**  
   Add env vars like:
   - `ANNOUNCE_BEFORE_MINUTES` (default 10)
   - `POLL_INTERVAL_SECONDS` (default 30)

3. **Validate env vars at startup**  
   Fail fast with clear errors if required vars are missing/malformed.

4. **Handle sheet/schema drift gracefully**  
   Validate required columns and log missing/invalid rows without crashing the loop.
