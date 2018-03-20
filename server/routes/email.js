var router = require('express').Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'meetme.at.website@gmail.com',
        pass: 'meet me halfway down'
    }
},
    {
        from: 'meetme.at.website@gmail.com'
    });

router.post('/api/send', function (req, res, next) {
    var mailOptions = {
        to: req.body.emailAddress,
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.send({error: 'API ERROR'})
        }else{
            console.log('Message Sent: ', response.message);
            res.send({response: "Sent"})
        }
    })

})

module.exports = { router };