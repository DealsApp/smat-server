var schedule = require('node-schedule');
var request = require('request');
var jsonfile = require('jsonfile');
var _ = require('underscore');
var LocalDeals = require('./models/localdeal.js');
var DealTypes = require('./models/dealtype.js');
var ChainStores = require('./models/chainstore.js');
var SjDeals = require('./models/sjdeal.js');
var StoreCategories = require('./models/storecategory.js');
var StoreSubCategories = require('./models/storesubcategory.js');

//run job every hour on 15th minute(for testing only..this will be set to every 12 hours or something on cloud)
var dataSchedular=schedule.scheduleJob('0 */12 * * *', function(){
//var dataSchedular=schedule.scheduleJob('*/2 * * * *', function(){
    var sj_deals_file='./files/sjdeals.json';
    var sj_deals_url='http://api.8coupons.com/v1/getdeals?key=hidden&mileradius=100&limit=100&zip=95112&orderby=radius&categoryid=1,2,3,4,6,7';

    request({url:sj_deals_url,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 

      jsonfile.writeFile(sj_deals_file, body, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
      else{
           jsonfile.readFile(sj_deals_file, function(err, sj_deals_obj) {
             if(err){
                 throw err;
             }
             SjDeals.removeSjDeals(function(err){
                     if(err){
                         throw err;
                     }else{
                         console.log('SjDeals removed');
                     }
                 });
             setTimeout(function(){
                 sj_deals_obj.forEach(function(sj_deal_obj){
                 var sj_deal_filtered=_.pick(sj_deal_obj, 'name', 'address', 'storeID','chainID','phone','state','city','ZIP','URL','storeURL',
                 'dealTitle','dealinfo','expirationDate','postDate','showImageStandardBig','showImageStandardSmall','providerName','DealTypeID','categoryID',
                 'lat','lon','distance','dealOriginalPrice','dealPrice','dealSavings','dealDiscountPercent');

                 if(sj_deal_filtered.dealPrice !==null || sj_deal_filtered.dealOriginalPrice !== null){
                 
                 var new_sj_deal=new SjDeals({
                     name       :   sj_deal_filtered.name,
                     address    :   sj_deal_filtered.address,
                     storeID    :   sj_deal_filtered.storeID,
                     chainID    :   sj_deal_filtered.chainID,
                     phone      :   sj_deal_filtered.phone,
                     state      :   sj_deal_filtered.state,
                     city       :   sj_deal_filtered.city,
                     ZIP        :   sj_deal_filtered.ZIP,
                     URL        :   sj_deal_filtered.URL,
                     storeURL   :   sj_deal_filtered.storeURL,
                     dealTitle  :   sj_deal_filtered.dealTitle,
                     dealinfo   :   sj_deal_filtered.dealinfo,
                     expirationDate:sj_deal_filtered.expirationDate,
                     postDate   :   sj_deal_filtered.postDate,
                     showImageStandardBig:  sj_deal_filtered.showImageStandardBig,
                     showImageStandardSmall:    sj_deal_filtered.showImageStandardSmall,
                     providerName:  sj_deal_filtered.providerName,
                     DealTypeID:    sj_deal_filtered.DealTypeID,
                     categoryID:    sj_deal_filtered.categoryID,
                     coordinates: [Number(sj_deal_filtered.lon),Number(sj_deal_filtered.lat)],
                     lat:   sj_deal_filtered.lat,
                     lon:   sj_deal_filtered.lon,
                     distance:  sj_deal_filtered.distance,
                     dealOriginalPrice: sj_deal_filtered.dealOriginalPrice,
                     dealPrice: sj_deal_filtered.dealPrice,
                     dealSavings:   sj_deal_filtered.dealSavings,
                     dealDiscountPercent:   sj_deal_filtered.dealDiscountPercent
                 });

                 
                 SjDeals.saveSjDeals(new_sj_deal,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         //console.log("local deals added to mongodb");
                     }
                 });
                 }
             });
             
             console.log('Sjdeals added to mongodb ');
             },1000);
    });
    
      }

    });

      }
    });

    var sj_deals_file2='./files/sjdeals2.json'
    var sj_deals_url2='http://api.8coupons.com/v1/getdeals?key=hidden&mileradius=100&limit=100&zip=94112&orderby=radius&categoryid=1,2,3,4,6,7';
    request({url:sj_deals_url2,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 

      jsonfile.writeFile(sj_deals_file2, body, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
      else{
           jsonfile.readFile(sj_deals_file2, function(err, sj_deals_obj) {
             //save in mongodb collection
             if(err){
                 throw err;
             }
             setTimeout(function(){
                 sj_deals_obj.forEach(function(sj_deal_obj){
                 var sj_deal_filtered=_.pick(sj_deal_obj, 'name', 'address', 'storeID','chainID','phone','state','city','ZIP','URL','storeURL',
                 'dealTitle','dealinfo','expirationDate','postDate','showImageStandardBig','showImageStandardSmall','providerName','DealTypeID','categoryID',
                 'lat','lon','distance','dealOriginalPrice','dealPrice','dealSavings','dealDiscountPercent');

                 if(sj_deal_filtered.dealPrice !==null || sj_deal_filtered.dealOriginalPrice !== null){
                 
                 var new_sj_deal=new SjDeals({
                     name       :   sj_deal_filtered.name,
                     address    :   sj_deal_filtered.address,
                     storeID    :   sj_deal_filtered.storeID,
                     chainID    :   sj_deal_filtered.chainID,
                     phone      :   sj_deal_filtered.phone,
                     state      :   sj_deal_filtered.state,
                     city       :   sj_deal_filtered.city,
                     ZIP        :   sj_deal_filtered.ZIP,
                     URL        :   sj_deal_filtered.URL,
                     storeURL   :   sj_deal_filtered.storeURL,
                     dealTitle  :   sj_deal_filtered.dealTitle,
                     dealinfo   :   sj_deal_filtered.dealinfo,
                     expirationDate:sj_deal_filtered.expirationDate,
                     postDate   :   sj_deal_filtered.postDate,
                     showImageStandardBig:  sj_deal_filtered.showImageStandardBig,
                     showImageStandardSmall:    sj_deal_filtered.showImageStandardSmall,
                     providerName:  sj_deal_filtered.providerName,
                     DealTypeID:    sj_deal_filtered.DealTypeID,
                     categoryID:    sj_deal_filtered.categoryID,
                     coordinates: [Number(sj_deal_filtered.lon),Number(sj_deal_filtered.lat)],
                     lat:   sj_deal_filtered.lat,
                     lon:   sj_deal_filtered.lon,
                     distance:  sj_deal_filtered.distance,
                     dealOriginalPrice: sj_deal_filtered.dealOriginalPrice,
                     dealPrice: sj_deal_filtered.dealPrice,
                     dealSavings:   sj_deal_filtered.dealSavings,
                     dealDiscountPercent:   sj_deal_filtered.dealDiscountPercent
                 });

                 
                 SjDeals.saveSjDeals(new_sj_deal,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         //console.log("local deals added to mongodb");
                     }
                 });
                 }
             });
             
             console.log('Sjdeals2 added to mongodb ');
             },1000);
    });
    
      }

    });

      }
    });

    
    var sj_deals_file3='./files/sjdeals3.json'
    var sj_deals_url3='http://api.8coupons.com/v1/getdeals?key=hidden&mileradius=100&limit=100&zip=94041&orderby=radius&categoryid=1,2,3,4,6,7';
    request({url:sj_deals_url3,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 

      jsonfile.writeFile(sj_deals_file3, body, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
      else{
           jsonfile.readFile(sj_deals_file3, function(err, sj_deals_obj) {
             //save in mongodb collection
             if(err){
                 throw err;
             }
             setTimeout(function(){
                 sj_deals_obj.forEach(function(sj_deal_obj){
                 var sj_deal_filtered=_.pick(sj_deal_obj, 'name', 'address', 'storeID','chainID','phone','state','city','ZIP','URL','storeURL',
                 'dealTitle','dealinfo','expirationDate','postDate','showImageStandardBig','showImageStandardSmall','providerName','DealTypeID','categoryID',
                 'lat','lon','distance','dealOriginalPrice','dealPrice','dealSavings','dealDiscountPercent');

                 if(sj_deal_filtered.dealPrice !==null || sj_deal_filtered.dealOriginalPrice !== null){
                 
                 var new_sj_deal=new SjDeals({
                     name       :   sj_deal_filtered.name,
                     address    :   sj_deal_filtered.address,
                     storeID    :   sj_deal_filtered.storeID,
                     chainID    :   sj_deal_filtered.chainID,
                     phone      :   sj_deal_filtered.phone,
                     state      :   sj_deal_filtered.state,
                     city       :   sj_deal_filtered.city,
                     ZIP        :   sj_deal_filtered.ZIP,
                     URL        :   sj_deal_filtered.URL,
                     storeURL   :   sj_deal_filtered.storeURL,
                     dealTitle  :   sj_deal_filtered.dealTitle,
                     dealinfo   :   sj_deal_filtered.dealinfo,
                     expirationDate:sj_deal_filtered.expirationDate,
                     postDate   :   sj_deal_filtered.postDate,
                     showImageStandardBig:  sj_deal_filtered.showImageStandardBig,
                     showImageStandardSmall:    sj_deal_filtered.showImageStandardSmall,
                     providerName:  sj_deal_filtered.providerName,
                     DealTypeID:    sj_deal_filtered.DealTypeID,
                     categoryID:    sj_deal_filtered.categoryID,
                     coordinates: [Number(sj_deal_filtered.lon),Number(sj_deal_filtered.lat)],
                     lat:   sj_deal_filtered.lat,
                     lon:   sj_deal_filtered.lon,
                     distance:  sj_deal_filtered.distance,
                     dealOriginalPrice: sj_deal_filtered.dealOriginalPrice,
                     dealPrice: sj_deal_filtered.dealPrice,
                     dealSavings:   sj_deal_filtered.dealSavings,
                     dealDiscountPercent:   sj_deal_filtered.dealDiscountPercent
                 });

                 
                 SjDeals.saveSjDeals(new_sj_deal,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         //console.log("local deals added to mongodb");
                     }
                 });
                 }
             });
             
             console.log('Sjdeals3 added to mongodb ');
             },1000);
    });
    
      }

    });

      }
    });


