exports.definition = {
	config: {
		"adapter": {
			"type": "yahooWeather"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			parse : function(resp, xhr){
				var result = {};
				var channel = resp.query.results.channel;
				
				result['weatherCode'] = parseInt(String(channel.item.condition.code));
				result['weatherText'] = String(channel.item.condition.text);
				result['city'] = String(channel.location.city);
				result['country'] = String(channel.location.country);
				result['wind'] = parseInt(String(channel.wind.speed));
				result['windUnit'] = String(channel.units.speed);
				result['windDirection'] = parseInt(String(channel.wind.direction));
				result['temperature'] = parseInt(String(channel.item.condition.temp));
				result['temperatureUnit'] = String(channel.units.temperature);
				result['humidity'] = parseInt(String(channel.atmosphere.humidity));
				
				var forecast = channel.item.forecast;
				forecast.splice(0,1);
				
				result['forecast'] = [];
				forecast.forEach(function(entry){
					var newForecast = {};
					newForecast['code'] = parseInt(String(entry.code));
					var dateString = String(entry.date);
					newForecast['date'] = dateString.substring(0, dateString.length-5);
					result['forecast'].push(newForecast);
				});
				
				return result;
			},
			
			weatherIcon : function(){
				
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};