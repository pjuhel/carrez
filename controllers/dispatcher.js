var leboncoin = require('./leboncoin.js');
var meilleursagent = require('./meilleursagent.js');
//Ici on appelle les deux autrs modules, on récupères les données, et qu'on réalise les calculs les calculs

function retrievedata(url, callback){
  leboncoin.makeRequest(url, function (data) {
    var url = 'http://www.meilleursagents.com/prix-immobilier/'+ data.city + '-' + data.postalCode + '/#estimate';

    meilleursagent.makeRequest(url,data,function (estimation) {
      var ad = new Object();
      ad.surface = data.surface;
      ad.kind = data.kind;
      ad.price = data.price;
      ad.averagePrice = estimation.averagePrice;
      ad.recommendedPrice = data.surface * estimation.averagePrice;

      if(ad.price < ad.recommendedPrice){
        ad.goodDeal = true;
      }
      console.log(ad);
      callback(ad);
      //Here you can compute whatever you want on your object estimation
      //If you want to display it on the webpage, you NEED to set it from the .js file. You can't access it directly through the html
    });
  });
}

function finalAd() {
  var surface = 0;
  var kind = '';
  var price = 0;
  var averagePrice = 0;
  var recommendedPrice = 0;
  var goodDeal = false;
}
module.exports = {retrievedata}
