# Cloud Technologies Project1 Web API Details
## Author 
Shivam Tomar (shivam.tomar@sjsu.edu)

## Overview
This Web Service contains the endpoints required for Cloud Technologies Project1.

### Techstack
Framework used: **Node.js**
Server used: **Express**
Port at which Server listens for requests: **3000**

## Web API Endpoints exposed

1. **/getUrls**
#### Description
It returns the URL to the files uploaded by user to S3 storage.
HTTP verb: GET
query params:
   key=user_name
   value={user name for the user logged in user}
   
2. **/addurl**   
It adds the S3 storgae url to the database.
HTTP verb: POST
POST body structure:
{
user_name: {user name of logged in user},
usl: {URL of the file}
}

3. **/updateurl**
It updates the modify date for the url.
HTTP verb: POST
POST body structure:
{
usl: {URL of the file}
}

4. **/adduser**
Adds new user to the database.
HTTP verb: POST
POST body structure:
{
user_name: {user name of new user},
first_name: {first name of new user},
last_name: {last name of new user},
password: {password of new user}
}

5. **/login**
Authenticates user name and password of user.
HTTP verb: POST
POST body structure:
{
user_name: {user name of new user},
password: {password of new user}
}

6. **/deleteurl**
Deletes the url from database.
HTTP verb: POST
POST body structure:
{
url: url
}

7. **/logout**
Logs out user and redirect user to login page.
HTTP verb: GET

8. **/login**
Return the login page.
HTTP verb: GET

7. **/user**
Return the user dashboard.
HTTP verb: GET












