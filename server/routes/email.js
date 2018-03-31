var router = require('express').Router();
var nodemailer = require('nodemailer');

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

router.post('/api/send', function (req, res, next) {
    var mailOptions = {
        to: req.body.emailAddress,
        subject: req.body.subject,
        html: `
        <div class="header">
            <p>MeetMe@ : ${req.body.message.name}</p>
        </div>
        <div class="body">
            <p>Link to Your Directions: <a href="${req.body.message.friendsDirections}">Google Maps</a></p>
        </div>
        <div class="footer">
            <p>Your MeetMe@ Team</p>
            <img src="https://meetme-at.herokuapp.com/static/meet-me-email.png" height="70" width="70"/>
        </div>    
        `,
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