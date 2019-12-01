
### Event Management web application

To run this application in the local machine following pre-requisites should be installed

1. python 3.6
2. Angular 8
3. MySQL 5.7 

#### Steps to run server side code

Create a virtual environment and install all the dependencies.
The step to install dependencies is

``` pip install -r requirement.txt ```


Before running the flask application configure the database.

Create a database in MySQL 5.7 and update the connection string in **src/application.py** with the database username and password

The connection string is of the format

```mysql+pymysql://<username>:<password>@<host>/<db_name>```


Run the following command to run the backend flask application.

```
cd server
export FLASK_APP=src/application.py
flask run
```

To run the client code:
```
cd client
npm install
ng serve

```
Angular code will be running at http://localhost:4200


#### Steps to deploy the code in AWS EC2 Instance

Create RDS instance of MySQL 5.7 and update the database credentials in the application.py file.

1. Create an EC2 ubuntu 18 instance.
2. Create a key-pair
3. ssh to EC2 instance
3. install nginx, flask, pip, virtualenv, nodejs, angular-cli
4. cd /etc/nginx/sites-enabled and add the foll code
```
server{
    listen 80; 
    server_name <EC2 ip address>;
    root /var/www/dist/client;      
    index index.html index.htm; 

    
    location / {         
        # First attempt to server request as file, then         
        # as directory, then fall back to displaying a 404.          
        try_files $uri $uri/ /index.html =404;      
    }

    location ~ ^/api { 
       proxy_pass http://127.0.0.1:5000; 

     }
}

Then start the nginx service using:
sudo nginx service start
```
5. Move the code to EC2, create virtualenv, install the dependencies and run the application using

```
export FLASK_APP=src/application.py
nohup flask run //this will run the flask app in background
```

6. bundle the client code using command
```
cd client
```
Change the server url to the ip address of the EC2 instance in **client/src/app/api.service.ts**

```
ng build --prod --build-optimizer
```

7. move the dist folder to /var/www/
8. Run ```sudo service nginx restart```
9. Go to the url of the ip address of EC2 instance

The application is now deployed on EC2 instance.