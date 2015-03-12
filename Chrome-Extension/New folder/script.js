$(document).ready(function(){
	console.log('made it to the active tab... hurray!!');
	$(function(){
		$.leapPointer();
	});
	$('a').mouseenter(function(){
		console.log('accessing the DOM...');
		
		chrome.runtime.sendMessage({message:'0'+'.'+1});
	});


});
