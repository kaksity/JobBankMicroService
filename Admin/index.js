const dotenv = require('dotenv')
dotenv.config()
const Http = require('http');
const App = require('./app.js');
const db = require('./config/db');
const Server = Http.createServer(App);

const Host = process.env.HOSTNAME || '127.0.0.1';
const Port = process.env.PORT || 7010;

Server.listen(Port,Host,(err)=>{
    if(err){
        console.log('Unable to Start Admin Service')
    }else{
        console.log(`Admin Service is up and running at http://${Host}:${Port}`);
    }
})

db.authenticate().then(()=>{
    console.log('Connected to DataBase successfully');
}).catch(()=>{
    console.log('Unable to connect to the DataBase');
})