
var request = require("request");
var cheerio = require("cherrio");
var JSON3 = require("json3");

function getHtml(err, type, html, callback){
  if(err != null)
  {
    console.log(err);
  }
  var cheerioHtml = cheerio.load(html);
  var rawText = cheerioHtml('body script').first().text();
  rawText = rawText.substring(rawText.indexOf('{'));
  rawText = rawText.replace(new RegExp('\n  ','g'),'\n  "');
  rawText = rawText.replace(new RegExp(' :','g'),'" :');
  var parsedJson = JSON3.parse(rawText);
  data = generateJsonAdd(parsedJson);
  callback(data);
}

function generateJsonAdd(originJson) {
  var ad = new realEstateAd();
  ad.surface = parseFloat(originJson.surface);
  ad.postalCode = originJson.postalCode;
  originJson.city.replace(new RegExp('_','g'),'-')
  ad.city = originJson.city;
  ad.kind = originJson.type;
  ad.price = parseFloat(originJson.price.replace(new RegExp('[ ,\n]','g'),''));
  return ad;
}

function realEstateAd() {
  var surface = 0;
  var postalCode = "";
  var city = "";
  var kind = "";
  var price = 0;
}

module.exports = function makeRequest(url, callback) {
  request(url, function(err, type, html){
    getHtml(err, type, html, callback);
  })
})
