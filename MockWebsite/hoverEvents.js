$(document).ready(function(){

	ion.sound({
	sounds: [
 	       {name: "beer_can_opening"},
	                {name: "bell_ring"},
	                {name: "branch_break"}
	            ],
	            path: "sounds/",
	            preload: true,
	            volume: 1.0
	        });

	        $("#b01").hover(function(){
	            ion.sound.play("beer_can_opening");
	        });
	        $("#b02").hover(function(){
	            ion.sound.play("bell_ring");
	        });
	        $("#b03").hover(function(){
	            ion.sound.play("branch_break");
	        });

	    });