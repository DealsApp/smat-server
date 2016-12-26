var mongoose=require('mongoose');

var sjdealsSchema=mongoose.Schema({
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
    coordinates:{
        type:[Number],
        index:'2dsphere'
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

var SjDeals=module.exports=mongoose.model('SjDeals',sjdealsSchema);

module.exports.saveSjDeals=function(newSjDeals, callback){
    newSjDeals.save(callback);
}

module.exports.getDealById=function(deal_id,callback){
    SjDeals.findById(deal_id,callback);
}

module.exports.getNearByDeals=function(callback){
    SjDeals.find({},callback);
}

module.exports.removeSjDeals=function(callback){
    SjDeals.remove({}, callback);
}

module.exports.getRealtimeNearbyDeals=function(lon,lat,callback){
    SjDeals.find({},callback).where('coordinates').near({ center: { coordinates: [lon, lat], type: 'Point' }, maxDistance: 8000 });
}

module.exports.getRealtimeNearByDealsCount=function(lon, lat, callback){
    SjDeals.count({},callback).where('coordinates').near({ center: { coordinates: [lon, lat], type: 'Point' }, maxDistance: 8000 });
}

module.exports.getSfDeals=function(callback){
    SjDeals.find({city:'San Francisco'}, callback);
}

module.exports.getSfDeals=function(callback){
    SjDeals.find({city:'San Francisco'}, callback);
}

module.exports.getMvDeals=function(callback){
    SjDeals.find({city:'Mountain View'}, callback);
}

module.exports.getScDeals=function(callback){
    SjDeals.find({city:'Santa Clara'}, callback);
}

module.exports.getRestaurantDeals=function(city,callback){
    SjDeals.find({categoryID:1, city:city},callback);
}

module.exports.getEntertainmentDeals=function(city,callback){
    SjDeals.find({categoryID:2, city:city},callback);
}

module.exports.getSpaDeals=function(city,callback){
    SjDeals.find({categoryID:3, city:city},callback);
}

module.exports.getServiceDeals=function(city,callback){
    SjDeals.find({categoryID:4, city:city},callback);
}

module.exports.getEventDeals=function(city,callback){
    SjDeals.find({categoryID:6, city:city},callback);
}

module.exports.getTravelDeals=function(city,callback){
    SjDeals.find({categoryID:7, city:city},callback);
}

module.exports.getOtherDeals=function(city,callback){
    SjDeals.find({categoryID:0, city:city},callback);
}

