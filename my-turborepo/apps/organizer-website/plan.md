# Planning out groups and accept/deny offers

## Adding Dietary groups

1. Create databases entries for Check-in and Lunch
2. Add a new column in events table to include an array of groups
3. Add a new column into applicants table to include their group
4. In the acceptance procedure I need to add a function that will look at all of the groups for an event and assign them to the user
5. Have this group info show up on the qr code page

## Adding accept or deny

1. Add a new column in applicants table to include if they accepted or declines or wait-listed
2. Add a new column to events to include capacity
3. UI Change: Determine if a user was accepted and show a button for them to confirm or deny
4. Show final decision them make and allow them to edit it.
5. Change emails to have [Action needed] and more details about accepting their confirmation
