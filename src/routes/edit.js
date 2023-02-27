const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator")
router.use(isLogged);
let Todo = require("../models/todo");

// route for when user edits a todo item
router.put('/todo/:id', async function (req, res) {

    try {
        const result = await Todo.updateOne({ _id: req.params.id }, req.body);
        console.log("result", result)
        if (result) return res.status(200).json({
            success: true,
            message: 'Todo update successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }

    // update the document in the database has matches the id with updated todo data

});

// route for when user edits a checkbox
router.put('/check/:id', function (req, res) {
    // update the document in the database has matches the id with updated checkbox data
    Todo.update({ _id: req.params.id }, { check: req.body.check }, function (err, doc) {
        if (err) throw err;
        console.log("checkbox edited!");

        // send response back with the document object that was edited
        res.send(doc);
    });
});
module.exports = router;