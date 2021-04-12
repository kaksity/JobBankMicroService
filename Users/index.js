const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const App = require('./app');
const db = require('./config/db');

const Server = http.createServer(App);

const Hostname = process.env.HOSTNAME || '127.0.0.1';
const Port = process.env.PORT || 7000;

//Start the http Sever
Server.listen(Port,Hostname,(err)=>{
    if(err){
        console.log('Unable to Start User Service');
    }
    else{
        console.log(`User Service is up and running at http://${Hostname}:${Port}`);
    }
});

//Start the database server
db.authenticate().then(()=>{
    console.log('Connected to the UserDB Successfully');
}).catch(()=>{
    console.log('Unable to connect to the Database');
});