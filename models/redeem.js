var mongoose=require('mongoose');

var redeemSchema=mongoose.Schema({
    deal_id: String,
    total_redemptions:Number,
    dealTitle:String,
    dealinfo:String,
    dealCity:String,
    dealPrice:Number
});

var Redemptions= module.exports=mongoose.model('Redemptions', redeemSchema);

module.exports.findRedeemedDeal=function(deal_id,callback){
    Redemptions.findOne({deal_id}, callback);
}

module.exports.saveRedeemedDeal=function(deal,callback){
    deal.save(callback);
}

module.exports.updateRedeemCount=function(deal_id,callback){
    Redemptions.update({deal_id:deal_id},
                       {$inc:{total_redemptions:1}},
                       callback);
}

module.exports.trendingDeals=function(callback){
    Redemptions.find({},callback).sort({"total_redemptions":-1}).limit(5);
}

module.exports.trendingDealsByCity=function(city, callback){
    Redemptions.find({dealCity:city},callback).sort({"total_redemptions":-1}).limit(5);
}