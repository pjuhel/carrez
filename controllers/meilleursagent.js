var request = require("request");
var cheerio = require("cherrio");
var JSON3 = require("json3");

function getHtml(err, data, type, html, callback){
  if(err != null)
  {
    console.log(err);
  }
  var cheerioHtml = cheerio.load(html);
  var rawtext = "";
  if(data.type == "appartement"){
    rawText = cheerioHtml('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
  }
  else{
    rawText = cheerioHtml('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
  }
  rawText = rawText.replace(new RegExp('[\u00a0, ,\n,'€']','g'),'');
  var parsedJson = JSON3.parse(rawText);
  data = generateJsonEstimation(parsedJson);
  callback(data)
}

function generateJsonEstimation(originJson) {
  var estimation = new estimation();
  estimation.averagePrice = originJson.estimation;
  estimation.city = data.city;
  estimation.postalCode = data.postalCode;
  return estimation;
}

function estimation() {
  var city ="";
  var postalCode="";
  var averagePrice="";
}

module.exports = function makeRequest(url,data, callback) {
  request(url, function(err, type, html){
    getHtml(err, data, type, html, callback);
  })
})
