var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClubSchema = new Schema({
	name: String,
	trait1: Number,
	trait2: Number,
	trait3: Number,
	trait4: Number,
	trait5: Number,
	size: Number,
	location: [Number, Number]
});


ClubSchema.statics = {
	load: function(id, cb) {
		this.findOne({_id : id}).exec(cb);
	}
};

mongoose.model('Club', ClubSchema);

