var mongoose=require('mongoose');

var storesubcategorySchema=mongoose.Schema({
    categoryID : {
        type : Number
    },
    category : {
        type : String
    },
    subcategory:{
        type : String
    },
    subcategoryID:{
        type : Number
    }
});

var StoreSubCategories=module.exports=mongoose.model('StoreSubCategories',storesubcategorySchema);

module.exports.saveStoreSubCategories=function(newStoreSubCategories, callback){
    newStoreSubCategories.save(callback);
}

module.exports.removeStoreSubCategories=function(callback){
    StoreSubCategories.remove({}, callback);
}