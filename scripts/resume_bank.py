import pandas as pd
import os
import psycopg
from psycopg import sql
from dotenv import load_dotenv
import requests
from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO

load_dotenv()

resume_list = []

'''
Input: EVENT_NAME, POSTGRES_URL
Output: ./output/combined_output.pdf

Generate a resume bank from all the accepted resumes based on the event.
'''

# Extract resume links from database
try:
    connection = psycopg.connect(os.getenv("POSTGRES_URL"))
    cursor = connection.cursor()
    print("Connected to the database successfully")
    
    event_name = os.getenv("EVENT_NAME")
    cursor.execute("SELECT id, name FROM EVENT WHERE name = %s;", (event_name,))
    event_query = cursor.fetchone()
    
    if not event_query:
        print("Event not found")
        exit()
    
    # Querying for all user resumes
    cursor.execute('''
                   WITH Deduplicated AS (
                       SELECT ur.user_id, ur.resume_url
                       FROM USER_RESUME ur
                       GROUP BY ur.user_id, ur.resume_url
                    )
                   SELECT app.user_id, dd.resume_url FROM Application app LEFT JOIN Deduplicated dd
                   ON app.user_id = dd.user_id 
                   WHERE app.status = 'accepted' AND dd.resume_url IS NOT NULL AND event_id = %s;''', (event_query[0],))
    resume_query = cursor.fetchall()
    
    resume_list = [row[1] for row in resume_query]
    print(f"Resumes: {len(resume_query)}")

except Exception as error:
    print(f"Error connecting to the database: {error}")

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed")


# Function to download a PDF from a URL
def download_pdf(url):
    response = requests.get(url)
    response.raise_for_status()  # Ensure the request was successful
    return BytesIO(response.content)  # Return PDF as in-memory file

# Create a PdfWriter object for the final combined PDF
pdf_writer = PdfWriter()

# Loop through each URL, download the PDF and add its pages to the writer
for pdf_url in resume_list:
    try:
        pdf_file = download_pdf(pdf_url)  # Download the PDF as a BytesIO object
        pdf_reader = PdfReader(pdf_file)  # Read the PDF from the in-memory file

        # Add each page of the current PDF to the PdfWriter
        for page in range(len(pdf_reader.pages)):
            pdf_writer.add_page(pdf_reader.pages[page])
    except Exception as e:
        print(f"Error processing {pdf_url}: {e}")

# Save the combined PDF to a file
with open("./output/resume_bank.pdf", "wb") as output_file:
    pdf_writer.write(output_file)

print("PDFs have been successfully combined!")