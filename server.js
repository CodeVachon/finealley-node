var express = require('express'),
    app = express()
;

app.use(express.static(__dirname + '/wwwroot'));

module.exports = app;
