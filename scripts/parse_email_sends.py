import pandas as pd
import re

'''
Input: log of vercel, database email logs
Output: intersection/outersection of emails

Quick Way to check the emails that have been sent and compare them to those that
haven't been sent. The csv was really dirty and had 'receiverEmail' in random
cells throughout the entire page. This extracts the data with regex and compares two
lists of emails.
'''

FILE_NAME = 'logs_result.csv'

df = pd.read_csv(FILE_NAME)
print(df['message'])

contains_receiver_email = df.applymap(lambda x: 'receiverEmail' in str(x))
def extract_emails(text):
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return re.findall(email_pattern, text)

# extract emails
df['emails'] = df['message'].apply(lambda x: extract_emails(str(x)))
all_emails = [email for sublist in df['emails'] for email in sublist]
unique_emails = list(set(all_emails))
print(len(unique_emails))
print(unique_emails)

# Insert drizzle csv that has all the emails supposedly sent emails
drizzle_df = pd.read_csv('drizzle-data-2024-11-06T16_35_14.658Z.csv')
print(drizzle_df['email'])
drizzle_emails = drizzle_df['email'].tolist()
intersection_emails = list(set(drizzle_emails) & set(unique_emails))
outersection_emails = list(set(drizzle_emails) ^ set(unique_emails))

# Check the email lists
print(f"Intersection length: {len(intersection_emails)}")
print(f"Outersection length: {len(outersection_emails)}")