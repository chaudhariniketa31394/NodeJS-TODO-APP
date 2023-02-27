const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

// route for when user deletes a todo item
router.delete('/todo/:id', function (req, res) {
    // remove the document in the database that matches the id.
    Todo.find({ _id: req.params.id }).remove(function (err, doc) {
        if (err) return res.status(500).send({success: true, message: 'something went wrong'});

        // send response back with the document object that was deleted
        return res.status(200).json({
            success: true,
            message: 'Deleted successfully'
        })
    });
});

module.exports = router;