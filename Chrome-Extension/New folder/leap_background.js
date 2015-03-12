/*(function($) { $.leapPointer = function() {


	var controller = new Leap.Controller({
		host: 'localhost',
		port: '6437',
		frameEventName: 'deviceFrame'
	});
	
	/*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
		if (changeInfo.status == 'complete') {   
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				var port = chrome.tabs.connect(tabs[0].id, {name:"leap"});
			});
		}
	});


	var poss = [];
	var coord = [];
	console.log("this part is still working...");
	controller.on('frame', function(frame) {
		coord = [];
		if (frame.pointables.length < 1) return;
		finger = frame.fingers[1]
		console.log(finger.tipPos)
		for (var i=0;i<frame.fingers.length;i++){
			if (frame.fingers[i] == null){return;}
			var ibox = frame.interactionBox;
			var finger = frame.fingers[i]
			//var tip = finger.tipPos;
			//console.log(tip);
			//var npos = ibox.normalizePoint(tip);
			//coord[coord.length]=npos;
		}

		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			current = tabs[0].id;
			console.log("so is this...");
			chrome.tabs.sendMessage(current,coord);
		});
	});


	controller.connect();
};
})(jQuery);*/

/* Leap Pointer - use Leap Motion controller to simulate mouse on a web page
 *
 * Copyright (C) 2013-2014 Good Code
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Requires jQuery and Leap.js (js.leapmotion.com).
 *
 * To use, add these two tags to the end of your page HEAD or BODY:
 *     <script src="//js.leapmotion.com/leap-0.4.1.js"></script>)
 *     <script src="leap-pointer.js"></script>
 *
 * and then just activate the plugin:
 *
 *     $(function() {
 *         $.leapPointer()
 *     });
 */
(function($) {
	$.leapPointer = function() {
	if (window.Leap === undefined) return;

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




	var controller = new Leap.Controller({
		frameEventName: 'deviceFrame'
	});

	var poss = [];
	var port;

	chrome.tabs.onActivated.addListener(function(){
		if (!(port == undefined)) {port.disconnect();}
		console.log('new tab');
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			current = tabs[0].id;
			console.log(current);
			port = chrome.tabs.connect(current,{name:'asdf'});
		});

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
