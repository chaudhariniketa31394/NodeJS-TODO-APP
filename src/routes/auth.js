const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();
const jwt = require('jsonwebtoken');
let Account = require("../models/account");
const {JWT_SECRETE} = require("../configs/database")

console.log("ssssssssinside auth route")

// route for when user logs out, session is destroyed and user redirected to login
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});

// route for when user views register page
router.get("/register", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("register", { message: undefined });
  }
});


router.post("/register", validateRegister(), async function (req, res) {
  console.log("request.body", req.body)
  try {
   // const hash = await bcrypt.hash(req.body.password, 10)
    const user = await Account.findOne({ email: req.body.email })
    console.log("user",user)
    if (user) return res.status(202).send("email already exist");

    const doc = await Account.create({
      email: req.body.email
    })
    console.log("docc",doc)
    req.login(doc._id, function(err) {
      if (err) throw err;
      req.session.user = req.body.email})
    return res.status(201).json({
      success:true,
      data:doc,
      Message:"User Created Successfully"})


  } catch (error) {
    console.log("error",error)
    res.status(500).send("Something went wrong")
  }

});

// route for when user views login page
router.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("login", { message: undefined });
  }
});

// route for when user submits login details
router.post("/login", async function (req, res) {
  try {
    console.log("session",req.session)
    console.log("req.isAuthenticated()",req.isAuthenticated())
    console.log("JWT_SECRETE",JWT_SECRETE)
    // make input not case sensitive
    req.body.email = req.body.email.toLowerCase();
    // req.body.password = req.body.password.toLowerCase();
    const doc = await Account.findOne({ email: req.body.email })
    if (doc) {
      if(doc.otp === req.body.otp){ req.login(doc._id,(err,result)=>
        { console.log("errerrerrr",err)
        console.log("errerreresult)rrr",result)
          if(err) 
        {
          
        }
         })
      req.session.user = req.body.email;
      console.log("req.session.",req.session)
                  const token = jwt.sign(
                  { _id: doc._id, email: doc.email},
                  JWT_SECRETE,
                  {
                    expiresIn: "1h",
                  }
                )
      
        await Account.updateOne({_id: doc._id }, { $set:{token: token} },{new:true}); 
    
      return res.status(200).send({token:token,userId:doc._id,email:doc.email})
    } else{return res.status(404).json({
        success: false,
        message: 'otp is wrong'
    })}
    //  const result = await bcrypt.compare(req.body.password, doc.password);
    //   if (result == true) {
       
     // }

     // return res.status(404).send("password does not match")
    }
    return res.status(404).send("user not found")
  } catch (error) {
    console.log("eroorrrr",error)
    return res.status(500).send("something went wrong")
  }

});

// middleware which makes input lowercase and checks if it is valid.
function validateRegister() {
  return function (req, res, next) {
    // make input not case sensitive

    req.body.email = req.body.email.toLowerCase();
    //req.body.password = req.body.password.toLowerCase();
    console.log("req.body.email", validator.isEmail(req.body.email))
    //console.log("req.body.password", validator.isAlphanumeric(req.body.password))
    if (
      validator.isEmail(req.body.email) 
     // validator.isAlphanumeric(req.body.password)
    ) {
      console.log("authentication = " + req.isAuthenticated());
      return next();
    }
    res.status(404).send("email and password should include aplhabates");
  };
}

module.exports = router;
