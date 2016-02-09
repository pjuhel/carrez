var request = require('request');
var cheerio = require('cheerio');
var JSON3 = require('json3');

function getHtml(err, data, type, html, callback){
  if(err != null)
  {
    console.log(err);
  }
  var cheerioHtml = cheerio.load(html);
  var rawtext = '';
  if(data.type == 'appartement'){
    rawText = cheerioHtml('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
  }
  else{
    rawText = cheerioHtml('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
  }
  console.log(rawText);
  rawText = rawText.replace(new RegExp('[\u00a0, ,\n,€]','g'),'');
  console.log(rawText);
  //var parsedJson = JSON3.parse(rawText);
  floatedPrice = parseFloat(rawText);
  data = generateJsonEstimation(floatedPrice,data, callback);
}

function generateJsonEstimation(price,data, callback) {
  var estimation= new Object();
  estimation.averagePrice = price;
  estimation.city = data.city;
  estimation.postalCode = data.postalCode;
  callback(estimation);
}

module.exports = {makeRequest};
function makeRequest(url,data, callback) {
  request(url, function(err, type, html){
    console.log(url);
    getHtml(err, data, type, html, callback);
  });
}
