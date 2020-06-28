var mongoose = require('mongoose');
bcrypt = require('bcrypt')

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};


module.exports = mongoose.model('User', UserSchema);