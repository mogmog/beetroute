English 

#### install git and tmux

sudo apt-get install git tmux

#### get repo

````
git clone https://github.com/mogmog/beetroute.git
````

####Get Python
        ```
        $ sudo apt-get install python-virtualenv
        $ sudo apt-get install python3-pip
        $ sudo apt-get install python3-setuptools
        $ sudo easy_install3 pip
        
        $cd beetroute
        $ cd api
        $ virtualenv -p python3 env
        $ source env/bin/activate
      
        $ pip install -r requirements.txt
        ```
    
  ### To create the database
  
  sudo apt-get install postgresql postgresql-contrib
  
  
  sudo -u postgres psql
  From the resulting prompt:
  
  ALTER USER postgres PASSWORD 'postgresGeorgianSoupe45435';
  CREATE DATABASE beatroute;
   
  (control d to exit)
  
    
  ### Install Node
  
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  
  
  ### Install js requirements
  cd ..
  npm install
  

 #### Build database
 
     (Remember to be in the virtualenvironment and have set the environment variables)
     
       source env/bin/activate
       export APP_SETTINGS="development"
       export DATABASE_URL="postgresql://postgres:postgresGeorgianSoupe45435@localhost/beatroute"
         
 
    ```
    (env)$ python manage.py db init

    (env)$ python manage.py db migrate
    ```

    And finally, migrate your migrations to persist on the DB
    ```
    (env)$ python manage.py db upgrade
    ```


### tmux help

To use tmux, start it using start.sh

 - control b and then arrow keys to swap panes
 - control b and press d to get out of tmux panes (it is all still running)
 - tmux kill-server will stop all processes in all panes
 






