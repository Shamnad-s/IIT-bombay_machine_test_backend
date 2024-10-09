📚 Library Management System
This project is a Library Management System built using Node.js and Express.js for the backend. The system allows users to manage and maintain book collections and member records, handling essential functionalities like adding, updating, deleting, and viewing books and members. It also includes authentication features to protect restricted actions like managing the library's inventory.

🚀 Key Features

1.Book Management:

Add, update, delete, and view details and history of books.

2.Member Management:

3.Add, update, and delete members.

View member details and borrowing history.
Authentication:

3.Secure login and signup functionality.

Protected routes for managing books and members, accessible only to authorized users.
Authorization Middleware:

4.JWT (JSON Web Token)-based authentication to secure API routes.

🔧 Setup Instructions

Clone the Repository:git clone https://github.com/Shamnad-s/IIT-bombay_machine_test_backend.git
Install Dependencies:npm install
Configure Environment Variables:
Create a .env file with the following variables: 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=your_port_number
Start the Server: 
npm run dev

