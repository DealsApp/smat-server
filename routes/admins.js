var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var Admin=require('../models/admin');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var jwt=require('jsonwebtoken');
/*api endpoint: /admins/createadmin
request type: POST
Usage: Adds a new admin
Input: all user admin in the form 
Response: A text saying admin created or not
*/
router.post('/create', function(req, res, next) {

    var username=req.body.username;
    var password=req.body.password;
    var email=req.body.email;
    var fname=req.body.firstname;
    var lname=req.body.lastname;

    req.checkBody('username','username cannot be empty').notEmpty();
    req.checkBody('password','password cannot be empty').notEmpty();
    req.checkBody('email','email cannot be empty').notEmpty();
    req.checkBody('email','email is invalid').isEmail();
    req.checkBody('firstname','firstname cannot be empty').notEmpty();
    req.checkBody('lastname','lastname cannot be empty').notEmpty();

    var errors=req.validationErrors();
    if(errors){
      res.send(errors);
    }
    else{
      var new_admin=new Admin({
        username:username,
        password:password,
        email:email,
        firstname:fname,
        lastname:lname
      });

      Admin.createAdmin(new_admin, function(err,admin){
        if(err){
          throw err;
        }
        else{
          console.log(admin);
          res.json(admin);
        }
      });
      
    }

});

router.post('/update', function(req,res,next){
  //code for admin update

});

/*api endpoint: /admins/login
request type: POST
Usage: Fetches existing admin
Response: Username and their details retrieved
Input: username, password
Output: token 
*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local',{session:false} ,function(err, admin, info) {
    if (err) { 
      return next(err);
    }
    if (!admin) { 
      return res.send('Admin not found'); 
    }
    req.logIn(admin, function(err) {
      if (err) { return next(err); }
       req.token = jwt.sign({
        id: req.user.id,
      }, 'smatserver201623111990');
      return res.json({
      admin: req.user,
      token: req.token
  });
      
    });
  })(req, res, next);
});


passport.serializeUser(function(admin, done) {
  console.log('serializing');
  done(null, admin.id);
});


passport.deserializeUser(function(id, done) {
  onsole.log('deserializing');
  Admin.getAdminById(id, function(err, admin) {
    done(err, admin);
  });
});
  
  passport.use('local',new localStrategy(function(username,password,done){
    Admin.getAdminByUsername(username, function(err,admin){
      if(err) throw err;
      if(!admin){
        return done(null,false,{message: 'Admin not found'});
      }
      
      Admin.comparePassword(password, admin.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch){
          return done(null, admin);
        }
        else{
          return done(null,false,{message: 'Password doesnt match our records'});
        }
      });
    });
    
  }));

router.get('/logout',function(req,res){
   req.logout();
   req.flash('success','You are logged out');
   res.redirect('/admins/login'); //redirecting it to login page after logout
 });
module.exports = router;
