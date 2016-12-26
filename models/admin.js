var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

var AdminSchema=mongoose.Schema({
    username: {
        type: String,
        index:{unique:true}
    },
    password:{
        type: String
    },
    email:{
        type: String,
        index:{unique:true}
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    }
});

var Admin=module.exports = mongoose.model('Admin',AdminSchema);

module.exports.getAdminById=function(id,callback){ 
    Admin.findById(id,callback);     
}

module.exports.getAdminByUsername=function(username,callback){
    var query={username:username};
    Admin.findOne(query, callback);
}

module.exports.comparePassword=function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null,isMatch);
  });
}

module.exports.createAdmin=function(newAdmin,callback){ 
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newAdmin.password, salt, function(err, hash) {
        newAdmin.password=hash;
        newAdmin.save(callback);     
    });
});
   
}
