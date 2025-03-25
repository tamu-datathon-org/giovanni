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
    
    emails = []

    # Fetch user_id for the given emails
    query = sql.SQL("SELECT DISTINCT email, user_id FROM Application WHERE email = ANY(%s);")
    cursor.execute(query, (emails,))
    email_user_id = cursor.fetchall()
    
    # Find their existing roles
    query = sql.SQL("SELECT role.id, role.name, email FROM (SELECT role_id, email FROM user_role LEFT JOIN application ON user_role.user_id = application.user_id WHERE email = ANY(%s)) LEFT JOIN role ON role_id = role.id;")
    cursor.execute(query, (emails,))
    user_role_query = cursor.fetchall()
    
    # Possible event roles
    query = sql.SQL("SELECT role.id, role.name FROM role LEFT JOIN event ON role.event_id = event.id WHERE event.name = %s;")
    cursor.execute(query, (os.getenv("EVENT_NAME"),))
    possible_roles = cursor.fetchall()
    
    
    print(f"Organizer Accounts: {email_user_id}")
    print(f"User Role Accounts: {user_role_query}")
    print(f"Roles: {possible_roles}")
    
    Desired_role = os.getenv("INSERT_USER_ROLE_NAME").lower()
    
    Desired_role_id = None
    found = False
    for role_id, role_name in possible_roles:
        if Desired_role in role_name.lower():
            found = True
            Desired_role_id = role_id
            break
    print(f"Wanted Roles: {Desired_role}, {Desired_role_id}")
    
    if not found:
        raise Exception("Role not found")
    
    print(f"\nStart processing:")
    if email_user_id and user_role_query and possible_roles:
        for email, user_id in email_user_id:
            email_roles = set([role[0] for role in user_role_query if role[2] == email])
            print(f"Email: {email} \nEmail Roles: {email_roles}")
            
            current_role = None
            for role_id, role_name in possible_roles:
                if role_id in email_roles:
                    current_role = (role_id, role_name)
                    break
            
            print(f"Current Role: {current_role}")
            
            if current_role:
                if current_role[0] != Desired_role_id:
                    cursor.execute(
                        "UPDATE user_role SET role_id = %s WHERE user_id = %s AND role_id = %s;",
                        (Desired_role_id, user_id, current_role[0])
                    )
                    print(f"Updated role for user {email} to {Desired_role}")
                else:
                    print(f"User {email} already has role {Desired_role}")
            else:
                cursor.execute(
                    "INSERT INTO user_role (user_id, role_id) VALUES (%s, %s);",
                    (user_id, Desired_role_id)
                )
                print(f"Inserted new role for user {email}")
        connection.commit()
        
    #     # Check and update roles for existing users
    #     for user_id, email in email_user_id:
    #         existing_roles = [role[0] for role in user_role_query if role[1] == email]
    #         for role_id, role_name in possible_roles:
    #             if role_id not in existing_roles:
    #                 if "applicant" in role_name.lower():
    #                 # Update applicant role to the new role
    #                 cursor.execute(
    #                     "UPDATE user_role SET role_id = %s WHERE user_id = %s AND role_id = %s;",
    #                     (role_id, user_id, os.getenv("USER_ROLE_ID"))
    #                 )
    #                 print(f"Updated role for user {email} to {role_name}")
    #                 else:
    #                 # Skip if it's not an applicant role
    #                 print(f"Skipped updating role for user {email} as it's not an applicant role")
    #             else:
    #                 print(f"User {email} already has role {role_name}")

    #     # Insert new roles for users without any existing roles
    #     new_user_roles = [
    #         (user_id, role_id) for user_id, email in email_user_id
    #         for role_id, role_name in possible_roles
    #         if user_id not in [role[0] for role in user_role_query]
    #     ]
    #     if new_user_roles:
    #         cursor.executemany(
    #         "INSERT INTO user_role (user_id, role_id) VALUES (%s, %s);",
    #         new_user_roles
    #         )
    #         connection.commit()
    #         print(f"Inserted {len(new_user_roles)} new roles into user_role table")

except Exception as error:
    print(f"Error connecting to the database: {error}")

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed")