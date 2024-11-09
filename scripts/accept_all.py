import os
import psycopg
from psycopg import sql
from dotenv import load_dotenv
load_dotenv()

# Connect to the PostgreSQL database
try:
    connection = psycopg.connect(os.getenv("POSTGRES_URL"))
    cursor = connection.cursor()
    print("Connected to the database successfully")

    # Example query
    cursor.execute("SELECT id, status FROM Application;")
    application_query = cursor.fetchall()
    print(f"Application Users: {len(application_query)}")
    
    if application_query:
        pending_users = [row[0] for row in application_query if row[1] == 'pending']
        if pending_users:
            cursor.executemany(
            "UPDATE Application SET status = 'accepted' WHERE id = %s;",
            [(user_id,) for user_id in pending_users]
            )
            connection.commit()
            print(f"Updated {len(pending_users)} users to accepted status")

except Exception as error:
    print(f"Error connecting to the database: {error}")

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed")