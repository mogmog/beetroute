        ```
        $ pip install virtualenv
        $ virtualenv -p python3 venv
        $ pip install autoenv
        ```

* #### Environment Variables
    Create a .env file and add the following:
    ```
    source env/bin/activate
    export APP_SETTINGS="development"
    export DATABASE_URL="postgresql://postgres:postgres@localhost/thing"
    ```
  
  
  ### To create datbase
  
  psql -U postgres -h localhost
  
  ````
  > create database tracker
  ````
  
 #### Install your requirements
    ```
    (venv)$ pip install -r requirements.txt
    ```

    Then, make and apply your Migrations
    ```
    (env)$ python manage.py db init

    (env)$ python manage.py db migrate
    ```

    And finally, migrate your migrations to persist on the DB
    ```
    (env)$ python manage.py db upgrade
    ```

    ```
    (venv)$ flask run
    ```



  ###to restore from .sql file
  ````
  psql -U postgres -d thing -a -f thingout.sql -h localhost
  psql -U postgres -d thing -a -f populatecardmappings.sql -h localhost
  ````




