var superagent= require("superagent");
var cheerio=require("cheerio");
var fs = require('fs');

let career_ol = 'https://careersonline.unimelb.edu.au/'
let career_login = 'https://careersonline.unimelb.edu.au/providers/ldap/login/1'

superagent.agent()
    .get(career_ol)
    .end(function(err,response){
    if (err) {
        console.log(err);
    } else {
        fs.writeFileSync("./response.txt", response)
        console.log("Get");
        cookie = response.headers['set-cookie'];
        console.log("cookie:\n" + cookie);
        let cSID = cookie[0].split(";")[0];
        let cVTK = cookie[1].split(";")[0];
        console.log("cSID:\n", cSID);        
        console.log("cVTK:\n", cVTK);
        var $ = cheerio.load(response.text);
        let VTK = $('input')[0]["attribs"]['value']
        console.log("\nUsing\nCookie:\n" + cSID+"; "+cVTK);
        console.log("VTK:\n" + VTK + "\n\n\n");


        superagent
        .post(career_login)
        .set('Cookie', cSID+"; "+cVTK)
        .set('Content-Type', "application/x-www-form-urlencoded")
        .query({__RequestVerificationToken: VTK})
        .query({LDAPUsername: ""})
        .query({LDAPPassword: ""})
        .end(function(err,response){
            if (err) {
                // console.log(err);
            } else {
                // console.log(response.headers['set-cookie']);
                // console.log(response.text);
            }
        });
    }
});



// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
// var db_url = 'mongodb://localhost:27017/test';

let auth = '.CHAUTH=04404D2B914FE7473A21B65A11945E8FCAB3D61DB6926CF1D5EECE3405FC3B7FB43DB6DE8C93631495300CCE3531291BB71660B1114D65CF965C929AE46440E80F34C700783EE95E94AF5BF4DE44FEB3A4A35E8656890A4512649CA2FE9CBC07626EB7B9D4FFDF31346A69677D03AA03CE49267159F2B98054975D640977AF8405C04E49B57BB59D904088401765DB6EABCE99273D618E90712841EFC5108354BE098CF3F03E43F396A94D1A09BF27B8'
let career_url = 'https://careersonline.unimelb.edu.au/students/jobs/search?text=&typeofwork=2450&location=&country=Any&contractHours=FullTime&occupation=2461&residency=All+candidates+considered+including+international+students&page=1&take=999'


superagent.get(career_url).set("Cookie",auth).end(function(err,response){
    if (err) {
        console.log(err);
    } else {
        console.log(response.text);
        var $ = cheerio.load(response.text);
        var array = $('.list-group-item');
        if (array && array.length > 0) {
            array.each(function () {
                // console.log($(this).find('.zm-item-title>a').text() + " " + ($(this).find('.zg-num').text() ? $(this).find('.zg-num').text() : "0"));
                console.log("Position:", $(this).find('.list-group-item-heading h4').text().replace(/\s+/g,' '));
                console.log("Company:", $(this).find('.list-group-item-heading h5').text().replace(/\s+/g,' '));
                console.log("URL:", "https:\/\/careersonline.unimelb.edu.au"+ $(this).find('.list-group-item-heading a').attr('href'));
                console.log();
            });
        }
    }
});




// MongoClient.connect(db_url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to MongoDB");

//     findDocuments( 
//                     db,
//                     "gradkkgp",
//                     gp
//                 );
// });



var findDocuments = function(db, collect, doc) {
    var collection = db.collection(collect);
    collection.find(doc).toArray(function(err, docs) {
        assert.equal(err, null);
        findDocCb(db, collect, doc, docs);
    });
}

var findDocCb = function(db, collect, doc, docs) {
    if (docs.length > 0) {
        deleteDocument(db, collect, doc);
    }
    else {
        insertDocuments(db, collect, doc);
    }
}

var insertDocuments = function(db, collect, doc) {
  // Get the documents collection
  var collection = db.collection(collect);
  // Insert some documents
  collection.insertMany([
    doc
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Added:", doc);
    db.close();
  });
}



var deleteDocument = function(db, collect, doc) {
  // Get the documents collection
  var collection = db.collection(collect);
  // Insert some documents
  collection.deleteOne(doc, function(err, result) {
    assert.equal(err, null);
    console.log("Removed:", doc);
    db.close();
  });
}