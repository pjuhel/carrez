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
	dispatcher.retrievedata(model.url, function (ad) {
		self.view('index',{price:ad.averagePrice});
	});
}
