# The Jokester APP
link: https://jokesterapp.herokuapp.com

## User Story
* User will be able to sign in and make themselves a profile
* User will be able to click to view different random jokes
* User can save any random joke of their liking
* They will also be able to comment on any of the jokes that they favorited.

### Wireframe for jokester
https://lucid.app/lucidchart/invitations/accept/309fd4e5-8d0b-47f8-94a3-2b1d23b4bb90

### ERD for jokester app
https://lucid.app/lucidchart/invitations/accept/a17bb8f3-53b7-4e7a-8def-59235a0294de

# BEFORE RUNNING App

* create a node app
* .gitignore
* install and set up express
* stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* configured auth controller
* set up ejs, express-ejs-layouts, verified that it's working
* set up the signup and login forms, tested post routes

## How to set up:
1. Fork & Clone

2. Install dependencies ---> npm i

3. Create a `config.json` with the following code:
```
{
  "development": {
    "username": "postgres",
    "password": "password",
    "database": "db name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "password",
    "database": "db name_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username":" ",
    "password":" ",
    "database": "db name_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
1. Create a database --> sequelize db:create dbName

2. Migrate the `user` model to your database ---> sequelize db:migrate

3. Add `SESSION_SECRET` and `PORT` environment variables in a `.env` file

4. Run `nodemon` to start up app