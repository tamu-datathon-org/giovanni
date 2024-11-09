import pandas as pd
import os
import psycopg
from psycopg import sql
from dotenv import load_dotenv
load_dotenv()

df = pd.read_csv('user.csv')
find_emails = [
    'rishabjadhav@gmail.com', 'rishabjadhav@tamu.edu', 'timothytsai1@tamu.edu',
    'timothy.yt.tsai@gmail.com', 'kristinelam917@gmail.com', 'kristinelam@tamu.edu',
    'sumshiu@tamu.edu', 'dudeitzznova@gmail.com', 'sreevikram.r@gmail.com',
    'sreevikram.r@tamu.edu', 'ambercj@tamu.edu', 'zhengj846@gmail.com',
    'rbjiroviii@tamu.edu', 'ranceblancaflor@gmail.com', 'timothytsai1@tamu.edu',
    'timothy.yt.tsai@gmail.com', 'Cindy.lam191@gmail.com', 'Cindy.lam191@tamu.edu',
    'mallikaparajuli@tamu.edu', 'akil.anbu@gmail.com', 'ddmds66@gmail.com',
    'redninjale@gmail.com', 'hkorad@tamu.edu', 'sreevikram.r@gmail.com',
    'jonathan.a.herrera0@tamu.edu', 'zeeshanchatur@gmail.com', 'Weiwu@tamu.edu',
    'betheony@tamu.edu', 'aniketshirodkar@tamu.edu'
]

emails = [(row['email'], row['id']) for index, row in df.iterrows() if row['email'] in find_emails]

print("Emails Found: " + str(len(emails)))

not_found_emails = [email for email in find_emails if email not in [user[0] for user in emails]]
print(f"Emails Not Found: {len(not_found_emails)}")
print("Not Found Emails: ", not_found_emails)

if len(emails) == 0:
    print("No emails found")
    exit()

try:
    connection = psycopg.connect(os.getenv("POSTGRES_URL"))
    cursor = connection.cursor()
    print("Connected to the database successfully")

    # Example query
    query = sql.SQL("SELECT user_id, role_id FROM user_role WHERE user_id IN ({})").format(
        sql.SQL(',').join(map(sql.Literal, [user[1] for user in emails]))
    )
    
    cursor.execute(query)
    roles_query = cursor.fetchall()
    user_ref = [str(row[0]) for row in roles_query]
    role_ref = [str(row[1]) for row in roles_query]
    print(f"Query: {len(roles_query)}")
    
    unmatched = []
    
    for user in emails:
        if user[1] in user_ref and role_ref[user_ref.index(user[1])] == os.getenv('USER_ROLE_ID'):
            print("Existing User "+ user[0] + ' ' + user[1])
        else:
            unmatched.append(user[1])
    
    print(unmatched)
    if len(unmatched) > 0:
        user_roles = [(row, os.getenv('USER_ROLE_ID')) for row in unmatched]
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