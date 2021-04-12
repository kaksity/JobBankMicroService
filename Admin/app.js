const Express = require('express');
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const Cors = require('cors');
const Path = require('path');
const App = Express();

//Middle Ware
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({extended:true}))
App.use(Cors())
App.use(Morgan('combined'))

App.use('/public',Express.static(Path.join(__dirname,'public')));

//Routes
const AdminRoutes = require('./api/routes');
App.use('/api/v1/admin',AdminRoutes);

module.exports = App;