'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', function (req, res) {
    

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport("SMTP",{
        service: 'gmail',
        auth: {
            user: 'cw.lagarderesports@gmail.com',
            pass: 'tennis123!'
        }
    });

    // setup email data with unicode symbols
    let mailClient = {
        from: '"Contact" <contact@carolinewozniacki.com>', // sender address
        to: 'cw.lagarderesports@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text:  req.body.message // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailClient, (error, info) => {
        if (error) {
            return console.log('CONTACTMAILER: ' + error);
        }
        console.log('CONTACTMAILER: Message %s sent: %s', info.messageId, info.response);
    });

    let mailSender = {
        from: '"Contact" <contact@carolinewozniacki.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Carolinewozniacki.com received your email.', // Subject line
        text:  'Thank you for contacting us.' // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailSender, (error, info) => {
        if (error) {
            return console.log('CONTACTMAILER: ' + error);
        }
        console.log('CONTACTMAILER: Message %s sent: %s', info.messageId, info.response);
    });

    res.redirect('/contact');

});


module.exports = router