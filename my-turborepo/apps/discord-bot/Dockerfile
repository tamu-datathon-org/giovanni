FROM python:3.12-slim

WORKDIR /app

COPY ./apps/discord-bot/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./apps/discord-bot/src/ ./src/

CMD ["python", "src/main.py"]
