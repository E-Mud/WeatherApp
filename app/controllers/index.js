function fillPrimaryInfo(model){
	$.locationText.text = model.get("city") + ", " + model.get("country");
	$.weatherIcon.image = "/img/"+getWeatherIcon(model.get("weatherCode"));
	$.weatherText.text = model.get("weatherText");
}

function fillSecondaryInfo(model){
	$.temperatureText.text = model.get("temperature") + "º " + model.get("temperatureUnit");
	$.windText.text = model.get("wind") + " " + model.get("windUnit");
	$.humidityText.text = model.get("humidity") + " %";
}

function fillForecastInfo(model){
	var forecast = model.get("forecast");
	$.forecastIcon0.image = "/img/"+getWeatherIcon(forecast[0].code);
	$.forecastIcon1.image = "/img/"+getWeatherIcon(forecast[1].code);
	$.forecastIcon2.image = "/img/"+getWeatherIcon(forecast[2].code);
	$.forecastIcon3.image = "/img/"+getWeatherIcon(forecast[3].code);
	
	$.forecastDate0.text = forecast[0].date;
	$.forecastDate1.text = forecast[1].date;
	$.forecastDate2.text = forecast[2].date;
	$.forecastDate3.text = forecast[3].date;
}

function getWeatherIcon(code){
	switch(code){
		case 31:
		case 32:
		case 33:
		case 34:
		case 36:
			return "weather-sunny.png";
		case 27:
		case 28:
		case 29:
		case 30:
		case 44:
			return "weather-partly-sunny.png";
		case 5:
		case 6:
		case 7:
		case 35:
			return "weather-rain.png";
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
		case 41:
		case 42:
		case 43:
		case 46:
			return "weather-snow.png";
		case 17:
			return "weather-hail.png";
		case 19:
		case 20:
		case 21:
		case 22:
		case 23:
		case 24:
		case 25:
		case 26:
			return "weather-cloudy.png";
		case 37:		
		case 38:
		case 39:
		case 40:
		case 47:
			return "weather-sunny-rain.png";
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 45:
			return "weather-thunderstorm.png";
		default:
		return "";
	}
}

function getWeatherInfo(lat, longt){
	Alloy.createModel('weatherInfo').fetch({
		coords : {
			"lat" : lat,
			"longt" : longt
		},
		success : function(model, response){
			fillPrimaryInfo(model);
			fillSecondaryInfo(model);
			fillForecastInfo(model);
		},
		
		error : function(model, response, error){
			alert("Couldn't connect with weather service. Please check your internet connection and try again.");
		}
	});	
}

$.index.open();

if (Ti.Geolocation.locationServicesEnabled) {
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		Ti.Geolocation.purpose = 'Get Current Location';
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	    Ti.Geolocation.distanceFilter = 10;
	    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	}else{
		if(Ti.Platform.osname == "android"){
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
			    name: Ti.Geolocation.PROVIDER_GPS,
			    minUpdateDistance: 100.0,
			    minUpdateTime: 30
			});
			Ti.Geolocation.Android.addLocationProvider(providerGps);
			Ti.Geolocation.Android.manualMode = true;		
		}
	}
	
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Error: ' + e.error);
        } else {
        	getWeatherInfo(e.coords.latitude, e.coords.longitude);
        }
    });
} else {
    alert('Please enable location service.');
}