var mongoose = require('mongoose');

var ClubSchema = mongoose.Schema({
	name: String,
	trait1: Number,
	trait2: Number,
	trait3: Number,
	trait4: Number,
	trait5: Number,
	trait6: Number,
	trait7: Number,
	size: Number,
	img: String,
	description: String,
	location: [Number, Number]
});


var Club = mongoose.model('Clubs', ClubSchema, 'clubs');
module.exports = Club;


