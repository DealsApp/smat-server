var express = require('express');
var router = express.Router();
var LocalDeals=require('../models/localdeal');
var ChainStores=require('../models/chainstore');
var DealTypes=require('../models/dealtype');
var DealsNearby=require('../models/sjdeal');
var StoreCategories=require('../models/storecategory');
var RedeemedDeal=require('../models/redeem');

// var expressJwt = require('express-jwt');  
// var authenticateJwt = expressJwt({secret : 'smatserver201623111990'});

/*
api endpoint: /deals/getlocaldeals
request type: GET
Input: None 
Response: Get all local deals
*/
router.get('/getlocaldeals', function(req, res, next){
    LocalDeals.getLocalDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getlocaldeals/sf',function(req,res){
    DealsNearby.getSfDeals(function(err, sfdeals){
        if(err){
            throw err;
        }else{
            res.json(sfdeals);
        }
    });
});

router.get('/getlocaldeals/mv',function(req,res){
    DealsNearby.getMvDeals(function(err, mvdeals){
        if(err){
            throw err;
        }else{
            res.json(mvdeals);
        }
    });
});

router.get('/getlocaldeals/sc',function(req,res){
    DealsNearby.getScDeals(function(err, scdeals){
        if(err){
            throw err;
        }else{
            res.json(scdeals);
        }
    });
});

/*
api endpoint: /deals/getnearbydeals
request type: GET
Input: None 
Response: Get all nearby deals
*/
router.get('/getnearbydeals', function(req, res, next){
    DealsNearby.getNearByDeals(function(err,deals_nearby){
        if(err){
            throw err;
        }
        else{
            res.json(deals_nearby);
        }
    });
});

/*
api endpoint: /deals/getchainstores
request type: GET
Input: None 
Response: Get all chainstores
*/
router.get('/getchainstores',function(req, res, next){
    ChainStores.getChainStores(function(err,chainstores){
        if(err){
            throw err;
        }
        else{
            res.json(chainstores);
        }
    });
});

/*
api endpoint: /deals/dealtypes
request type: GET
Input: None 
Response: Get all dealtypes
*/
router.get('/getdealtypes',function(req, res, next){
    DealTypes.getDealTypes(function(err,dealtypes){
        if(err){
            throw err;
        }
        else{
            res.json(dealtypes);
        }
    });
});

