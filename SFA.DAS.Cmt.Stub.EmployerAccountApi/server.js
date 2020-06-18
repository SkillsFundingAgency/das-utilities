const config = require('./config');
const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require('body-parser');
const fs = require('fs');
const pug = require('pug');
const path = require('path');

const port = process.env.PORT || config.port;

const app = express();
//app.use(express.static('public'));

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('splash');
});

/*
app.get("/api/accounts/VN48RP/transfers/connections", (req, res) => {
    sendFile(res, req.url);
});
*/

app.get('/api/*',(req, res) => {
    sendFile(res, req.url, req.method);
});

app.get('/api-v2/*',(req, res) => {
    sendFile(res, req.url, req.method);
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

String.Format = function (b) {
  var a = arguments;
  return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
      if (b.substring(0, 2) == "{{") return b;
      var c = parseInt(b.match(/\d/)[0]);
      return a[c + 1]
  })
};