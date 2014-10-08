var args = arguments[0] || {};
var MapModule = require('ti.map');
var mapview;
var geo = require('geo');

var rc = MapModule.isGooglePlayServicesAvailable();
switch (rc) {
    case MapModule.SUCCESS:
        Ti.API.info('Google Play services is installed.');
        break;
    case MapModule.SERVICE_MISSING:
        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
        break;
    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
        alert('Google Play services is out of date. Please update Google Play services.');
        break;
    case MapModule.SERVICE_DISABLED:
        alert('Google Play services is disabled. Please enable Google Play services.');
        break;
    case MapModule.SERVICE_INVALID:
        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
        break;
    default:
        alert('Unknown error.');
        break;
}

function lookForAddress(){
	//TODO go to new location
}

function locationSet(){
	//TODO save new location
	$.map.close();
}

function initializeMap(lat, longt, userLoc){
	if(mapview === undefined){
		return;
	}
	var mapview = MapModule.createView({
			mapType: MapModule.NORMAL_TYPE,
			region: {
				latitude: lat,
				longitude: longt,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			},
			animate: true,
			regionFit: true,
			userLocation: userLoc
		});
	$.mapContainer.add(mapview);
}

$.lookButton.addEventListener('click', lookForAddress);
$.acceptButton.addEventListener('click', locationSet);

var latitude = args.lat || geo.LATITUDE_BASE;
var longitude = args.longt || geo.LONGITUDE_BASE;
var userLocation = args.userLocation || false;

initializeMap(latitude, longitude, userLocation);