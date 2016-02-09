var dispatcher = require('./dispatcher.js');
exports.install = function() {
	F.route('/', view_index);
	// or
  F.route('/', send_request, ['post']);
};

function view_index() {
	var self = this;
	self.view('index', {price:""});
}

function send_request() {
	var self = this;
	var model = self.body;
	console.log('model:'+JSON.stringify(model));
	dispatcher.retrievedata(model.url, function (ad) {
		if(ad.goodDeal){
			self.view('index3',{ad});
		}
		self.view('index2',{ad});
	});
}
