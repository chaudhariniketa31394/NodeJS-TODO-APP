const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

// route for when submits new todo item
router.post('/todos', async function (req, res) {
    // create todo model with data passed from request and save to databse
    const {sort} = req.body
    const limit = parseInt(req.body.limit) || 2;
    const skip = (parseInt(req.body.pageNumber)  > 0) ? limit * (parseInt(req.body.pageNumber) - 1) : 0;       
    const docs = await Todo.find({}).sort(sort).limit(limit).skip(skip);
    const result = {
        data: docs,
        next: docs.length < limit ? '' : `${req.path}?page=${req.body.pageNumber + 1}`,
        previous: (req.body.pageNumber > 1) ? `${req.path}?page=${req.body.pageNumber - 1}` : '',
    }
    res.send(result);
});

module.exports = router;