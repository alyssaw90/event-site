#Promote Interoperability Events

This site uses a SQL database with Sequelize as its ORM. If you need to learn about Sequelize, they have [very helpful documentation](http://docs.sequelizejs.com/en/latest/). It is currently set up to use SQL Server, but Sequelize will work with any SQL database. If you want to use SQL Server, then you don't need to make any changes, just run `npm install` then store your database name, username and password in a .env file in the root directory. If you want to use a different SQL database you can find how to do that on [this page](http://docs.sequelizejs.com/en/latest/docs/getting-started/).
After cloning the repo, enter `grunt start` or just `grunt` in the command line to build the project and start the server. The site will be up and running at this point with just the basic event. 

##Working with Models


Once you have started your site, there are two ways to add events and users. The first is to hard code them in the model's file manually or you can use the admin page to create them with an online form. 

Be careful when creating database tables manually. In order to sync with the database, you need to call Sequelize's `.sync()` method. `.sync()` will, based on your model definitions, create any missing tables. If it is called with `force: true` then it will first drop the existing tables before creating the tables you have coded, including any that you have soft coded with the online form. This cannot be undone, so be very careful when using this setting. 

There is one default Event, one default Contact, and one default admin User with a password of `p@ssw0rd`. It HIGHLY recommended that you change this password before you take your site online. 

###Users and admins

Unlike Events and Contacts, there is no online form to soft code Users. One may be added in the future, but for now the only way to edit or create a user is to hard code it in the User.js file. The best way to do this without exposing your password is to hard code your user in the models/User.js file, then start the server with `grunt start`. This will start the server and store your admin with a salted password in the database. When you've created your admin user, delete the code you used to create the admin before your push online. This way, you will have a admin user stored with a salted password in your database and your plain text password won't be stored anywhere. If you want to create non-admin users that are not able to access the admin section of the website, set `isAdmin` to `false`.

####Example of a user object: 

```JavaScript
{
  userName: 'TestUser',
  password: 'p@ssw0rd',
  email: 'tesuser@example.com',
  isAdmin: false
}
```

####Code to create a user

Replace the dummy data and place this code below the schema in the User.js file to create a new user Remember that settign `force: true` on Sequelize's `.sync()` method will drop all previously created tables.

```JavaScript
User.sync({force: true})
.then(function () {
  return User.create({
  userName: 'Admin',
  password: 'p@ssw0rd',
  email: 'admin@example.com',
  isAdmin: true
  });
});
```