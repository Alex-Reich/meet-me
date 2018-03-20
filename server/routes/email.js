var router = require('express').Router();
var nodemailer = require('nodemailer');
var hsb = require('nodemailer-express-handlebars');

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

transporter.use('compile', hsb({
    viewPath: 'templates',
    extName: '.hbs'
}));

router.post('/api/send', function (req, res, next) {
    var mailOptions = {
        to: req.body.emailAddress,
        subject: req.body.subject,
        template: 'email',
        context: {
            name: req.body.message.name,
            directionLink: req.body.message.friendsDirections
        }
    };
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.send({error: 'API ERROR'})
        }else{
            res.send({response: "Sent"})
        }
    })
})

module.exports = { router };