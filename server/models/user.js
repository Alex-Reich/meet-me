var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var schemaName = 'User';
const SALT_FACTOR = 13;

var schema = new Schema({
    userName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 }
});

schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
};
schema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model(schemaName, schema);