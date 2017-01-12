# Office Interoperability Event Site

## Project
This is the consumer facing site for the Office Interoperability site.
It gives the consumers information about Interop events and the Interop team.  

## Installation
* git clone 
  * https://github.com/mibowm/event-site.git
  * git@github.com:mibowm/event-site.git
* cd into `event-site`
* npm install
* Create test/local MS SQL database.
* Add connection strings to `.env` file
  ```
  DB_PASS=YourPassword
  DB_HOST=your.database.host
  DB_USER=your_user
  DB_NAME=your_db_name
  DB_TEST_PASS=your_test_db_password
  DB_TEST_HOST=your.testdatabase.host
  DB_TEST_USER=your_test_user
  DB_TEST_NAME=your_test_db_name
  AZURE_SECRET=your_azure_ad_secret
  AZURE_CLIENT_ID=your_azure_client_id
  AZURE_TENANT_ID=your_azure_tenant_id
  ```
* Add placeholder data into test database
  * Go to /routes/api-routes.js.
  * There are two methods commented out - ``placeholders();`` and ``dbRelationships();``
  * First uncomment the placeholder() and start the server with ``grunt start``, this will 
    create the data in the database
  * Then comment out the placeholder() and uncomment the dbRelationships() and restart the server with ``grunt start``, 
    this will create the relationships between the data tables.
  * Finally, comment both placeholder() and dbRelationships out and restart the
    server with ``grunt start``. At this point, all your placeholder data will be created. 
  * Do this only once, if you need to recreate your placeholder data, 
    delete all the tables from the database and repeat these same steps
* grunt start