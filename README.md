# RESTful-API
Demonstration of REST APIs

## Brief Description

- There are two collections for this project which are the User and Post collections.
- A user model contains the user details.
- A post model contains the post details and the details of the user who owns the post.
- User should be able to sign up with the email, username, fullname and password compulsory to be filled during registration. An email is sent to the user after a successful registration.
- User should be able to login with the combination of email and password.
- User should be able to publish a post (images can be uploaded alongside).
- User should be able to reset password.
- User should be publish a post.
- User should be able to fetch a post.
- User should be able to delete a post.
- User should be able to edit a post.

## API Documentation

The documentation for API is [here](https://documenter.getpostman.com/view/6841767/SWTEbvxo?version=latest)

## Built with

- NodeJS
- ExpressJS
- MongoDB
- JavaScript

## Getting Started

### Installation

- Clone this repository using git clone https://github.com/hadeoh/RESTful-API.git .
- Use the .env.example file to setup your environmental variables and rename the file to .env
- The database used is MONGODB.
- There are different databases for the test and dev env which must be made available in the .env file
- The file management platform used is Cloudinary, the necessary details needed for cloudinary is also in the .env.example file
- Run yarn to install all dependencies
- Run yarn start:dev to start the development server
- Failure to fill the necessary values in the .env file will make the server fail to start.

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/)

### API Documentation 
- [PostMan Documentation](https://documenter.getpostman.com/view/6841767/TzJydFnE)


#### Test Tools

- [Jest](https://jestjs.io/) - JavaScript Test Framework for API Tests (Backend)
- [Supertest](https://www.npmjs.com/package/supertest) - TDD/BDD Assertion Library for Node
- [Istanbul(nyc)](http://chaijs.com/) - Code Coverage Generator
- [Coveralls](https://coveralls.io/) - Coveralls for testing after successful CI from Travis
- [TravisCI](https://travis-ci.org) - Travis CI for continuous integration(CI)

### Authorization

- [JWT](https://jwt.io/) - JSON Web Token

### Database Mapper

- [Mongoose](https://mongoosejs.com/) - ODM (Object -Document Mapper) for MongoDB, into a simple RESTful API.

### Testing

- Run test
  `yarn test`

- Run coverage report
  `yarn test:coverage`

## API Routes

|       Description       | HTTP Methods |            Routes                  |
| :---------------------: | :----------: | :---------------------------------:|
|     Sign up a user      |     POST     |      api/v1/auth/signup            |
|      Log in a user      |     POST     |      api/v1/auth/login             |
|     Publish a post      |     POST     |        api/v1/posts                |
|     Reset Password      |     GET      | api/v1/auth//password-reset/:email |
|      Fetch a post       |     GET      |       api/v1/posts/:id             |
|     Delete a post       |    DELETE    |       api/v1/posts/:id             |
|       Edit a post       |     GET      |       api/v1/posts/:id             |

## Project References

- Stack Overflow
- MongoDB documentaion
- Mongoose Documentaion
- Jest Documentation
