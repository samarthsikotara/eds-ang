ApiController = require('../api_controller')
var Category = require('../../models/category');
var Product = require('../../models/product');
var _ = require('lodash');

class CategoryController extends ApiController {
	constructor(req, res, next){
		super(req, res, next);
		this.validate();
	}

	validate(){}

	index(next){
		var self = this
		Category.find({}, function(err, categories){
			console.log(categories)
			var response = []
			var promises = []
			categories.forEach(function(category){
				promises.push(category.getChildren())
			})
			Promise.all(promises).then((res) => {
				self.res.json(res)
			})
		}).catch((error) => {
			self.res.status(422).json({message: error})
		})
	}

	create() {
		var self = this
		var category = new Category({
			name: self.req.body.name,
			type: self.req.body.type,
			parentId: self.req.body.parentId
		})
		category.save(function(err, newCategory) {
			if(err) {
				return self.res.status(422).json({message: err, status: false})
			}
			self.res.json(newCategory)
		})
	}

	products(){
		var self = this
		if(self.req.params.categoryId) {
			Category.findOne({_id: self.req.params.categoryId})
			.populate({path: 'products', model: 'Product'})
			.then((category) => {
				if(category) {
					self.res.json(category)
				} else {
					self.res.status(422).json({message: "No category found"})
				}
			}).catch((error) => {
				self.res.status(422).json({message: error})
			})
		} else {
			self.res.status(400).json({message: "Params missing"})	
		}
	}

	show() {
		var self = this
		if(self.req.params.categoryId) {
			Category.findOne({_id: self.req.params.categoryId})
			.populate({path: 'products', model: 'Product', select: 'type _id'})
			.populate({path: 'siblings', model: 'Category'}).then((category) => {
				if(category) {
					var products = category.products
					var siblings = category.siblings
					category.getChildren().then((categories) => {
						if(categories && categories.length) {
							var response = []
							categories.forEach(function(a) {
								var resCat = a.toObject()
								if(a._id.equals(category._id)) {
									resCat["products"] = products
									resCat['siblings'] = siblings
								}
								response.push(resCat);
							})
							self.res.json({response})
						} else {
							self.res.status(422).json({message: "No category found"})
						}
					}).catch((error) => {console.log(error); self.res.status(422).json({message: error})})
				} else {
					self.res.status(422).json({message: "No category found"})
				}
			}).catch((error) => {
				console.log(error);
				self.res.status(422).json({message: error})
			})
		} else {
			self.res.status(400).json({message: "Params missing"})	
		}
		
	}
}

module.exports = CategoryController;