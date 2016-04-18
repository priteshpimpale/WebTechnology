/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/test";
var app = express();
var store = "linkstore";

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static("."));

var insertDoc = function(db, data, callback) {
   db.collection(store).insertOne(data, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the " + store + " collection.");
        callback(result);
    });
};

app.route("/links")
.get(function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        db.collection(store).find().toArray(function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
                throw err;
            }
            else{
                console.log(result);
                res.send(result);
            }
        });
    });
})
.post(function(req, res){
    if(req.body.title !== undefined && req.body.link !== undefined ){
        var clicks = req.body.clicks === undefined ? 0 : req.body.clicks;
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertDoc(db, { 
                "title" : req.body.title,
                "link" : req.body.link,
                "clicks" : clicks
            }, function(result) {
                db.close();
                res.send(result);
            });
        });
    } else {
        res.send({"error" : "Parameters title and link are required" });
    }
});

var findandUpdateDoc = function(db, search, sort, update, isNew ,callback){
    db.collection(store).findAndModify(search, sort, update, isNew , function(err,doc) {
        callback(doc);
    });
};

app.get("/click/:title",function (req,res) {
	MongoClient.connect(url, function(err, db) {
	    assert.equal(null, err);
	    findandUpdateDoc(db, 
            { "title" : req.params.title }, // search query for objects
            [], // represents a sort order if multiple matches
            { $inc: { clicks : 1 } }, // update statement
            { new : true }, // options - new to return the modified document
            function(doc) {
                if(doc.lastErrorObject.updatedExisting){
                    res.redirect(doc.value.link);
                }
                else{
                    res.send({ "error" : "Cannot find the specified title"});
                }
                db.close();
            });
	}); 
});

app.listen(3000, function () {
  console.log("MongoDB app listening on port 3000!");
});