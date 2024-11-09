import pandas as pd
import re

FILE_NAME = 'logs_result.csv'

df = pd.read_csv(FILE_NAME)
print(df['message'])

contains_receiver_email = df.applymap(lambda x: 'receiverEmail' in str(x))
def extract_emails(text):
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return re.findall(email_pattern, text)

df['emails'] = df['message'].apply(lambda x: extract_emails(str(x)))
all_emails = [email for sublist in df['emails'] for email in sublist]
unique_emails = list(set(all_emails))
print(len(unique_emails))
print(unique_emails)

drizzle_df = pd.read_csv('drizzle-data-2024-11-06T16_35_14.658Z.csv')
print(drizzle_df['email'])
drizzle_emails = drizzle_df['email'].tolist()
intersection_emails = list(set(drizzle_emails) & set(unique_emails))
outersection_emails = list(set(drizzle_emails) ^ set(unique_emails))

print(outersection_emails)

print(f"Intersection length: {len(intersection_emails)}")
print(f"Outersection length: {len(outersection_emails)}")