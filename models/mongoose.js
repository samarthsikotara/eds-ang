var config = require('../config/config.json');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var env       = process.env.NODE_ENV || 'development';
var config    = config[env];

mongoose.connect("mongodb://"+config.host+":"+config.port+"/"+config.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connection successful"); // we're connected!
});

module.exports = mongoose;
