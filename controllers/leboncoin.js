var request = require('request');
var cheerio = require('cheerio');
var JSON3 = require('json3');

function getHtml(err, type, html, callback) {
  if(err != null)
  {
    return console.log(err);
  }
  var parsedHtml = cheerio.load(html);
var rawJson = parsedHtml('body script').first().text();
rawJson = rawJson.substring(rawJson.indexOf('{'));
rawJson = rawJson.replace(new RegExp('\n  ','g'),'\n  "');
rawJson = rawJson.replace(new RegExp(' :','g'),'" :');
var parsedJson = JSON3.parse(rawJson);
generateJsonAdd(parsedJson,callback);
}

function generateJsonAdd(originJson, callback) {
  var ad = new realEstateAd();
  console.log(originJson);
  ad.surface = parseFloat(originJson.surface);
  ad.postalCode = originJson.cp;
  ad.city = originJson.city.replace(new RegExp('_','g'),'-');
  ad.kind = originJson.type;
  ad.price = parseFloat(originJson.prix);
  callback(ad);
}

function realEstateAd() {
  var surface = 0;
  var postalCode = '';
  var city = '';
  var kind = '';
  var price = 0;
}

module.exports = {makeRequest}
function makeRequest(url, callback) {
  request(url, function(err, resp, html){
    getHtml(err, resp, html, callback);
  });
}
