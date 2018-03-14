var express = require('express');
var bp = require('body-parser');
var cors = require('cors');
var server = express();
var session = require('./auth/session');
var port = 3000;

require('./db/mlab-config');

var authRoutes = require('./auth/routes');
var contactRoutes = require('./routes/contacts')
var googlePlacesRoutes = require('./routes/googlePlaces')

var whitelist = ['http://localhost:8080'];
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

server.use(authRoutes.router);
server.use(contactRoutes.router);
server.use(googlePlacesRoutes.router)

server.use('*', (error, req, res, next) => {
    res.status(400).send(error);
});

server.listen(port, () => {
    console.log('Server Is Running On Port: ', port);
});