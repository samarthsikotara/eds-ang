ApplicationController = require('../controllers/application_controller')
var config = require('../config/index.json');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var client = require('../models/redis');
var ResponseError = require('../services/response_error');
var User = require('../models/user');

class ApiController extends ApplicationController {
	constructor(req, res, next){
		super(req, res, next);
		res.setHeader('Access-Control-Allow-Origin', config.dashboard_url);
		res.setHeader('Access-Control-Allow-Credentials', true);
		//this.validate()
	}

	validate(){
		var self = this;
		return new Promise(function(resolve, reject){
			console.log('Hiii')
			console.log(!self.req.headers.authorization && !self.req.cookies.token)
			if(!self.req.headers.authorization && !self.req.cookies.token){
				// resolve();
				console.log(reject(new ResponseError(401, {message: "Unauthorized1"})))
				reject(new ResponseError(401, {message: "Unauthorized1"}));
			}else{
				var token = self.req.headers.authorization || self.req.cookies.token;
				resolve()
			}
		})
	}

	login(){
		if(this.req.body.username && this.req.body.password){
			var password = this.req.body.password
			var self = this
			User.findOne({where: {username: this.req.body.username}})
			.then(function (user) {
	      if (user == null) {
	        return self.res.status(422).json({status: false, message: "Username is incorrect"})
	      }
	      bcrypt.compare(password, user.password, function(err, valid) {
    			if(valid == true){
    				var token = crypto.randomBytes(16).toString('hex');
    				client.set(token,user.uuid)
    				self.res.json({uuid: user.uuid, name: user.username, token: token})
    			}else{
    				return self.res.status(422).json({status: false, message: 'Password is incorrect'})
    			}
    		})
    	})
		}else{
			this.res.status(400).json({status: false,message: "Incorrect credentials."})
		}
	}

	logout(){
		if (this.req.headers.authorization){
			var self = this
			var token = this.req.headers.authorization;
			client.getAsync(token).then((uuid) => {
				if(uuid == null) {
					this.res.status(200).json({status: false,message: "Invalid Token"});
				} else {
					User.findOne({where: {uuid: uuid}}).then((user) => {
 						if(user != null) {
							client.del(this.req.headers.authorization, function(error, reply){
								if(reply == 1){
									var monthEnd = new Date().getTime() + 30*24*3600000;
									self.res.json({status: true, message: "Successfully logout!"})
								}else{
									self.res.json({status: true, message: "Already logged out!"})
								}
							})
						} else {
							self.res.status(200).json({status: true, message: "Successfully logged out!"})
						}
					}).catch((error) => {this.res.status(200).json({status: false,message: "Invalid user uuid"})});
				}
			}).catch((error) => this.res.status(200).json({status: false,message: "Invalid Token"}));
		} else {
			this.res.status(400).json({status: false,message: "Token Missing"})
		}
	}
}

module.exports = ApiController;