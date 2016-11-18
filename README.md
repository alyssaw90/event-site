#Promote Your Events Whatever They Are!

This site was designed to promote Microsoft Interoperability events, but it can be used to promote any kind of event you want. 

##Getting Started

This site uses a SQL database with Sequelize as its ORM. If you need to learn about Sequelize, they have [helpful documentation](http://docs.sequelizejs.com/en/latest/). It is currently set up to use SQL Server, but Sequelize will work with any SQL database. If you want to use SQL Server, then you don't need to make any changes, just run `npm install` then store your database name, user name and password in file named `.env` and store it in the in the root directory. If you want to use a different SQL you can find how to do that on [this page](http://docs.sequelizejs.com/en/latest/docs/getting-started/) in the Sequelize docs. A note on the Sequelize docs: In the Sequelize docs they declare Sequelize with `var Sequelize = require('sequelize');` and connect to their database with `var sequelize = new Sequelize('database', 'username', 'password');`, instead of this, I use `let Sql = require('sequelize');` and `let sql = new Sql('database', 'username', 'password');`, so I don't have to type as much. It makes no difference, but I want to avoid confusion for anyone comparing my code to the Sequelize docs. Note however that you have to use `var` or `let` using `const` with Sequelize will cause errors.

To use environment variables locally, create a file called `.env` and save it to the root of your project. Then add environment-specific variables on new lines with the following pattern `NAME=VALUE`. `process.env` will now have acccess to the keys and values defined in the `.env` file. The  Authentication is done with a local strategy as well as with OAuth from Azure Active Directory. You do not have to use the OAuth, but the site will not work properly without access to the database, so you must at least include your database connection information. To use OAuth and connect to your database And enter the following keys and values:

```
DB_PASS=YourPassword
DB_HOST=your.database.host
DB_USER=your_user
DB_NAME=your_db_name
AZURE_SECRET=your_azure_ad_secret
AZURE_CLIENT_ID=your_azure_client_id
AZURE_TENANT_ID=your_azure_tenant_id
```

This will work for testing and using your localhost, but for production, you need to provide environment variables with the correct keys and values in the way prescribed by your hosting service. 

After cloning the repo, enter `grunt start` or just `grunt` in the command line to build the project and start the server. The site will be up and running at this point with just the placeholder root user. 

##How is this site built?

This site is built with AngularJS, Node.js, Express, and SQL. The task runner is grunt. There are several grunt tasks you can use to get started:

**task command** | **what it does**
---|---
grunt lint | Lints JavaScript files
grunt test | Runs tests
grunt clean:all | Deletes all build files
grunt lessProd | Compiles and minifies .less files
grunt build:dev | Compiles js from ES6 into one file, but does not minify the code and compiles and minifies .less files. useful for debugging
grunt build | Compiles js from ES6 and minifies it into one file and compiles and minifies .less files into css
grunt start:dev |  Compiles js from ES6 into one file, but does not minify the code and compiles and minifies .less files and starts server with nodemon
grunt start | Compiles js from ES6 and minifies it into one file and compiles and minifies .less files and starts server with nodemon
grunt | same as `grunt start`

`grunt build` and `grunt build:dev` will both compile your front end files, but `build:dev` does not minify the code, which is helpful for debugging, but should not be used in production. 

##How does it work?

When you run a Grunt build task, the JavaScript files are compiled into the `build.min.js` file and the .less files are compiled into the `custom.build.min.css` file. You can create as many css/less files within the `/css/less` folder as you want and as long as they have a `.less` extension they will compiled into the `custom.build.min.css file`. 

In the same way, any `.js` files within the `app` folder will be compiled into the `build.min.js` and any files that are required or imported in will be included, but AngularJS directive, controller, or factory files must be added to the `app/components/client.js` list of required files with a path relative to the `app/components/` folder. 

The REST api is built with ExpressJS and Node.js and it does not need to be compiled, so any changes made to the API will be reflected when the server restarts regardless of whether you run a build task.

##The API

The REST api is built with ExpressJS and Node.js. The `api-routes.js` file contains the routes that send data back and forth to the database, the `auth-routes.js` file contains the routes involved with authorization, and the `catch-all-routes.js` sends the index.html to initiate the single page Angular app. 

The authentication middleware has two methods in `scripts/userLogging`: `isLoggedIn` and `isLoggedInAdmin`. Adding `isLoggedIn` will check if the user is logged in, `isLoggedInAdmin` will check if the user is logged in and whether they are an adming user.

if you want a route to require authentication, simply add the `isLoggedIn` or `isLoggedInAdmin` in the route. e.g.
```javascript
app.get(`/myroute`, isLoggedIn, (req, res) => {
  //route that requires login
});
```

The actual server files is the `server.js` file in the root of the project. To start the app manually, run `node server.js` and it will start the app and connect to the database. 

##The Angular app

The client side of the app is built with [AngularJS](https://angularjs.org/) and compiled with [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/). All the files for the client side are in the `app/components` folder. Within that folder the files are separated by which pages they relate to and also for shared components such as the header and footer. The files for the admin section of the app, which allow you to edit the app on the client side are in the `app/components/admin` folder. There are some controller and directive modules that are shared by some pages, so if you can't find a controller that is being called in a template, do a search on all files in the components folder (Ctrl+Shift+F in most text editors) to see which page it is saved with. This will hopefully be fixed in the future.

The main entry point for the client side of the app is the `app/components/client.js` file. This file configures the Angular app, sets up the client-side routing, requires in Angular and any Angular modules you want to use, and requires in your controller, directive, and factory modules. If you create additional modules, they must be required in the `client.js` file or they cannot be accessed by the app. 

##A Note on Deploying to Visual Studio

If you deploy with Visual Studio, Visual Studio will not perform `npm install` for you, so you must push your `node_modules` folder, but in order to avoid pushing all you dev dependencies, delete your `node_modules` folder then run `npm install --production` before pushing your files.

##To Do

* Add testing

* Add documentation

* Reorganize Angular files

* Move map to use AngularJS $http

* Divide route services into separate files

* remove all 99lime CSS and move to WebCore/bootstrap

* move custom.js functions into all pages directive
