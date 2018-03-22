var router = require("express").Router()
var Contacts = require("../models/contact")

//  Create a Contact
router.post("/api/contacts", (req, res, next) => {
    req.body.userId = req.session.uid
    Contacts.create(req.body)
        .then(contact => {
            res.send(contact)
        })
        .catch(next)
})

//find one and remove for auth userId
router.delete("/api/contacts/:contactId", (req, res, next) => {
    Contacts.findOneAndRemove({userId: req.session.uid, _id: req.params.contactId})
        .then(contact => {
            if (!contact) {
                res.status(401).send({
                    error: "Not authorized to remove contact"
                })
            } else {
                res.send({
                    message: "Successfully deleted contact"
                })
            }
        })
        .catch(next)
})

// Update a contact by ID
router.put("/api/contacts/:contactId", (req, res, next) => {
    Contacts.findByIdAndUpdate(req.params.contactId, req.body, {
            new: true
        })
        .then(contact => {
            return res.send(contact)
        })
        .catch(next)
})

// Get contacts by userId
router.get("/api/contacts", (req, res, next) => {
    Contacts.find({userId: req.session.uid})
        .then(contacts => {
            return res.send(contacts)
        })
        .catch(next)
})

module.exports = {
    router
};