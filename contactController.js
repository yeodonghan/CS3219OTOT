// contactController.js

// Import contact model
Contact = require('./contactModel');

// Handle index actions
exports.index = function (req, res) {
    console.log("getting all contacts....");
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json({
            status: 200,
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
    res.status(201).json({
                status: 201,
                message: 'New contact created!',
                data: contact
            });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).json({
                status: 200,
                message: 'Contact details loading..',
                data: contact
            });
        }
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        console.log("Contact edited")
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.status(200).json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    console.log("deleting: " + req.params.contact_id)
    Contact.deleteOne({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};