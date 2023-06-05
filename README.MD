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

    Method: POST
    URL: http://localhost:3000/api/v1/task_manager/login

    Body:
    {
        "email": "johndoe2@gmail.com",
        "password": "Qwerty",
    }
