const config = require('./config');
const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require('body-parser');
const fs = require('fs');
const pug = require('pug');
const path = require('path');
const Hashids = require('hashids');

const port = process.env.PORT || config.port;

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    
    let viewmodel = {
        selectedTab: "stubs",
        encodings : config.encodings
    };
    
    res.render('splash', viewmodel);
});

app.get("/employers", (req, res) => {

    let viewmodel = {
        selectedTab: "employers",
        encodings : config.encodings
    };

    res.render('employers', viewmodel);
});

app.get("/providers", (req, res) => {

    let viewmodel = {
        selectedTab: "providers",
        encodings : config.encodings
    };

    res.render('providers', viewmodel);
});

app.get("/encode", (req, res) => {

    let viewmodel = {
        selectedTab: "encoding",
        encodings : config.encodings
    };

    res.render('encode', viewmodel);
});

app.post("/encode", (req, res) => {

    const inputValue = req.body.inputValue;
    const encodingOption = req.body.selectedEncoding;
    const encoding = config.encodings.find(function(element){return element.EncodingType === encodingOption});
    
    console.log("Encoding: " + encoding.EncodingType);
    console.log("   Salt: " + encoding.Salt);
    console.log("   MinLength: " + encoding.MinHashLength);
    console.log("   Alphabet: " + encoding.Alphabet);
    console.log("Input value: " + inputValue);


   /* var salt = 'this is my salt';
    var alphabet = '46789BCDFGHJKLMNPRSTVWX';
    var minLength = 6;
    var encoder = new Hashids(salt, minLength, alphabet);
    var result = encoder.encode(1);
    
    const hashids = new Hashids(encoding.Salt, encoding.MinHashLength, encoding.Alphabet);*/
   
    const viewmodel = {
        selectedTab: "encoding",
        encodings : config.encodings,
        selectedEncoding : encodingOption,
        inputValue : inputValue
    };

    if(isNaN(inputValue))
    {
        //decode string value
        viewmodel.result = hashids.decode(inputValue)[0];
    }
    else
    {
        //encode numeric
        var n = Number(inputValue);
        viewmodel.result = hashids.encode(n); 
    }
    
    res.render('encode', viewmodel);
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
  });


String.Format = function (b) {
  var a = arguments;
  return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
      if (b.substring(0, 2) == "{{") return b;
      var c = parseInt(b.match(/\d/)[0]);
      return a[c + 1]
  })
};