import pandas as pd
import os
import psycopg
from psycopg import sql
from dotenv import load_dotenv
load_dotenv()

def insert_into_db(schema, csv_file):
    df = pd.read_csv(csv_file)

    try:
        connection = psycopg.connect(os.getenv("POSTGRES_URL"))
        cursor = connection.cursor()
        print("Connected to the database successfully")

        columns = df.columns.tolist()
        values = [tuple(row) for row in df.itertuples(index=False, name=None)]
        insert_query = sql.SQL("INSERT INTO {} ({}) VALUES ({})").format(
            sql.Identifier(schema),
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join(sql.Placeholder() * len(columns))
        )

        cursor.executemany(insert_query, values)
        connection.commit()
        print(f"Inserted {len(values)} rows into {schema} table")

    except Exception as error:
        print(f"Error connecting to the database: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Database connection closed")

FILE_NAME = 'email_list.csv'

# Connect to the PostgreSQL database
try:
    insert_into_db('email_list', FILE_NAME)
except Exception as error:
    print(f"Error connecting to the database: {error}")