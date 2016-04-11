"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var redis = require("redis"),
    client = redis.createClient();
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static("."));

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get("/", function (req, res) {
    res.send("Welcome to Redis Demo \n Post - /flip data { call : heads } \n Get - /stats \n Delete - /stats ");
});

app.get("/stats",function(req, res){
    //console.log("Params : " + req.query.flipcoin);
    client.mget("wins","losses",function (err,reply) {
        var rep = reply.toString().split(",");
        console.log("wins: ", rep[0], "\tlosses: ", rep[1]);
        res.send({ "wins" : rep[0] , "losses" : rep[1] });
    });
});

app.post("/flip",function(req, res){
    console.log(req.body.call);
    var flip = (Math.random() < 0.5) ? "heads" : "tails";
    var result;
    if(req.body.call === flip){
        client.incr("wins");
        result = "win";
    }else {
        client.incr("losses");
        result = "lose";
    }
    res.send({"result" : result });
});

app.delete("/stats",function (req,res) {
    client.set("wins", 0);
    client.set("losses", 0);
    res.send("wins and losses reset to 0");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