var sj_deals_file4='./files/sjdeals4.json'
    var sj_deals_url4='http://api.8coupons.com/v1/getdeals?key=hidden&mileradius=100&limit=100&zip=94301&orderby=radius&categoryid=1,2,3,4,6,7';
    request({url:sj_deals_url4,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 

      jsonfile.writeFile(sj_deals_file4, body, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
      else{
           jsonfile.readFile(sj_deals_file4, function(err, sj_deals_obj) {
             //save in mongodb collection
             if(err){
                 throw err;
             }
             setTimeout(function(){
                 sj_deals_obj.forEach(function(sj_deal_obj){
                 var sj_deal_filtered=_.pick(sj_deal_obj, 'name', 'address', 'storeID','chainID','phone','state','city','ZIP','URL','storeURL',
                 'dealTitle','dealinfo','expirationDate','postDate','showImageStandardBig','showImageStandardSmall','providerName','DealTypeID','categoryID',
                 'lat','lon','distance','dealOriginalPrice','dealPrice','dealSavings','dealDiscountPercent');

                 if(sj_deal_filtered.dealPrice !==null || sj_deal_filtered.dealOriginalPrice !== null){
                 
                 var new_sj_deal=new SjDeals({
                     name       :   sj_deal_filtered.name,
                     address    :   sj_deal_filtered.address,
                     storeID    :   sj_deal_filtered.storeID,
                     chainID    :   sj_deal_filtered.chainID,
                     phone      :   sj_deal_filtered.phone,
                     state      :   sj_deal_filtered.state,
                     city       :   sj_deal_filtered.city,
                     ZIP        :   sj_deal_filtered.ZIP,
                     URL        :   sj_deal_filtered.URL,
                     storeURL   :   sj_deal_filtered.storeURL,
                     dealTitle  :   sj_deal_filtered.dealTitle,
                     dealinfo   :   sj_deal_filtered.dealinfo,
                     expirationDate:sj_deal_filtered.expirationDate,
                     postDate   :   sj_deal_filtered.postDate,
                     showImageStandardBig:  sj_deal_filtered.showImageStandardBig,
                     showImageStandardSmall:    sj_deal_filtered.showImageStandardSmall,
                     providerName:  sj_deal_filtered.providerName,
                     DealTypeID:    sj_deal_filtered.DealTypeID,
                     categoryID:    sj_deal_filtered.categoryID,
                     coordinates: [Number(sj_deal_filtered.lon),Number(sj_deal_filtered.lat)],
                     lat:   sj_deal_filtered.lat,
                     lon:   sj_deal_filtered.lon,
                     distance:  sj_deal_filtered.distance,
                     dealOriginalPrice: sj_deal_filtered.dealOriginalPrice,
                     dealPrice: sj_deal_filtered.dealPrice,
                     dealSavings:   sj_deal_filtered.dealSavings,
                     dealDiscountPercent:   sj_deal_filtered.dealDiscountPercent
                 });

                 
                 SjDeals.saveSjDeals(new_sj_deal,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         //console.log("local deals added to mongodb");
                     }
                 });
                 }
             });
             
             console.log('Sjdeals4 added to mongodb ');
             },1000);
    });
    
      }

    });

      }
    });

    // var chainstores_file='./files/chainstores.json';
    // var chainstores_url='http://api.8coupons.com/v1/getchainstorelist?key=hidden';
    // request({url:chainstores_url,
    //     json:true
    // }, function (error, response, body) {
    //   if (!error && response.statusCode === 200) { 
    //   jsonfile.writeFile(chainstores_file, body, function(err) {
    //    if(err){
    //     console.error(err);
    //    }else{
    //   console.log('File write success for '+chainstores_file);
    //     jsonfile.readFile(chainstores_file, function(err, chainstores_obj) {
    //          //save in mongodb collection
    //          if(err){
    //              throw err;
    //          }
    //          else{
    //               ChainStores.removeChainStores(function(err){
    //                  if(err){
    //                      throw err;
    //                  }else{

    //                  }
    //              });
    //              console.log('Chainstores removed');
                
    //          setTimeout(function(){
    //              chainstores_obj.forEach(function(chainstore_obj){
                 
    //              var new_chainstore=new ChainStores({
    //                  chainID : chainstore_obj.chainID,
    //                  name : chainstore_obj.name,
    //                  page : chainstore_obj.page,
    //                  homepage : chainstore_obj.homepage,
    //                  logoBig : chainstore_obj.logoBig,
    //                  logoSmall : chainstore_obj.logoSmall
    //              });

                
    //              ChainStores.saveChainStores(new_chainstore,function(err,deal){
    //                  if(err){
    //                      throw err;
    //                  }else{
    //                      //console.log("Chainstores added to mongodb");
    //                  }
    //              });
    //          });
    //          console.log("chainstores added to mongodb");
    //          },1000);
             
    //       }   
    //     });
    //  }
    // });     
    //   }
    //   else{
    //       console.log(error);
    //   }
    // });

    // var dealtype_file='./files/dealtype.json';
    // var dealtype_url='http://api.8coupons.com/v1/getdealtype';
    // request({url:dealtype_url,
    //     json:true
    // }, function (error, response, body) {
    //   if (!error && response.statusCode === 200) { 
    //   jsonfile.writeFile(dealtype_file, body, {spaces: 2}, function(err) {
    //   if(err){
    //     console.error(err);
    //   }
    //   else{
    //     console.log('File write success for '+dealtype_file);

         
    //     jsonfile.readFile(dealtype_file, function(err, dealtypes_obj) {
    //          //save in mongodb collection
    //          if(err){
    //              throw err;
    //          }
    //           DealTypes.removeDealTypes(function(err){
    //                  if(err){
    //                      throw err;
    //                  }else{
    //                      console.log("DealTypes Removed");
    //                  }
    //             });

    //           setTimeout(function(){  
    //          dealtypes_obj.forEach(function(dealtype_obj){                 
    //              var new_dealtype=new DealTypes({
    //                  dealtypeid : dealtype_obj.dealtypeid,
    //                  TypeName : dealtype_obj.TypeName
    //              });

    //              DealTypes.saveDealTypes(new_dealtype,function(err,deal){
    //                  if(err){
    //                      throw err;
    //                  }else{
    //                      //console.log("deal types added to mongodb");
    //                  }
    //              });
    //          });
    //          console.log("Deal types added to mongodb");
    //          },1000);      
    //     }); 
    //   }
    // });
    //   }
    //   else{
    //       console.log(error);
    //   }
    // });

     var local_deals_file='./files/localdeals.json';
     var local_deals_url='http://api.8coupons.com/v1/getdeals?key=hidden&zip=95112&mileradius=40&limit=100&orderby=radius';
     
    request({url:local_deals_url,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 
      jsonfile.writeFile(local_deals_file, body, {spaces: 2}, function(err) {
      if(err){
      console.error(err);
      }
      else{
          console.log('File write success for '+local_deals_file);
        
        jsonfile.readFile(local_deals_file, function(err, local_deals_obj) {
             //save in mongodb collection
             if(err){
                 throw err;
             }
             LocalDeals.removeLocalDeals(function(err){
                     if(err){
                         throw err;
                     }else{
                         console.log("Local Deals Removed");
                     }
                });
             setTimeout(function(){
                 local_deals_obj.forEach(function(local_deal_obj){
                 var local_deal_filtered=_.pick(local_deal_obj, 'name', 'address', 'storeID','chainID','phone','state','city','ZIP','URL','storeURL',
                 'dealTitle','dealinfo','expirationDate','postDate','showImageStandardBig','showImageStandardSmall','providerName','DealTypeID','categoryID',
                 'lat','lon','distance','dealOriginalPrice','dealPrice','dealSavings','dealDiscountPercent');
                 if(local_deal_filtered.dealOriginalPrice !==null || local_deal_filtered.dealPrice!==null){

                 var new_local_deal=new LocalDeals({
                     name       :   local_deal_filtered.name,
                     address    :   local_deal_filtered.address,
                     storeID    :   local_deal_filtered.storeID,
                     chainID    :   local_deal_filtered.chainID,
                     phone      :   local_deal_filtered.phone,
                     state      :   local_deal_filtered.state,
                     city       :   local_deal_filtered.city,
                     ZIP        :   local_deal_filtered.ZIP,
                     URL        :   local_deal_filtered.URL,
                     storeURL   :   local_deal_filtered.storeURL,
                     dealTitle  :   local_deal_filtered.dealTitle,
                     dealinfo   :   local_deal_filtered.dealinfo,
                     expirationDate:local_deal_filtered.expirationDate,
                     postDate   :   local_deal_filtered.postDate,
                     showImageStandardBig:  local_deal_filtered.showImageStandardBig,
                     showImageStandardSmall:    local_deal_filtered.showImageStandardSmall,
                     providerName:  local_deal_filtered.providerName,
                     DealTypeID:    local_deal_filtered.DealTypeID,
                     categoryID:    local_deal_filtered.categoryID,
                     lat:   local_deal_filtered.lat,
                     lon:   local_deal_filtered.lon,
                     distance:  local_deal_filtered.distance,
                     dealOriginalPrice: local_deal_filtered.dealOriginalPrice,
                     dealPrice: local_deal_filtered.dealPrice,
                     dealSavings:   local_deal_filtered.dealSavings,
                     dealDiscountPercent:   local_deal_filtered.dealDiscountPercent
                 });        
                

                 LocalDeals.saveLocalDeals(new_local_deal,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         //console.log("local deals added to mongodb");
                     }
                 });
                 }
             });
             console.log("local deals added to mongodb");
             },1000);
                          
        });
      }
    });    
      }
      else{
          console.log(error);
      }
    });

    var store_categories_file='./files/storecategories.json';
    var store_categories_url='http://api.8coupons.com/v1/getcategory';
    request({url:store_categories_url,
        json:true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) { 
      jsonfile.writeFile(store_categories_file, body, {spaces: 2}, function(err) {
          if(err){
            console.error(err);
          }
          else{
              console.log('File write success for '+store_categories_file);

        
        jsonfile.readFile(store_categories_file, function(err, storecategories_obj) {
             //save in mongodb collection
             if(err){
                 throw err;
             }
             StoreCategories.removeStoreCategories(function(err){
                     if(err){
                         throw err;
                     }else{
                         console.log("StoreCategories Removed");
                     }
                });
             
             setTimeout(function(){
             storecategories_obj.forEach(function(storecategory_obj){
                 
                 var new_storecategory=new StoreCategories({
                    categoryID : storecategory_obj.categoryID,
                    category : storecategory_obj.category
                 });

                 StoreCategories.saveStoreCategories(new_storecategory,function(err,deal){
                     if(err){
                         throw err;
                     }else{
                         
                     }
                 });
             });
             console.log("Store Categories added to mongodb");
             }, 1000);      
             
        });
      }
    });
    
      }
      else{
          console.log(error);
      }
    });

