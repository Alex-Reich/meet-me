var router = require('express').Router();
var nodemailer = require('nodemailer');
var hsb = require('nodemailer-express-handlebars');

var transporter = nodemailer.createTransport({
    from: 'meetme.at.website@gmail.com',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'meetme.at.website@gmail.com',
        pass: 'meet me halfway down'
    }
});

transporter.use('compile', hsb({
    viewPath: __dirname + '/templates',
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
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.send({
                message: 'API ERROR',
                error
            })
        } else {
            res.send({
                response: "Sent"
            })
        }
    })
})

module.exports = {
    router
};