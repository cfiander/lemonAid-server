# LemonAid Server


## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "lemonaid-server",`

7. Create a new database called "lemonstand" and its corresponding undo
8. Create a table for users 
  CREATE TABLE lemonstand_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
  );
  
  DROP TABLE IF EXISTS lemonstand_users;

9. Create a table for saved_recipes (recipes which have been saved by users) and its corresponding undo 
  create table saved_recipes
  (
     recipe_id    integer primary key not null,
     recipe_name  TEXT NOT NULL
  );
  
  DROP TABLE IF EXISTS lemonstand_saved_recipes;

10. Create a table for user_recipes (saved recipes for an individual users and its corresponding undo
  create table user_recipes
  (
      id integer not null references lemonstand_users(id) ON DELETE CASCADE NOT NULL,
      recipe_id   integer not null references saved_recipes(recipe_id) ON DELETE CASCADE NOT NULL
  );
  
  DROP TABLE IF EXISTS user_recipes;
  
## Server Address 

https://sheltered-temple-74358.herokuapp.com/api

## React Front End

https://github.com/cfiander/lemonAid-client

## Screenshots


POST /api/recipes 

1. Doesn't require Authentication 
2. Feeds an external API an ingredients list from the req.body and returns up to 50 results from external API

POST /api/recipes/url

1. Doesn't require Authentication 
2. Feeds a given recipe ID specific to each recipe in the external API and returns a specific URL for a given recipe which is embedded into the recipe on the results page 


POST /api/auth/login 

1. Handles login requests for registered users. 

POST /api/users

2. Handles registration for new uers.

## Built With 

Express
Node
Bcrypt
JsonWebToken
Unirest

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

Type heroku create into the command line and then 'npm run deploy'. A database in Heroku is also neccessary. 
