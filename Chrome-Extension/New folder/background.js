var socket=io('http://localhost:3000');

socket.on("connect",function(){
	console.log("hello world!");
	$(function(){
		$.leap_background();	
	});

	//relay messages from the active tab to the socket.io server...
	/*chrome.runtime.onMessage.addListener(function(request,sender,sendRosponse){
		console.log('message recieved');
		console.log(request.message);
		socket.emit(request.message);
	});*/
});
