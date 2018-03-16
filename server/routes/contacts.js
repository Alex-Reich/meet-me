var router = require("express").Router()
var Contacts = require("../models/contact")

//  Create a Contact
router.post("/api/contacts", (req, res, next) => {

    // req.body.userId = req.session.uid
    Contacts.create(req.body)
        .then(contact => {
            res.send(contact)
        })
        .catch(next)
})

// Delete a contact by ID (no user) 
router.delete("/api/contacts/:contactId", (req, res, next) => {
    Contacts.findById(req.params.contactId)
        .then(contact => {

            var creatorId = contact.userId
            contact.remove() // Delete the contact
                .then(task => {
                    res.send({ message: 'Successfully deleted contact' })
                })
                .catch(next)
        })
})

//find one and remove for auth userId
router.delete("/api/contacts/:contactId", (req, res, next) => {
    Contacts.findOneAndRemove({ userId: req.session.uid, _id: req.params.contactId })
        .then(board => {
            if (!board) {
                res.status(401).send({ error: "Not authorized to remove board" })
            } else {
                res.send({ message: "Successfully deleted board" })
            }
        })
        .catch(next)
})

// Update a contact by ID
router.put("/api/lists/:contactId", (req, res, next) => {
    Contacts.findByIdAndUpdate(req.params.contactId, req.body, { new: true })
        .then(list => {
            res.send({ message: "Successfully updated contact", data: list })
        })
        .catch(next)
})

// Get contacts by userId
router.get("/api/users/:userId/contacts", (req, res, next) => {
    Contacts.find({ userId: req.params.userId })
        .then(contacts => {
            return res.send(contacts)
        })
        .catch(next)
})


// Test Only:  get all contacts
router.get("/api/contacts", (req, res, next) => {
    Contacts.find()
        .then(contacts => {
            return res.send(contacts)
        })
        .catch(next)
})

module.exports = { router };