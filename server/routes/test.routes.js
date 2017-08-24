var express = require('express');
var router = express.Router();
var test = require('../controller/test.controller');

router.get('/test', test.test);

module.exports=router;