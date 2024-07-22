# Task Manager Application

## Introduction
This project is a Task Manager Application similar to Trello. It allows users to create, update, and manage tasks within different columns. Users can move tasks between columns using drag-and-drop functionality. The application also includes user authentication with the option to log in via Google.

## Table of Contents
1. [Demo](#demo)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7.  [Security](#security)
8. [Contact](#contact)

## Demo
 Live Website : https://task-manager-application-seven.vercel.app/


## Features
- **User Authentication**: Sign up and log in, including Google login.
- **Drag-and-Drop Functionality**: Easily move tasks between columns.
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Responsive Design**: User interface adapts to different screen sizes.
- **Routing**: Implemented throughout the application.
- **Validation**: Server-side validation for task data and user data.

### Bonus Features
- Task sorting and searching capabilities.

## Technologies Used
- **Front-End**: React, Material-UI (MUI), React-DnD
- **Back-End**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase for Google login, JWT for regular authentication
- **Version Control**: Git
- **Deployment**: Render, Vercel

## Setup Instructions
1. Clone the repository
    ```javascript
    git clone https://github.com/debabrata-pw08-429/Task-Manager-Application.git
    cd Task-Manager-Application
    ```
2. Install dependencies
    ```javascript
    # For front-end
    cd client
    npm install
    
    # For back-end
    cd ../server
    npm install
    ```
3. Set up environment variables
   - Create a `.env` file in the root directory of the server and add the following variables:
    ```javascript
    MONGO_URI = <your_mongo_db_uri>
    JWT_SECRET = <your_jwt_secret>
    GOOGLE_CLIENT_ID = <your_google_client_id>
    GOOGLE_CLIENT_SECRET = <your_google_client_secret>
    ```
4. Run the application
    ```javascript
    # Start the back-end server
    cd server
    npm start
    
    # Start the front-end application
    cd ../client
    npm start
    ```
## Usage
1. Sign up or log in to your account.
2. Create a new task by clicking the "Add Task" button.
3. Drag and drop tasks between columns to organize them.
4. Update or delete tasks by clicking on the task and using the provided options.

## API Endpoints
1. User Routes
   - `POST /api/users/register`: Register a new user
   - `POST /api/users/login`: Log in a user
   - `POST /api/users/google-login`: Log in a user via Google
2. Task Routes
   - `GET /api/tasks`: Get all tasks
   - `POST /api/tasks`:  Create a new task
   - `PUT /api/tasks/:id`: Update a task
   - `DELETE /api/tasks/:id`: Delete a task

## Security
- Use environment variables for sensitive data.
- Implement JWT for authentication and secure API routes.
- Validate user inputs on both client and server sides.
- Use HTTPS in production.

## Contact
- For any questions or feedback, please contact:
  Email: debabrata.join@gmail.com



