User Management System

Overview

The User Management System is a simple web application that allows users to view, add, edit, and delete users. It interacts with JSONPlaceholder as a mock backend for demonstration purposes. The application provides a user-friendly interface for managing user details.

Features

View Users: Fetch and display a list of users from the API.

Add User: Allow users to add new entries by submitting a form.

Edit User: Modify existing user details and update them in the UI.

Delete User: Remove a user from the list.

Error Handling: Display error messages when API requests fail.

Client-Side Validation: Validate form inputs before submitting.

Pagination for user listing.

Technologies Used :

Frontend: HTML, CSS, JavaScript, React.js

State Management: React Hooks (useState, useEffect)

API Interaction: Fetch API

Styling: CSS Modules / Tailwind CSS (optional)

Installation & Setup

Prerequisites

Node.js installed (Download)

A code editor like VS Code

Internet connection (for API requests)

Steps

Clone the repository:

git clone https://github.com/yourusername/user-management-system.git
cd user-management-system

Install dependencies:

npm install

Start the development server:

npm start

Open the browser and navigate to http://localhost:3000.

API Endpoints

Fetch Users: GET https://jsonplaceholder.typicode.com/users

Add User: POST https://jsonplaceholder.typicode.com/users

Edit User: PUT https://jsonplaceholder.typicode.com/users/:id

Delete User: DELETE https://jsonplaceholder.typicode.com/users/:id

Usage Guide

Viewing Users

Upon loading, the app fetches and displays all users in a table/list.

Each user row contains Edit and Delete buttons.

Adding a User

Click on the Add User button.

Fill in the required details (First Name, Last Name, Email, Department).

Click Submit to add the user.

Editing a User

Click the Edit button on a user row.

Modify the user details in the form.

Click Update to save changes.

Deleting a User

Click on the Delete button next to a user to remove them from the list.

Error Handling

If the API request fails, an appropriate error message is displayed.

If a user is not found, a fallback dummy user is displayed.

Form validation ensures required fields are filled.

Deployed Link: https://symphonious-sunburst-0b07d6.netlify.app/

