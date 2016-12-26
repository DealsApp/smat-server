var mongoose=require('mongoose');

var localdealsSchema=mongoose.Schema({
    name: {
        type: String
    },
	address:{
        type: String
    },
	storeID:{
        type: String
    },
	chainID:{
        type: String
    },
	phone:{
        type: String
    },
	state:{
        type: String
    },
	city:{
        type: String
    },
	ZIP:{
        type: String
    },
	URL:{
        type: String
    },
	storeURL: {
        type: String
    },
	dealTitle:{
        type: String
    },
	dealinfo:{
        type: String
    },
	expirationDate:{
        type: String
    },
	postDate:{
        type: String
    },
	showImageStandardBig:{
        type: String
    },
	showImageStandardSmall:{
        type: String
    },
	providerName:{
        type: String
    },
	DealTypeID:{
        type: Number
    },
	categoryID:{
        type: Number
    },
	lat:{
        type: Number
    },
	lon:{
        type: Number
    },
	distance:{
        type: Number
    },
	dealOriginalPrice:{
        type: Number
    },
	dealPrice:{
        type: Number
    },
	dealSavings:{
        type: Number
    },
	dealDiscountPercent:{
        type: Number
    }
});

var LocalDeals=module.exports=mongoose.model('LocalDeals',localdealsSchema);

module.exports.saveLocalDeals=function(newLocalDeals, callback){
    newLocalDeals.save(callback);
}

module.exports.removeLocalDeals=function(callback){
    LocalDeals.remove({}, callback);
}

module.exports.getLocalDeals=function(callback){
    LocalDeals.find({},callback); 
}

module.exports.getDealById=function(deal_id,callback){
    LocalDeals.findById(deal_id,callback);
}

module.exports.getLocalRestaurantDeals=function(callback){
    LocalDeals.find({categoryID:1},callback);
}

module.exports.getLocalEntertainmentDeals=function(callback){
    LocalDeals.find({categoryID:2},callback);
}

module.exports.getLocalSpaDeals=function(callback){
    LocalDeals.find({categoryID:3},callback);
}

module.exports.getLocalServiceDeals=function(callback){
    LocalDeals.find({categoryID:4},callback);
}

module.exports.getLocalEventDeals=function(callback){
    LocalDeals.find({categoryID:6},callback);
}

module.exports.getLocalTravelDeals=function(callback){
    LocalDeals.find({categoryID:7},callback);
}

module.exports.getLocalOtherDeals=function(callback){
    LocalDeals.find({categoryID:0},callback);
}


