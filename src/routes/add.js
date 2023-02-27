const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator");
const passport = require("passport")
router.use(isLogged);


let Todo = require("../models/todo");

// route for when submits new todo item


router.post('/todo', passport.authenticate('session'),async function (req, res) {
    console.log("req.session.user,",req.session)
    // create todo model with data passed from request and save to databse
try {
    const doc = await Todo.create({
        todo: req.body.todo,
        status: req.body.status,
        email: req.session.user,
        date: new Date()
    });
    return res.status(201).json({
        success: true,
        message: 'Todo created successful',
        data: doc
    })
} catch (error) {
    console.log("error",error)
    return res.status(500).send({
        success: false,
        message: 'Something went wrong'
       
    })
}


});

module.exports = router;