(function($) {
	$.leap_background = function() {
	if (window.Leap === undefined) return;

	//get the coordinates of the fingertips from the leap motion dataframe, and return the x,y position
	function get_leap_coord(frame) {
		function findFinger(finger){
                	if (finger === null){
				return [0,0];
			}else{
				var tip = finger.tipPosition;
				var ibox = frame.interactionBox;
				var npos = ibox.normalizePoint(tip);
				var x = npos[0];
				var y = (1 - npos[1]);
				return [x, y];
			}
		}

		var allFingers = [];
		for (var i = 0; i<frame.fingers.length; i++){
			var coord = findFinger(frame.fingers[i]);
			allFingers[allFingers.length] = coord;
		}
		
		return allFingers;
	}



	//start a new controller obect
	var controller = new Leap.Controller({
		frameEventName: 'deviceFrame'//animationFrame is better, but doesn't work in a chrome extension...
	});

	var poss = [];// array of x,y positions representing each of the cursors
	var port;

	chrome.tabs.onActivated.addListener(function(){ // create a new port when a new tab is opened...
		if (!(port == undefined)) {port.disconnect();} //close the old port...
		console.log('new tab');

		// find the ID of the active tab and create a new port connecting to that tab...
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			current = tabs[0].id;
			console.log(current);
			port = chrome.tabs.connect(current,{name:'asdf'});
		});


		// find the x,y coordinate information for every incoming frame and relay that information to the content script... 
		controller.on('frame', function(frame) {
			console.log('frame!');
			if (frame.pointables.length < 1) return;
			var leap_coord = get_leap_coord(frame);
			if (leap_coord === null) return;
	

			port.postMessage(current,leap_coord);
		
	        });

		controller.connect();
	});
};
})(jQuery);
