var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    urlencode = bodyParser.urlencoded({ extended: false }),
    jsonBodyParser = bodyParser.json(),
    nodemailer = require('nodemailer'),
    fs = require('fs')
;

app.use(express.static(__dirname + '/wwwroot'));


console.log(process);


app.post("/send", jsonBodyParser, urlencode, function(request, response) {
    fs.readFile(__dirname + "/settings.json", "utf-8", function(error, contents) {
        var settings;
        if (error) {
            console.log(error);
            settings = {
                "mailer": {
                    "service": "gmail",
                    "auth": {
                        "user": process.env.maileruser || "ENV.maileruser",
                        "pass": process.env.mailerpassword || "ENV.mailerpassword"
                    }
                },
                "sendMailTo": process.env.mailersend || "ENV.mailersendto"
            }
            fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings, null, "\t"));
        } else {
            settings = JSON.parse(contents);
        }
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
    });
});

module.exports = app;
