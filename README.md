#Promote Your Events Whatever They Are!

This site was designed to promote Microsoft Interoperability events, but it can be used to promote any kind of event you want. 

This site uses a SQL database with Sequelize as its ORM. If you need to learn about Sequelize, they have [very helpful documentation](http://docs.sequelizejs.com/en/latest/). It is currently set up to use SQL Server, but Sequelize will work with any SQL database. If you want to use SQL Server, then you don't need to make any changes, just run `npm install` then store your database name, user name and password in a .env file in the root directory. If you want to use a different SQL you can find how to do that on [this page](http://docs.sequelizejs.com/en/latest/docs/getting-started/) in the Sequelize docs. A note on the Sequelize docs: In the Sequelize docs they declare Sequelize with `var Sequelize = require('sequelize');` and connect to their database with `var sequelize = new Sequelize('database', 'username', 'password');`, instead of this, I use `var Sql = require('sequelize');` and `var sql = new Sql('database', 'username', 'password');`, so I don't have to type as much. It makes no difference, but I want to avoid confusion for anyone comparing my code to the Sequelize docs.

After cloning the repo, enter `grunt start` or just `grunt` in the command line to build the project and start the server. The site will be up and running at this point with just the placeholder content that comes with the site. The repo only contains placeholder tables for the different models to have some dummy content for the first build of the website. 

##Working with Models


Once you have started your site, there are two ways to add events and users. The first is to hard code them in the model's file manually or you can use the admin page to create them with an online form. 

Be careful when creating database tables manually. In order to sync with the database, you need to call Sequelize's `.sync()` method. `.sync()` will, based on your model definitions, create any missing tables. If it is called with `{force: true}` then it will first drop the existing tables before creating the tables you have coded, including any that you have soft coded with the online form. This cannot be undone, so be very careful when using this setting. 

There is one placeholder Event, one placeholder Contact, and one placeholder admin User. The placeholder tables are created from `models/placeholder.js`. These models use `.sync({force: true})` so you will need to either comment them out or delete them or it will drop any tables you have soft coded when the server restarts. The exception is the admin user, you will need this to access the admin section of the website. 



###Users and admins

Unlike Events and Contacts, there is no online form to soft code Users. One may be added in the future, but for now the only way to edit or create a user is to hard code it in the `models/index.js` file. For the admin user, you will need to store your password as `ADMIN_PASSWORD` and `ADMIN_USERNAME` in your `.env` file. If you want to create non-admin users that are not able to access the admin section of the website, set `isAdmin` to `false`.

####Example of a user record: 

```JavaScript
{
  userName: 'TestUser',
  password: 'p@ssw0rd',
  email: 'testuser@example.com',
  isAdmin: false
}
```

####Code to create a user

If you want to create more users, replace the placeholders below with your data and place this code below the `models/placeholder.js` file to create a new user. Remember that setting `{force: true}` on Sequelize's `.sync()` method will drop all previously created tables. if you want to create another admin user, set the value of `isAdmin` to `true`.

```JavaScript
User.sync({force: true})
.then(function () {
  return User.create({
  userName: 'TestUser',
  password: 'p@ssw0rd',
  email: 'testuser@example.com',
  isAdmin: false
  });
});
```