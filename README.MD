# Task Manager API

This is a basic CRUD app written in NodeJs (express) and MongoDB.

The API allows you to autheticate users and allow them create, read, update and delete tasks.

To use the app:

    git clone https://github.com/maroafenogho/node_task_manager

    # install packages.
    npm install

Get a Mongodb account, and obtain your Mongodb URI.
Create a *.env* file in the root directory of the project, save the mongo URI and JWT secret(You can create one yourself)

    MONGO_URI = mongodb+srv://user:password*****
    JWT_SECRET = *****##*#**

    # start the server
    npm start

## Features

### Authentication
#### Create user
The create user route allows you sign users up to the app.
When signup informtion is received by the controller, a check is carried out to confirm if the email already exists. Existing emails receive a response with a message informing them that the email already exists. If the email does not exist, the received password (as long as it passes the validation criteria) is hashed using bcrypt and the user is successfully signed up.

    Method: POST
    URL: http://localhost:3000/api/v1/task_manager/register

    Body:
        {
            "email": "johndoe2@gmail.com",
            "password": "Qwerty",
            "name": "John Doe",
            "username": "johndoe"
        }
    Response:
    201
        {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiJ9.NjQ1ZjUxMTI2ZGQzYmIyNDgyYjRhOTUy.Rgpoh6-AiNNognJ-cFbxehSE2rn_wjcc90z4i_NDLDI",
        "data": {
            "email": "johndoe2@gmail.com",
            "password": "$2b$10$bEn56NQYC4mVrn6ZaW1QteYXATOrr7/RI7dzXq/keAbNaP40CHQkm",
            "username": "johndoe",
            "name": "John Doe",
            "created_at": "2023-05-13T08:55:13.416Z",
            "_id": "645f51126dd3bb2482b4a952",
            "__v": 0
            }
        }    

#### Login
When the login endpoint is called, the supplied email needs to pass the validator middleware to ensure that a properly formed email is supplied. Once the email passes, the login controller is called. If the email supplied exists, the supplied password is compared to the hashed password in the user's profile. Upon confirmaqtion that the information supplied checks out, the user is logged in. 

    Method: POST
    URL: http://localhost:3000/api/v1/task_manager/login

    Body:
        {
            "email": "johndoe2@gmail.com",
            "password": "Qwerty",
        }

    Response: 200
        {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiJ9.NjQ1ZWMwZjJlMjhiZDZlZjYwMGE4NTBk.4KTEBWXn2qRbpRJhZh0WJXg-oq2YGc2q4y2j16wbLG0",
        "data": {
            "_id": "645ec0f2e28bd6ef600a850d",
            "email": "johndoe@gmail.com",
            "password": "$2b$10$433kNQfuCeXhriQVYiAaY.bjjJ0tXaCgD/0IfDChdVhSAFXU1JrXC",
            "username": "johndoe",
            "name": "John Doe",
            "created_at": "2023-05-12T22:23:35.404Z",
            "__v": 0
            }   
        }

#### Get Profile 
To get a user's profile, the token obtained from the login response is sent together with the get_profile endpoint as an Auth token. The user ID for the token is obtain from the verifyToken middleware. This ID is then used to obtain the user's data from the users collection.

    Method: GET
    URL: http://localhost:3000/api/v1/task_manager/get_profile

    Authorization: Bearer Token

    Response: 200
        {
        "success": true,
        "data": {
            "email": "johndoe@gmail.com",
            "id": "645ec0f2e28bd6ef600a850d",
            "name": "John Doe"
            }
        }

#### <strong>Auth middleware and validators</strong>
Before hitting each auth controller, there are validators to check that the data sent contains valid information. Upon passing, the data is sent to the controller and processed accordingly. 