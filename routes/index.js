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
  res.render('login', {error: req.flash('error')});
});

router.get('/feed', function(req, res, next) {
  res.render('feed');
});


            //yha isloggedIn bol diya to ye page tab tak nhi khulega jab tak aap login nhi hoge
router.get('/profile', isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user // jab login kr lete ho then req.session.passport me tmhara username aa jaata h

  })
  res.render("profile", {user});
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
  failureRedirect: "/login",
  failureFlash: true //login naa ho paane pe flash message dikh paaynge
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
  res.redirect("/login");
}


module.exports = router;
