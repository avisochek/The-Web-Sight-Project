$(document).ready(function(){
	console.log('made it to the active tab... hurray!!');

	//this initiates the leap pointer function on the active tab	
	$(function(){
		$.leap_pointer_on_page();
	});

	//JQUERY EVENTS 
	$('a').mouseenter(function(){
		console.log('accessing the DOM...');
		chrome.runtime.sendMessage({event: 0,finger: num});// this messages the background page, which relays the message to the socket.io server...
	});


});
