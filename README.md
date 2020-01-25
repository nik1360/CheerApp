# CheerApp
Install MySQL Server, MySQL Workbench and the Python connector. During the configuation of the server create an account (usr: CheerApp pwd:Cheer4pp).
Open MySQL Workbench, create a connection and (call it CheerApp) using the user created before. Open the connectiopn ad then open 
the file cheerapp.sql contained in the database folder. Execute the file inside MySQL Workbench to create the database.

Install Python 3.7. 
Open the terminal in 'cheer-app-backend' and type:
 - pip install -r requirements.txt
then, populate the database with 'python db_population.py'.
Start the server with 'python server.py'

Install node.js
Open the terminal in 'cheer-app-frontend' and type 'npm install' to install the dependencies for the frontend.
Start the frontend with 'npm start'.

Enjoy
