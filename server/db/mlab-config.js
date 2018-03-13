var mongoose = require('mongoose');
var connectionString = 'mongodb://mwm:admin@ds113179.mlab.com:13179/cwtest';
var connection = mongoose.connection;

mongoose.connect(connectionString);

connection.on('error', err =>{
    console.log('server error:', err);
});

connection.once('open', ()=>{
    console.log('Connected to Database');
});