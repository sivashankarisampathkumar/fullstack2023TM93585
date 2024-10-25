fullstack2023TM93585

APP Install Instructions:
1)Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2) Next steps 
 echo >> /Users/Z003LWS/.zprofile
 echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/Z003LWS/.zprofile
 eval "$(/opt/homebrew/bin/brew shellenv)"
 brew help
 brew -v 
 3) Install Node 
 brew install node
 4) check Node and npm status 
 node -v
 npm -v
 5) Verify npx Installation
 npm install -g npm
 npx -v
 6) Export Path
 export PATH="$PATH:$(npm bin -g)"
 7) Install Dependency Packages
npm install pg
npm install bcrypt
npm install jsonwebtoken
npm install express
npm audit fix --force
npm install axios
npm install react-router-dom
npm install cors 
npm install react-router-dom
npm install jsonwebtoken
npm install --save-dev @babel/plugin-proposal-private-property-in-object
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

 8) Create our react app (creates basic step -- used by me, if you use my extracted files no need to do)
 npx create-react-app my-app

  9) Extract the files
   cd backend

 10)Start backend:
    node server.js

 11)Start Frontend:
    npm start

Postgres db install:

1) Permission
sudo chown USERID /Users/USERID/data
2) Initialize the Data Directory:
/Users/USERID/bin/initdb -D /Users/USERID/data
3) Start PostgreSQL
/Users/USERID/bin/pg_ctl -D /Users/USERID/data -l logfile start
4) Verify the Server is Running
ps aux | grep postgres
5) Stop the PostgreSQL server:
 /Users/USERID/bin/pg_ctl -D /Users/USERID/data stop
6) Start PostgreSQL in single-user mode again:
/Users/USERID/bin/postgres --single -D /Users/USERID/data template1
7) create the postgres role:
CREATE ROLE postgres WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD '****';
8) Restart PostgreSQL:
/Users/USERID/bin/pg_ctl -D /Users/USERID/data start
9) After creating the postgres role, try connecting again with:
/Users/USERID/bin/psql -U postgres
10) Create a Database:
CREATE DATABASE book_exchange_sivashankari;
11) Enter into Database:
\c book_exchange_sivashankari
12) Create Table for user registration:
CREATE TABLE users_bookexchange ( id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
13) Create a function that updates updated_at:
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP; RETURN NEW; END; $$ LANGUAGE plpgsql;
14) Create a trigger that calls this function before updating:
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON users_bookexchange FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
15)Create Table for Book Records:
CREATE TABLE books ( id SERIAL PRIMARY KEY, user_id INT REFERENCES users_bookexchange(id) ON DELETE CASCADE, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, genre VARCHAR(100), condition VARCHAR(100), availability BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
16) Create a function to update updated_at column 
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP; RETURN NEW; END; $$ LANGUAGE plpgsql;
17)Create a trigger for the books table 
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();








# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
