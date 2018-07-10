var mongoose = require('../models/mongoose');
var Schema = mongoose.Schema;
var products = require('../models/product');
var _ = require('lodash');

// create a schema
var categorySchema = new Schema({
  name: String,
  type: { type: String, required: true},
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  parentId: {type: Schema.Types.ObjectId, ref:'Category', autopopulate: true},
  path: {type: String},
  siblings: [{type: Schema.Types.ObjectId, ref:'Category', autopopulate: true}]
}, 
{ 
  timestamps: true
});


categorySchema.methods.getChildren = function() {
  var self = this
  return new Promise(function(resolve, reject) {
    self.model('Category').find({path: {$regex: self.path}}).populate({path: 'products', model: 'Product', select: '_id'}).exec()
    .then((children) => {
      var goodChildren = _.remove(children, function(child) {
        if(!child._id.equals(self._id)){
          return child
        }
      });
      resolve({id: self._id, name: self.name, child_categories: goodChildren})
    }).catch((error) => {
      reject({});  
    })
    
  })
}


var Category = mongoose.model('Category', categorySchema);

categorySchema.post('save', function(category) {
  if(category.parentId) {
    Category.findOne({_id: category.parentId}, function(err, parentCategory) {
      if(err) {
        return handleError(err);
      }
      category.path = parentCategory.path + "#" + category._id
      category.save(function(err, callback) {
        if(err) {
          return handleError(err);
        }
      })
    })
  } else {
    category.path = category._id
    category.save(function(err, callback) {
      if(err) {
        return handleError(err);
      }
    })    
  }
});



module.exports = Category;
