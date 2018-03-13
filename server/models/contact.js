var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Contact"

var schema = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    userId: { type: ObjectId, ref: "User", required: true }

})

module.exports = mongoose.model(schemaName, schema)