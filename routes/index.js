var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const localStratergy = require("passport-local")
passport.use(new localStratergy(userModel.authenticate()));
const upload = require("./Multer");

/* GET home page. */
router.get('/',  function(req, res, next) {
  if(isLoggedIn){
    res.render('index');
  } 
});

router.get('/signup', function(req, res, next) { 
  res.render('signup', {error: req.flash('error')});
});


router.get('/login', function(req, res, next) { 
  res.render('login', {error: req.flash('error')});
});

router.get('/feed', isLoggedIn , function(req, res, next) {
  res.render('feed');
});

//route for post uploading                //yha jo file likha h uska name profile ke input ke andar file  is must
router.post('/upload', isLoggedIn , upload.single("file") , async function(req, res, next) {
  try{
  if(!req.file){
    return res.status(404).send("no files were given");
  }
  //jo file upload hui h usse save kro as a post and uska post id user kro do and post ko user ko do.
  const user = await userModel.findOne({username: req.session.passport.user});  
    const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user:  user._id
  });


  user.posts.push(post._id) //post ke andar post ki id daali h.
  await user.save(); //post save hua aur yha await laga h.
  res.redirect("/profile");
} catch(error){
  console.log(error);
}
});


            //yha isloggedIn bol diya to ye page tab tak nhi khulega jab tak aap login nhi hoge
router.get('/profile', isLoggedIn,  async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user // jab login kr lete ho then req.session.passport me tmhara username aa jaata h

  })
  .populate("posts");
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
