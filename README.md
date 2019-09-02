# MongoDB Server / Back end

### Before you start

This project is the back end version of our mongodb products project. 
Even with the server running, we will need to view a front end version. 
The repo for our front end is located here [MongoDB-Front-End](https://github.com/19WDWU02/MongoDB-Front-End).  

## Installation
To install everything needed for this project you need to have a stable version of Node JS and NPM installed on your computer or server.

### Clone and Install the node modules project
```sh
$ git clone https://github.com/19WDWU02/mongoDBServer.git
$ cd mongoDBServer
$ npm install
```
You also need to create a **config.json** file and include the following lines.  
This information can be retrieved from [mongodb](https://www.mongodb.com/), after you have created a cluster.  
An example file has been given in the repo.

```json
{
    "MONGO_PASSWORD": "",
    "MONGO_USER": "",
    "MONGO_CLUSTER_NAME": ""
}
```

## Running the server
Once you have installed all the node modules and included a config.json, you need to turn on your server for it to successfully run.
In class we are either using node or nodemon to run our server. Nodemon will allow us to edit our server files without having to manually turn on and off our server. 

#### Without Nodemon
If you aren't using nodemon then you will have to run the server using normal node js. You won't be able to have auto refreshing whenever you change your server files.  
To turn on your server use the command
```sh
$ node server
```
This will turn on the server on port 3000.
#### Using Nodemon 
If you are using nodemon you need to make sure you have installed nodemon globally on your computer/server. (Remember that you only need to install it globally once on the very first time you are planning on using it.). 
To check to see if you have nodemon installed type out 
```sh
$ nodemon -v
```
You should see a number of what version of nodemon you are using ie (1.19.1). 
If you see nodemon: command not found, then you need to install nodemon. 
Follow the instructions to install nodemon
[Installing Nodemon](https://www.npmjs.com/package/nodemon)  

To turn on your server using nodemon use the command
```sh
$ nodemon server
```
This will turn on your server using nodemon and will allow auto refreshing.  
If you are using a vagrant/virtual server then you need to use the legacy command with nodemon 
```sh
$ nodemon -L server
```
