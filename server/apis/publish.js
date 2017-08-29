/**
 * Created by hastings on 16/03/2017.
 */
// var SES = require('../../../private/allume_aws');
var express = require('express');
var router = express.Router();


router.post('/contact', function (req, res, next) {

    res.set('Content-Type', 'application/json');

    res.send({"command": "subscribe", result: "ding yue cheng gong!"});
});

module.exports = router;
