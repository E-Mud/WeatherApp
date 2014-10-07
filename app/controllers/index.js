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
	if(code <= 4 || code == 45)
		return "weather-thunderstorm.png";
		
	if((code >= 5 && code <= 7) || code == 35)
		return "weather-rain.png";
	
	if((code >=8 && code <=16) || (code >=41 && code <=43) || code == 46)
		return "weather-snow.png";
		
	if(code >= 17 && code <= 18)
		return "weather-hail.png";
		
	if(code >=19 && code <= 26)
		return "weather-cloudy.png";
		
	if((code >=27 && code <= 30) || code == 44)
		return "weather-partly-sunny.png";
		
	if((code >=31 && code <= 34) || code == 36)
		return "weather-sunny.png";
	
	if((code >=37 && code <=40) || code == 47)
		return "weather-sunny-rain.png";
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
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HUNDRED_METERS;
	    Ti.Geolocation.distanceFilter = 300;
	    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	}else{
		if(Ti.Platform.osname == "android"){
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
			    name: Ti.Geolocation.PROVIDER_GPS,
			    minUpdateDistance: 300.0,
			    minUpdateTime: 150
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