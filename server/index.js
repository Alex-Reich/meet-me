var express = require('express');
var bp = require('body-parser');
var cors = require('cors');
var server = express();
var session = require('./auth/session');
var port = process.env.PORT || 3000; // CHANGE FOR HEROKU

require('./db/mlab-config');

var authRoutes = require('./auth/routes');
var contactRoutes = require('./routes/contacts')
var googlePlacesRoutes = require('./routes/googlePlaces')
var emailRoutes = require('./routes/email')

var whitelist = ['http://localhost:8080', 'https://meetme-at.herokuapp.com'] // CHANGE FOR HEROKU

var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
};

server.use(cors(corsOptions));
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/../public/dist")) // CHANGE FOR HEROKU

server.use(authRoutes.router);
server.use(contactRoutes.router);
server.use(googlePlacesRoutes.router);
server.use(emailRoutes.router)

server.use('*', (error, req, res, next) => {
    res.status(400).send(error);
});

server.listen(port, () => {
    console.log('Server Is Running On Port: ', port);
});