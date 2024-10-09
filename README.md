Library Management System
This project is a Library Management System built using Node.js and Express.js for the backend. The system allows users to manage and maintain book collections and member records,
handling essential functionalities like adding, updating, deleting, and viewing books and members. It also includes authentication features to protect restricted actions like 
managing the library's inventory.

Key Features
	1.Book Management:
            Add, update, delete, and view details and history of books.
  2.Member Management:
            Add, update, and delete members.
            View member details and borrowing history.
  3.Authentication: 
	          Secure login and signup functionality.
					  Protected routes for managing books and members, accessible only to authorized users.
	4.Middleware for Authorization:		
           JWT (JSON Web Token) based authentication to secure API routes.
  You should set up the following environment variables in your .env file:
            MONGO_URI: The connection string to your MongoDB database.
            JWT_SECRET: A secret key used for signing JWT tokens.
						PORT:PORT_NUMBER
  Clone the repository:https://github.com/Shamnad-s/IIT-bombay_machine_test_backend.git
	Install the dependencies:npm install
  Create a .env file with the necessary environment variables.
	Start the server:npm run dev
  Your application should now be running at http://localhost:3000
	Additional information(Documentation): 
        Table structure:https://docs.google.com/document/d/1P3OQZcfPNZDZDgGf6bDeeReR_WdhaM-HJi-wByvM2TU/edit?tab=t.0
				Frontend Flow:https://docs.google.com/document/d/1q_AnHhgePT8qJC_9ATIle9m7wDNaZ-ez-7TbkebQYqQ/edit?tab=t.0
		    API Documentaion:https://docs.google.com/document/d/126vz62HFGHvNfNhOWGKPQgjbrOdEoc0mro0qWyH2fdw/edit?tab=t.0
			  Code design:https://docs.google.com/document/d/1HhXvCWfZ3yfadX1x8o2ej7v1cb6vyDCNSFzSHMHI3_M/edit?tab=t.0
		    Hosting instruction:https://docs.google.com/document/d/1YJ4hkFKiqdLr0OexlIsMXmJcqXNOHcD1eFtc9YZ19x4/edit?tab=t.0
			Database diagram:https://drive.google.com/file/d/16kXvxsMxrvPN2_I0zoJ9sro8EBFzpWPS/view
