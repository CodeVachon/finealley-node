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
    // Deny any Request thats not comeing from myself
    if (!request.headers.referer || (request.headers.referer.indexOf(request.hostname) == -1)) {
        response.status(401).json('Not Authorized to Mail');
        return;
    }

    fs.readFile(__dirname + "/settings.json", "utf-8", function(error, contents) {
        var settings;
        if (error) {
            console.log(error);
            settings = {
                "mailer": {
                    "service": "gmail",
                    "auth": {
                        "user": process.env.maileruser || "process.env.maileruser",
                        "pass": process.env.mailerpassword || "process.env.mailerpassword"
                    }
                },
                "sendMailTo": process.env.mailersendto || "process.env.mailersendto"
            }
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings, null, "\t"));
        } else {
            settings = JSON.parse(contents);
            if (process.env.maileruser) { settings.mailer.auth.user = process.env.maileruser; }
            if (process.env.mailerpassword) { settings.mailer.auth.pass = process.env.mailerpassword; }
            if (process.env.mailersendto) { settings.sendMailTo = process.env.mailersendto; }
        }
        var transporter = nodemailer.createTransport(settings.mailer);
        transporter.sendMail({
            replyTo: request.body.emailAddress,
            to: settings.sendMailTo,
            subject: request.body.subject || "Message From the Website",
            text: "Message From the FineAlley Website\n\nFrom: " + request.body.name + " (" + request.body.emailAddress + ")\n\nMessage:\n\n" + request.body.message
            //html: "<h1>Message from Website</h1><strong>From:</strong><br/>"
        }, function(error, info) {
            if (error) {
                console.log(error);
                response.status(500).json("error");
            } else {
                response.json("ok");
            }
        });
    });
});

module.exports = app;
