var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    jsonBodyParser = bodyParser.json(),
    nodemailer = require('nodemailer'),
    fs = require('fs')
;

app.use(express.static(__dirname + '/wwwroot'));

app.post("/send", jsonBodyParser, urlencode, function(request, response) {
    fs.readFile("./settings.json", "utf-8", function(error, contents) {
        if (error) {
            console.log(error);
            response.status(500).json("error");
        } else {
            var settings = JSON.parse(contents);
            console.log(settings);

            var transporter = nodemailer.createTransport(settings.mailer);
            transporter.sendMail({
                from: request.body.emailAddress,
                to: settings.sendMailTo,
                subject: request.body.subject,
                text: request.body.message
            }, function(error, info) {
                if (error) {
                    console.log(error);
                    response.status(500).json("error");
                } else {
                    response.json("ok");
                }
            });
        }
    });
});

module.exports = app;
