$(document).ready(function(){

    ion.sound({
        sounds: [
            {name: "beer_can_opening"},
            {name: "bell_ring"},
            {name: "branch_break"},
            {name: "snap"}
        ],
        path: "sounds/",
        preload: true,
        volume: 1.0
    });

    $("a").mouseenter(function (event, num){
        ion.sound.play("beer_can_opening");
        console.log(1 + '.' + num);
    });
    $("button").mouseenter(function (event, num){
        ion.sound.play("bell_ring");
        console.log(2 + '.' + num);
    });
    $("h1").mouseenter(function (event, num){
        ion.sound.play("snap");
        console.log(3 + '.' + num);
    });
    $("img").mouseenter(function (event, num){
        ion.sound.play("branch_break");
        console.log(4 + '.' + num);
    });

});