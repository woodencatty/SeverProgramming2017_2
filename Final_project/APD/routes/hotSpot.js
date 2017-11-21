var SoftAPSetup = require('../index');
var config = require('./config');
var path = require('path');

var sap = new SoftAPSetup();

if(!config.get('ssid')) {

	console.log("* Please specify the ssid of the AP with which you wish to connect your device...");
	console.log("Example: %s %s --ssid BestWiFiNetworkEver --password SuperSecretPassword --security wpa2_mixed",
		process.argv[0], path.relative(process.cwd(), __filename));
	process.exit(1);
}

function deviceInfo() {
	console.log("Obtaining device information...");
	sap.deviceInfo(claim);
}

deviceInfo();
