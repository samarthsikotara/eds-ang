ApplicationController = require('../controllers/application_controller')

class ApiController extends ApplicationController {
	constructor(req, res, next){
		super(req, res, next);
		//this.validate();
	}

	validate(){
		
	}
}

module.exports = ApiController;