var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

//user schema
var UserSchema=mongoose.Schema({
    email:{
        type: String,
        index:{unique:true}
    },
    password:{
        type: String
    },
    phone: {
        type:String       
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    deals_redeemed:[]
});

UserSchema.path('phone').validate(function(v){
    return (v.length === 10);
}, 'Phone number has to be 10 digits');

//'User' will be our model name and UserSchema is passed as schema for 2nd arg
var User=module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById=function(id,callback){ 
    User.findById(id,callback);     
}

module.exports.getUserByUsername=function(email,callback){
    var query={email:email};
    User.findOne(query, callback);
}

module.exports.comparePassword=function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null,isMatch);
  });
}

//so that createUser is available outside this module for usage
module.exports.createUser=function(newUser,callback){ 
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        newUser.password=hash;
        newUser.save(callback);     
    });
 });
}

module.exports.getAllUsers=function(callback){
    User.find({},callback);
}   

module.exports.removeUser=function(email, callback){
    User.findOne({email:email}).remove(callback);
}


