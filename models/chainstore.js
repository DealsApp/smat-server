var mongoose=require('mongoose');

var chainstoreSchema=mongoose.Schema({
   chainID : {
       type : String
   },
   name : {
       type : String
   },
   page : {
       type : String
   },
   homepage : {
       type : String
   },
   logoBig : {
       type : String
   },
   logoSmall : {
       type : String
   },
});

var ChainStores=module.exports=mongoose.model('ChainStores',chainstoreSchema);


module.exports.removeChainStores=function(callback){
    ChainStores.remove({}, callback);
}

module.exports.saveChainStores=function(newChainStores, callback){
    newChainStores.save(callback);
}

module.exports.getChainStores=function(callback){
    ChainStores.find({},callback);
}

