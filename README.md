
# A Full Stack Mail Service 

This project is a full-stack email application that allows users to send, receive, and manage emails. The application consists of a front-end user interface, a back-end server, and a database to store email data. The project aims to provide a seamless email experience, similar to popular email services like Gmail or Outlook.

## Screenshots
### the Front-end : 
inspired by this design found it in dribble

![App Screenshot](https://i.ibb.co/51zYvYC/mail-app-pic.png)

### Database Schema : 

![App Screenshot](https://i.ibb.co/TKkwwbC/sqlschema.png)


## Tech Stack 
- __Front-End__ : HTML, CSS, JavaScript
- __Back-End__: Django, Django REST framework
- __Database__: Sqlite3 for simplicity,  you can use any another relational database
- __Authentication__: JWT (JSON Web Tokens)


## *Features*

  ### Front-end :
- __User Authentication__ : Users can sign up, log in, and reset their passwords securely.
- __Dashboard__ : A user-friendly dashboard displaying the user's inbox, sent items, Trash, and archived emails.
- __Compose Email__ : Users can compose and send new emails to one or multiple recipients.
- __Email Viewing__ : Clicking on an email in the inbox or other folders opens the email for viewing.
- __Search Functionality__ :  Users can search their emails based on various criteria, such as sender, subject, or date.
- __Folders__ :  Users can organize emails into folders they create like work , personal ...

### Back-End :
- __User Data__: Store user profiles, including username, password hashes, and profile details.
- __Emails__: Store email metadata (sender, receiver, subject, date) and email content.
- __Folders__: Create a schema to organize emails into folders.
- __Security__: Implement some security measures to protect user data and prevent unauthorized access.




