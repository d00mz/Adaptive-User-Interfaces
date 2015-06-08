var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new Schema({
	name: String,
	trait1: Number,
	trait2: Number,
	trait3: Number,
	trait4: Number,
	trait5: Number,
	trait6: Number,
	trait7: Number,
	size: Number,
	location: [Number, Number],
	lastLogin: {
		type: Date,
		default: Date.now
	},
	email: {
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String
});

var User = mongoose.model('Users', UserSchema, 'users');
module.exports = User;