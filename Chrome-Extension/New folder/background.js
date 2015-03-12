var socket=io('http://localhost:3000');

socket.on("connect",function(){
	console.log("hello world!");
	$(function(){
		$.leapPointer();	
	});
	/*chrome.runtime.onMessage.addListener(function(request,sender,sendRosponse){
		console.log('message recieved');
		console.log(request.message);
		socket.emit(request.message);
	});*/
});
