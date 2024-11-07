import os
import psycopg
from psycopg import sql
from dotenv import load_dotenv
import csv
load_dotenv()

# Connect to the PostgreSQL database
try:
    connection = psycopg.connect(os.getenv("POSTGRES_URL"))
    cursor = connection.cursor()
    print("Connected to the database successfully")

    cursor.execute('''SELECT id, first_name, last_name, dietary_restriction, extra_info 
            FROM Application 
            WHERE dietary_restriction IS NOT NULL AND 
                dietary_restriction != '' AND
                status = 'accepted';''')
    dietary_restriction_query = cursor.fetchall()
    print(f"Applications with dietary restrictions: {len(dietary_restriction_query)}")
    
    filtered_rows = []
    for row in dietary_restriction_query:
        if row[3].lower().strip() not in ['n/a', 'no', 'na', 'none', 'nope', 'naw', 'no.', 'nada', 'none!', 'nah']:
            filtered_rows.append(row)

    print(len(filtered_rows))
    # Define the CSV file path
    current_directory = os.path.dirname(os.path.abspath(__file__))
    # Define the CSV file path relative to the current directory
    csv_file_path = os.path.join(current_directory, 'output/dietary_restrictions.csv')
    
    # Write the query results to a CSV file
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['ID', 'First Name', 'Last Name', 'Dietary Restriction', 'Extra Info'])  # Write the header
        for row in filtered_rows:
            writer.writerow(row)

    print(f"Data exported to {csv_file_path} successfully")
except Exception as error:
    print(f"Error querying dietary restrictions: {error}")