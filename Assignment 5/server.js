"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var wins = 0;
var losses = 0;

app.use(bodyParser.json()); // for parsing application/json

app.get("/", function (req, res) {
    res.send("Hello world");
});

app.get("/stats",function(req, res){
    res.send({ "wins" : wins , "losses" : losses });  
});

app.post("/flip",function(req, res){
    console.log(req.body.call);
    var flip = (Math.random() < 0.5) ? "heads" : "tails";
    var result;
    if(req.body.call === flip){
        wins+=1;
        result = "win";
    }else {
        losses += 1;
        result = "lose";
    }
    res.send({"result" : result });
});

app.listen(3000, function () {
  console.log("Coin flip web api listening on port 3000!");
});
