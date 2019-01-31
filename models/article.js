const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: {
		type: String,
		minlength: 5,
		maxlength: 400,
		required: true
		
	},
 	subtitle: {
  	type: String,
		minlength: 5,
  },
  description: {
  	type: String,
    minlength: 5,
    maxlength:5000,
    required:true
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
  	type: Date,
  	default: Date.now,
    required: true
  },
  updatedAt:{
    type: Date,
    default: Date.now,
    required: true
  },
  cat: {
    type: String,
    enum: ['sport', 'games', 'history'],
    required: true
  }
});

module.exports = mongoose.model('Article', ProductSchema);
