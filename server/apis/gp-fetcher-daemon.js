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
        console.log("Get------------->");
        cookie = response.headers['set-cookie'];
        console.log("cookie->", cookie);
        let cSID = cookie[0].split(";")[0];
        let cVTK = cookie[1].split(";")[0];
        console.log("cSID->", cSID);        
        console.log("cVTK->", cVTK);
        var $ = cheerio.load(response.text);
        let VTK = $('#LDAP-1 form input').attr('value')
        console.log("VTK->", VTK);


        superagent
        .post(career_login)
        .set('Cookie', cSID+";"+"cVTK")
        .query({__RequestVerificationToken: VTK})
        .query({LDAPUsername: ""})
        .query({LDAPPassword: ""})
        .end(function(err,response){
            if (err) {
                // console.log(err);
            } else {
                console.log(response.headers['set-cookie']);
            }
        });
    }
});



// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
// var db_url = 'mongodb://localhost:27017/test';

// let auth = '.CHAUTH=16CFE7B27C0CE901467B77EEA566142E4E72122A8813EB56D78B353C8340C9F483B0CDF89DB490A15DB57CE095B90EE9061CEF15C531F5C7F82F9BE5160EAC60711FE58364D6C42E5C5CB6259ED245BA67808B6B8A62DD55DF2927F4C6A39D37005125D01D105C3A0123A26081BF104184B7901FD14EF039AFABC60AEEBB67583E4961F2809F595992A1E70FE81C54C6AE2E6E1D55CEBB9AFC30415F9A53C3E944E508CFBDC2A9944628D7BB773F09E6'
// let career_url = 'https://careersonline.unimelb.edu.au/students/jobs/search?text=&typeofwork=2450&location=&country=Any&contractHours=FullTime&occupation=2461&residency=All+candidates+considered+including+international+students&page=1&take=999'

// var superagent= require("superagent");
// var cheerio=require("cheerio");

// superagent.get(career_url).set("Cookie",auth).end(function(err,response){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response.text);
//         var $ = cheerio.load(response.text);
//         var array = $('.list-group-item');
//         if (array && array.length > 0) {
//             array.each(function () {
//                 // console.log($(this).find('.zm-item-title>a').text() + " " + ($(this).find('.zg-num').text() ? $(this).find('.zg-num').text() : "0"));
//                 console.log("Position:", $(this).find('.list-group-item-heading h4').text().replace(/\s+/g,' '));
//                 console.log("Company:", $(this).find('.list-group-item-heading h5').text().replace(/\s+/g,' '));
//                 console.log("URL:", "https:\/\/careersonline.unimelb.edu.au"+ $(this).find('.list-group-item-heading a').attr('href'));
//                 console.log();
//             });
//         }
//     }
// });




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