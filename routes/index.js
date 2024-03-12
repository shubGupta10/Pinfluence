var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const localStratergy = require("passport-local")
passport.use(new localStratergy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


            //yha isloggedIn bol diya to ye page tab tak nhi khulega jab tak aap login nhi hoge
router.get('/profile', isLoggedIn,function(req, res, next) {
  res.send("profile");
});

//jaise hi banda register hua wo sidha profile pe jaayega.
router.post("/register", function(req, res){
  const { username, email, fullname } = req.body;
const userData = new userModel({ username, email, fullname });
userModel.register(userData, req.body.password)
.then(function(){
  passport.authenticate("local")(req, res, function(){
    res.redirect("/profile");
  })
})
})

router.post("/login",passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res){
});

router.get("/logout", function(req,res){
  req.logOut(function(err){ //isse request krke tm logout ho jaa rhe ho 
    if(err){ return next(err);} //agar koi error aya to tmhe error milega
    res.redirect("/");
  })
})


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}


module.exports = router;
