var express = require('express');
var cors=require('cors');
var router = express.Router();
var bodyParser=require('body-parser');
var User=require('../models/user');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var jwt=require('jsonwebtoken');

router.use(cors()); //enable cross origin

/*api endpoint: /users/adduser
request type: POST
Usage: Adds a new user
Input: all user details in the form 
Response: A text saying user created or not
*/
router.post('/create', function(req, res, next) {

    var _email=req.body.email;
    var _password=req.body.password;
    var _phone=req.body.phone;
    var _fname=req.body.firstname;
    var _lname=req.body.lastname;
    
    req.checkBody('email','email cannot be empty').notEmpty();
    req.checkBody('email','email is invalid').isEmail();
    req.checkBody('password','password cannot be empty').notEmpty();
    req.checkBody('phone','phone cannot be empty').notEmpty();
    req.checkBody('firstname','firstname cannot be empty').notEmpty();
    req.checkBody('lastname','lastname cannot be empty').notEmpty();
    // req.checkBody('address.street','street cannot be empty').notEmpty();
    // req.checkBody('address.city','city cannot be empty').notEmpty();
    // req.checkBody('address.state','state cannot be empty').notEmpty();
    // req.checkBody('address.zip','zipcode cannot be empty').notEmpty();
    var errors=req.validationErrors();
    if(errors){
      res.status(400).send("User creation failed");
    }
    else{
      var new_user=new User({
        email:_email,
        password:_password, 
        phone:_phone,      
        firstname:_fname,
        lastname:_lname
      });

      User.createUser(new_user, function(err,user){
        if(err){
          res.status(400).send("User creation failed");
        }
        else{
         req.token = jwt.sign({
         id: user.id,
        }, 'smatserver201623111990',{
         expiresIn: 60*24
        });
          res.json({user: user.email,
                  token: req.token});
        }
      });
      
    }

});

router.post('/loginsocial', function(req,res,next){
  var id=req.body.id;
  if(typeof id === "string"){
    req.token = jwt.sign({
        id: id,
      }, 'smatserver201623111990',{
        expiresIn: 60*24
    });

     res.json({token:req.token});
  }
  else{
    res.status(400).send('Sorry invalid id format');
  }
});

/*api endpoint: /users/getuser
request type: POST
Usage: Fetches existing user
Response: Username and their details retrieved
Input: username, password
Output: token 
*/

router.post('/login', function(req, res, next) {
  passport.authenticate('local-users', {session:false},function(err, user, info) {
    if (err) { 
      return next(err);
    }
    if (!user) { 
      console.log(info);
      res.status(404).send('Username/password incorrect');      
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //user found
      req.token = jwt.sign({
        id: req.user.id,
      }, 'smatserver201623111990',{
        expiresIn: 60*24
      });
      return res.json({
      user: req.user,
      token: req.token
  });
    });
  })(req, res, next);
});

router.get('/getall',function(req,res,next){
  User.getAllUsers(function(err,users){
    if(err){
      throw err;
    }
    else{
      res.json(users);
    }
  });
});

  passport.use('local-users',new localStrategy({usernameField:'email',passwordField:'password'},function(email,password,done){
    User.getUserByUsername(email, function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message: 'User not found'});
      }
      
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
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
   res.redirect('/users/login'); 
 });

 router.delete('/deleteuser/:email',function(req,res){
    var email=req.params.email;
    User.removeUser(email,function(err,user){
      if(err){
        res.status(500).send("Some bad request");
      }else{
          res.status(200).send("User deleted successfuly"); 
      }
    });
 });

module.exports = router;
