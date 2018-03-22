var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Contact"

var schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true},
    created: { type: Date, default: Date.now(), required: true },
    userId: { type: ObjectId, ref: "User", required: true }

})

module.exports = mongoose.model(schemaName, schema)