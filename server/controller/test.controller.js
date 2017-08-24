var request = require('request');
exports.test = function(req, res) {
   res.status(200).jsonp({status:200,message:"Message sent"})
 }