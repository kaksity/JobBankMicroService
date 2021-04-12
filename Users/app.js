const Express = require('express');
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const Cors = require('cors');
const Path = require('path')
const App = Express();


//Middleware
App.use(Cors());
App.use(Morgan('combined'));
App.use(BodyParser.urlencoded({extended:true}));
App.use(BodyParser.json());
App.use('/uploads',Express.static(Path.join(__dirname,'uploads')))


//Routes
const Routes = require('./api/routes');

App.use('/api/v1/user',Routes);

module.exports = App;