/*
api endpoint: /deals/storecategories
request type: GET
Input: None 
Response: Get all storecategories
*/
router.get('/getstorecategories',function(req, res, next){
    StoreCategories.getStoreCategories(function(err,storecategories){
        if(err){
            throw err;
        }
        else{
            res.json(storecategories);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/restaurants
request type: GET
Input: None 
Response: Get all restaurant based deals
*/
router.get('/getdealsbycategory/restaurants',function(req, res, next){
    LocalDeals.getLocalRestaurantDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/restaurants/sf',function(req, res, next){
    DealsNearby.getRestaurantDeals("San Francisco", function(err,sfdeals){
        if(err){
            throw err;
        }
        else{
            res.json(sfdeals);
        }
    });
});

router.get('/getdealsbycategory/restaurants/mv',function(req, res, next){
    DealsNearby.getRestaurantDeals("Mountain View", function(err,mvdeals){
        if(err){
            throw err;
        }
        else{
            res.json(mvdeals);
        }
    });
});

router.get('/getdealsbycategory/restaurants/sc',function(req, res, next){
    DealsNearby.getRestaurantDeals("Santa Clara", function(err,scdeals){
        if(err){
            throw err;
        }
        else{
            res.json(scdeals);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/entertainment
request type: GET
Input: None 
Response: Get all entertainment based deals
*/
router.get('/getdealsbycategory/entertainment',function(req, res, next){
    LocalDeals.getLocalEntertainmentDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/entertainment/sf',function(req, res, next){
    DealsNearby.getEntertainmentDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/entertainment/mv',function(req, res, next){
    DealsNearby.getEntertainmentDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/entertainment/sc',function(req, res, next){
    DealsNearby.getEntertainmentDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/spa
request type: GET
Input: None 
Response: Get all beauty and spa based deals
*/
router.get('/getdealsbycategory/spa',function(req, res, next){
    LocalDeals.getLocalSpaDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/spa/sf',function(req, res, next){
    DealsNearby.getSpaDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/spa/mv',function(req, res, next){
    DealsNearby.getSpaDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/spa/sc',function(req, res, next){
    DealsNearby.getSpaDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});


/*
api endpoint: /deals/getdealsbycategory/services
request type: GET
Input: None 
Response: Get all service based deals
*/
router.get('/getdealsbycategory/services',function(req, res, next){
    LocalDeals.getLocalServiceDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/services/sf',function(req, res, next){
    DealsNearby.getServiceDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/services/mv',function(req, res, next){
    DealsNearby.getServiceDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/services/sc',function(req, res, next){
    DealsNearby.getServiceDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/events
request type: GET
Input: None 
Response: Get all events based deals
*/
router.get('/getdealsbycategory/events',function(req, res, next){
    LocalDeals.getLocalEventDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/events/sf',function(req, res, next){
    DealsNearby.getEventDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/events/mv',function(req, res, next){
    DealsNearby.getEventDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/events/sc',function(req, res, next){
    DealsNearby.getEventDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/travel
request type: GET
Input: None 
Response: Get all travel based deals
*/
router.get('/getdealsbycategory/travel',function(req, res, next){
    LocalDeals.getLocalTravelDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/travel/sf',function(req, res, next){
    DealsNearby.getTravelDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/travel/mv',function(req, res, next){
    DealsNearby.getTravelDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/travel/sc',function(req, res, next){
    DealsNearby.getTravelDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

/*
api endpoint: /deals/getdealsbycategory/others
request type: GET
Input: None 
Response: Get all other deals
*/
router.get('/getdealsbycategory/others',function(req, res, next){
    LocalDeals.getLocalOtherDeals(function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/others/sf',function(req, res, next){
    DealsNearby.getOtherDeals("San Francisco",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/others/mv',function(req, res, next){
    DealsNearby.getOtherDeals("Mountain View",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getdealsbycategory/others/sc',function(req, res, next){
    DealsNearby.getOtherDeals("Santa Clara",function(err,localdeals){
        if(err){
            throw err;
        }
        else{
            res.json(localdeals);
        }
    });
});

router.get('/getrealtimedeals/:lon/:lat',function(req,res){
    var lat=Number(req.params.lat);
    var lon=Number(req.params.lon);

    DealsNearby.getRealtimeNearbyDeals(lon,lat,function(err,deal){
        if(err){
            res.status(400).send(err);
        }else{
            res.json(deal);
        }
    });   
});

router.get('/getrealtimedealscount/:lon/:lat',function(req,res){
    var lat=Number(req.params.lat);
    var lon=Number(req.params.lon);

    DealsNearby.getRealtimeNearByDealsCount(lon,lat,function(err,dealcount){
        if(err){
            res.status(400).send(err);
        }else{
            res.json({"dealcount":dealcount.toString()});
        }
    });   
});


/*
api endpoint: /deals/redeem/deal_id
request type: get
Input: deal_id(request_param) 
Response: Message saying whether deal redeemed or not
*/
router.get('/redeem/:dealId', function(req,res){
    var deal_id=req.params.dealId;
    DealsNearby.getDealById(deal_id,function(err,localdeal){
        if(err){           
           res.status(400).send(err);
        }
        else if(!localdeal){
            res.status(404).send('Invalid deal id');
        }
        else{        
            //deal found..now try finding it if it already exists in deals_redeemed collection
            RedeemedDeal.findRedeemedDeal(deal_id,function(err,deal){
                if(err){
                     res.status(400).send(err);
                }
                else if(!deal){
                    //deal not found so add it to deals_redeemed collection
                    var dealObj=new RedeemedDeal({
                        deal_id:deal_id,
                        dealTitle:localdeal.dealTitle,
                        dealinfo:localdeal.dealinfo,
                        dealPrice:localdeal.dealPrice,
                        dealCity:localdeal.city,
                        total_redemptions:1
                    });
                    RedeemedDeal.saveRedeemedDeal(dealObj,function(err,dealid){
                        if(err){
                            console.log('some error');
                           res.status(400).send(err);
                        }
                        else{
                           res.status(200).send('Deal succesfully redeemed for first time');
                        }
                    });
                }
                else{
                    //deal found..so increment total_redemptions count
                    RedeemedDeal.updateRedeemCount(deal_id,function(err,dealid){
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.status(200).send('Deal redeem count updated succesfully');
                        }
                    });
                }
            });                
        }
    });   
});

router.get('/dealstrending',function(req,res){
    RedeemedDeal.trendingDeals(function(err,deals){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.json(deals);
        }
    });
});

router.get('/dealstrendingbycity/:city',function(req,res){
    var city=req.params.city;
    RedeemedDeal.trendingDealsByCity(city, function(err,deals){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.json(deals);
        }
    });
});

module.exports=router;