var BASE_URL = "https://query.yahooapis.com/v1/public/yql?format=json&q=";
var YQL_QUERY = 'select * from weather.forecast where woeid In (select woeid from geo.placefinder where text="?lat,?long" and gflags="R")';

module.exports.sync = function(method, model, options){
	if(method != 'read'){
		return;
	}
	
	var coords = options.coords; 
	var query = YQL_QUERY.replace("?lat", String(coords.lat)).replace("?long", String(coords.longt));
	var encodedQuery = encodeURIComponent(query);
	var url = BASE_URL + encodedQuery;
	
	var xhr = Ti.Network.createHTTPClient({
    	onload: function(e) {
    		callback(true, this.responseText, null);
    	},
    	onerror: function(e) {
			callback(false, this.responseText, e.error);
    	},
    	timeout:5000
	});
	
	xhr.open("GET", url);
	xhr.send();
	
	function callback(success, response, error){
		res = JSON.parse(response);
		if (success) {
			options.success(res, JSON.stringify(res), options);
		}
		else {
			var err = res.error || error;
			Ti.API.error('ERROR: ' + err);
			options.error(model, error, options);
			model.trigger('error');
		}
	};
};
