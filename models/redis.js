var bluebird = require('bluebird');
var redis = require('redis');
var config = require('../config/index')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(config.redis); //creates a new client
module.exports = client;