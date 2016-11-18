#Promote Your Events Whatever They Are!

This site was designed to promote Microsoft Interoperability events, but it can be used to promote any kind of event you want. 

##Getting Started

This site uses a SQL database with Sequelize as its ORM. If you need to learn about Sequelize, they have [very helpful documentation](http://docs.sequelizejs.com/en/latest/). It is currently set up to use SQL Server, but Sequelize will work with any SQL database. If you want to use SQL Server, then you don't need to make any changes, just run `npm install` then store your database name, user name and password in a .env file in the root directory. If you want to use a different SQL you can find how to do that on [this page](http://docs.sequelizejs.com/en/latest/docs/getting-started/) in the Sequelize docs. A note on the Sequelize docs: In the Sequelize docs they declare Sequelize with `var Sequelize = require('sequelize');` and connect to their database with `var sequelize = new Sequelize('database', 'username', 'password');`, instead of this, I use `let Sql = require('sequelize');` and `let sql = new Sql('database', 'username', 'password');`, so I don't have to type as much. It makes no difference, but I want to avoid confusion for anyone comparing my code to the Sequelize docs. Note however that you have to use `var` or `let` using `const` with Sequelize will cause errors.

Authentication is done with a local strategy as well as with OAuth from Azure Active Directory. To use OAuth and to connect to your database, create a file called `.env` and save it to the root of your project. And enter the following:

DB_PASS=YourPassword
DB_HOST=your.database.host
DB_USER=your_user
DB_NAME=your_db_name
AZURE_SECRET=your_azure_ad_secret
AZURE_CLIENT_ID=your_azure_client_id
AZURE_TENANT_ID=your_azure_tenant_id

This will work for testing and using your localhost, but for production, you need to provide environment variables with the same names in the way prescribed by your hosting service. 

After cloning the repo, enter `grunt start` or just `grunt` in the command line to build the project and start the server. The site will be up and running at this point with just the placeholder root user. 

##How is this site built?

This site is built with AngularJS, Node.js, Express, and SQL. The task runner is grunt. There are several grunt tasks you can use to get started:

**task command** | **what it does**
---|---
`Grunt lint` | Lints JavaScript files
`Grunt test` | Runs tests
`Grunt clean:all` | Deletes all build files
`Grunt lessProd` | Compiles and minifies .less files
`Grunt build:dev` | Compiles js from ES6 into one file, but does not minify the code and compiles and minifies minifies .less files
`Grunt build` | Compiles js from ES6 and minifies it into one file and compiles and minifies minifies .less files
`Grunt start:dev` |  Compiles js from ES6 into one file, but does not minify the code and compiles and minifies minifies .less files and starts server with nodemon
`Grunt start` | Compiles js from ES6 and minifies it into one file and compiles and minifies minifies .less files and compiles and minifies minifies .less files and starts server with nodemon
`Grunt` | Compiles js from ES6 and minifies it into one file and compiles and minifies minifies .less files and compiles and minifies minifies .less files and starts server with nodemon and watches for changes

`Grunt build` and `Grunt build:dev` will both compile your front end files, but `build:dev` does not minify the code, which is helpful for debugging, but should not be used in production. 

##


##To Do

* Add testing

* Add documentation

* Move map to use AngularJS $http

* Divide routes services into separate files

* remove all 99lime CSS and move to WebCore/bootstrap

* move custom.js functions into all pages directive
