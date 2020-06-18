const config = require('./config');
const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || config.port;

const app = express();

app.get('/ping',(req, res) => {
    res.status(204).send();
    return;
});


app.get('*',(req, res) => {
  sendFile(res, req.url, req.method);
  return;
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
  });


sendFile = function(res, url, method) {

    const filename = ("responses" + url.replace(/\/$/, '') + '_' + method + '.json').toLowerCase();

    console.log("Processing request for " + path.join(__dirname, filename));

    if(!fs.existsSync(filename))
    {
        res.status(404).send('No such file: ' + filename);
        return;
    }

    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, filename));
};