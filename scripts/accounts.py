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
    cursor.execute("SELECT DISTINCT user_id FROM Application;")
    application_query = cursor.fetchall()
    print(f"Application Users: {len(application_query)}")
    
    if application_query:
        user_roles = [(row[0], 'INSERT_ROLE_ID_HERE') for row in application_query]
        cursor.executemany(
            "INSERT INTO user_role (user_id, role_id) VALUES (%s, %s);",
            user_roles
        )
        connection.commit()
        print(f"Inserted {len(user_roles)} users into user_role table")        

except Exception as error:
    print(f"Error connecting to the database: {error}")

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed")