ApiController = require('../api_controller')
var Category = require('../../models/category');
var Product = require('../../models/product')
var _ = require('lodash');

class ProductController extends ApiController {
	constructor(req, res, next){
		super(req, res, next);
		this.validate();
	}

	validate(){

	}

	index(next){}

	show() {}

	create() {
		var self = this
		if(self.req.body.categoryId) {
			var product = new Product({
				name: self.req.body.name, 
				type: self.req.body.type,
				categoryId: self.req.body.categoryId,
			  productId: self.req.body.productId
			})
			product.save(function(err, newObject) {
				if(err) {
					console.log(err)
					return self.res.status(422).json({message: err})
				}
				self.res.json(newObject)
			})
		} else {
			self.res.status(400).json({message: "Missing params"})
		}
		
	}

	update(){
		var self = this
		if(self.req.params.productId) {
			console.log(self.product_params(self.req.body))
			var product = new Product(self.product_params(self.req.body))
			var product = product.toObject()
			delete product._id
			Product.update({_id: self.req.params.productId}, product, {upsert: true}, function(err, updatedProduct) {
				if(err) {
					console.log(err)
					return self.res.status(422).json({message: err})
				}
				self.res.json(updatedProduct)
			})
		} else {
			self.res.status(400).json({message: "Missing params"})
		}
	}

	product_params(params){
		var keys = ['name','type', 'price'];
		return _.pick(params,keys);
	}
}

module.exports = ProductController;