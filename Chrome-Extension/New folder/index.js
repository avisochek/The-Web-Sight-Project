$(document).ready(function(){
	console.log("not broken here");
	var socket=io('http://localhost:3000');
	chrome.tabs.executeScript({
    	file: "script.js"
  	});
});