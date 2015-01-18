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

    $("a").mouseenter(function(){
        ion.sound.play("beer_can_opening");
    });
    $("button").mouseenter(function(){
        ion.sound.play("bell_ring");
    });
    $("h1").mouseenter(function(){
        ion.sound.play("branch_break");
    });
    $("img").mouseenter(function(){
        ion.sound.play("branch_break");
    });

});