//     var store_subcategories_file='./files/storesubcategories.json';
//     var store_subcategories_url='http://api.8coupons.com/v1/getsubcategory';
//     request({url:store_subcategories_url,
//         json:true
//     }, function (error, response, body) {
//       if (!error && response.statusCode === 200) { 
//       jsonfile.writeFile(store_subcategories_file, body, {spaces: 2}, function(err) {
//           if(err){
//             console.error(err);
//           }else{
//               console.log('File write success for '+store_subcategories_file);
        
//         jsonfile.readFile(store_subcategories_file, function(err, storesubcategories_obj) {
//              //save in mongodb collection
//              if(err){
//                  throw err;
//              }
//              StoreSubCategories.removeStoreSubCategories(function(err){
//                      if(err){
//                          throw err;
//                      }else{
//                          console.log("StoreSubCategories Removed");
//                      }
//             });

//             setTimeout(function(){
//              storesubcategories_obj.forEach(function(storesubcategory_obj){
                 
//                  var new_storesubcategory=new StoreSubCategories({
//                     categoryID : storesubcategory_obj.categoryID,
//                     category : storesubcategory_obj.category,
//                     subcategory : storesubcategory_obj.subcategory,
//                     subcategoryID : storesubcategory_obj.subcategoryID
//                  });

//                  StoreSubCategories.saveStoreSubCategories(new_storesubcategory,function(err,deal){
//                      if(err){
//                          throw err;
//                      }else{
                         
//                      }
//                  });
//              });
//               console.log("StoreSubCategories added to mongodb");      
//             },1000);     
//         });
//           }
//     });
//       }
//       else{
//           console.log(error);
//       }
//     });
});

module.exports=dataSchedular;