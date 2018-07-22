ApiController = require('../api_controller')
var Student = require('../../models/student');
var Test = require('../../models/test');
var _ = require('lodash');

class StudentController extends ApiController {
	constructor(req, res, next){
		super(req, res, next);
		//this.validate();
	}

	index(next){
		var self = this
		var where = {}
		if(self.req.query.keyword){
			where['$or'] = {name: {$ilike: '%'+self.req.query.keyword+'%'}}
		}
		Student.findAll({where: where})
		.then((students) => {
			self.res.json({students: students})
		})
	}

	tests(){
		var self = this
		var where = {}
		if(self.req.query.keyword){
			where['$or'] = {name: {$ilike: '%'+self.req.query.keyword+'%'}}
		}
		Student.findAll({where: where})
		.then((students) => {
			var ids = []
			students.forEach(function(st){
				ids.push(st.id)
			})
			var test_where = {}
			if(ids.length > 0){
				test_where = {studentId: ids}
			}
			Test.findAll({where: test_where})
			.then((tests) => {
				self.res.json({tests: tests})
			})	
		})
	}

	create(){
		var self = this
		Student.create({name: this.req.body.name, birthdate: Date.now()})
		.then((students) => {
			self.res.json({students: students})
		})
	}

	test_create(){
		var self = this
		Test.create({studentId: this.req.body.studentId, score: this.req.body.score})
		.then((students) => {
			self.res.json({students: students})
		})	
	}
}

module.exports = StudentController;