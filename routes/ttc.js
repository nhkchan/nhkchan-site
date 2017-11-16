var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var parseString = require('xml2js').parseString;


router.get('/', function(req, res){
   res.send('Pick a command.');
});

router.get('/routeList', function(req, res){

	var ttcUrl = 'http://webservices.nextbus.com/service/publicXMLFeed';
	var cmd = 'routeList';
	var agency = req.query['agency'];
	console.log(agency);

	request({
		url: ttcUrl + '?command=routeList&a=ttc',
		method: 'GET',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) ApplWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
		}
	},
		function(err,resp) {
			
			if(err) {
				console.log(err);
			}
			else {

				//Write XML File
				fs.writeFile('./txt/routelist.xml', resp.body, function(err) {
				  if (err) throw err;
				  console.log('The file has been saved!');
				});

				//Write JSON File
				parseString(resp.body, function(err1, result){
					
					var routeObj = result.body.route;
					var objLen = Object.keys(routeObj).length; 
					var routeTitle;
					var i =140;	

					/*
					for (var i=0; i<objLen; i++) {
						if (routeObj.i.$.tag == '191') {
							routeTitle += routeObj.i.$.title;
						}
					}
					*/

					res.send(routeObj);
					//res.send(routeObj);

					/*
					fs.writeFile('./txt/routelist.json', result, function(err2) {
						console.log('json file saved.');
					});
					*/
				});

			}

			
		}
	);
   
});

/*
TTC:

http://webservices.nextbus.com/service/publicXMLFeed
//command = api method/call
// agencyList:
	// List all available Transit Agencies as part of the API.
	// Required Param: none
	// ?command=agencyList
// routeConfig:
	// Lists all stops & geo-location of each stop
	// Required param: a(Agency) & r(route)
	// ?command=routeConfig&a=ttc&r=191
	// i.e: <stop tag="15246" title="Humber College Bus Terminal" lat="43.7288899" lon="-79.60538" stopId="15404"/>
// routeList:
	// Required param: a(Agency)
	// ?command=routeList&a=ttc
	// Lists all routes for given Agency
// Predictions:
	// Required param: a(Agency), s(stopid) & r(route)
	// ?command=predictions&a=ttc&s=648&r=191
	// Lists all routes for given Agency
// vehicleLocations:
	// Required param: a(agency), r(route), t(epoch time in msec)
	// ?command=vehicleLocations&a=ttc&r=191&t=1507217558665
//
?command=routeConfig
/a = /Agency code: ttc
&a=ttc
//r = Route: 191
&r=191

*/

router.post('/', function(req, res){
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;