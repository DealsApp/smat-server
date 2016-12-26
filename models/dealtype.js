var mongoose=require('mongoose');

var dealtypeSchema=mongoose.Schema({
    dealtypeid:{
        type: String
    },
    TypeName: {
        type : String
    }
});

var DealTypes=module.exports=mongoose.model('DealTypes',dealtypeSchema);

module.exports.saveDealTypes=function(newDealTypes, callback){
    newDealTypes.save(callback);
}

module.exports.getDealTypes=function(callback){
    DealTypes.find({},callback);
}

module.exports.removeDealTypes=function(callback){
    DealTypes.remove({}, callback);
}


