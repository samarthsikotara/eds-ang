ApiController = require('../api_controller')
var User = require('../../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var _ = require('lodash');

class UserController extends ApiController {
	constructor(req, res, next){
		super(req, res, next);
		//this.validate();
	}

	create() {
		var self = this
		bcrypt.hash(self.req.body.password, saltRounds, function(err, hash) {
	  	console.log(hash)
		  User.create({username: self.req.body.name, password: hash, phoneNumber: "7738946204"})
			.then((user) => {
				self.res.json(user)
			})
		});
	}
}

module.exports = UserController;