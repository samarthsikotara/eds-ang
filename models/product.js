var mongoose = require('../models/mongoose');
var Schema = mongoose.Schema;
var Category = require('../models/category')


// create a schema
var productSchema = new Schema({
  name: String,
  type: { type: String, required: true},
  price: {type: Number, default: 0.0},
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category'},
  productId: {type: String}
}, 
{ 
  timestamps: true
});


var ProductObject = mongoose.model('Product', productSchema);

productSchema.post('save', function(object) {
  var Category = require('../models/category')
  Category.findOne({_id: object.categoryId}, function(err, category) {
    if(err) {
      return handleError(err);
    }
    category.products.push(object)
    category.save(function(err, updatedCategory) {
      if(err) {
        return handleError(err);
      }
    })
  })
});


module.exports = ProductObject;