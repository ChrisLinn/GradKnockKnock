var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/test';





router.post('/contact', function (req, res, next) {
    const {emailAddr} = req.body;
    res.set('Content-Type', 'application/json');

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB");

        findDocuments( 
                        res,
                        db,
                        "gradkkemail",
                        {email: emailAddr}
                    );
    });
});



var findDocuments = function(res, db, collect, doc) {
    var collection = db.collection(collect);
    collection.find(doc).toArray(function(err, docs) {
        assert.equal(err, null);
        findDocCb(res, db, collect, doc, docs);
    });
}

var findDocCb = function(res, db, collect, doc, docs) {
    if (docs.length > 0) {
        deleteDocument(res, db, collect, doc);
    }
    else {
        insertDocuments(res, db, collect, doc);
    }
    db.close();
}

var insertDocuments = function(res, db, collect, doc) {
  // Get the documents collection
  var collection = db.collection(collect);
  // Insert some documents
  collection.insertMany([
    doc
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Added:", doc);
    res.send({"command": "subscribe", result: "订阅成功!"});
  });
}

var deleteDocument = function(res, db, collect, doc) {
  // Get the documents collection
  var collection = db.collection(collect);
  // Insert some documents
  collection.deleteOne(doc, function(err, result) {
    assert.equal(err, null);
    console.log("Removed:", doc);
    res.send({"command": "subscribe", result: "退订成功!"});
  });
}

module.exports = router;
