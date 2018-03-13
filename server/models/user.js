var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var schemaName = 'User';
var ObjectId = mongoose.SchemaTypes.ObjectId

const SALT_FACTOR = 13;

var schema = new Schema({
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String },
    address: { type: String },
    contacts: { type: Array }
});

schema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
};
schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model(schemaName, schema);