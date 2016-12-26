var mongoose=require('mongoose');

var storecategorySchema=mongoose.Schema({
    categoryID : {
        type : Number
    },
    category : {
        type : String
    }
});

var StoreCategories=module.exports=mongoose.model('StoreCategories',storecategorySchema);

module.exports.saveStoreCategories=function(newStoreCategories, callback){
    newStoreCategories.save(callback);
}

module.exports.getStoreCategories=function(callback){
    StoreCategories.find({},'category -_id',callback);
}


module.exports.removeStoreCategories=function(callback){
    StoreCategories.remove({}, callback);
}


