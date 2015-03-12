(function($) {
	$.leap_pointer_on_page = function() {

	//Cursor Objects
        var $cursor = $('<div>').css({
            display: 'block',
            background: '#000',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            zIndex: 255,
        }).appendTo($('body'));

        var $cursor2 = $('<div>').css({
            display: 'block',
            background: '#000',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            zIndex: 255,
            top: 100
        }).appendTo($('body'));

        var $cursor3 = $('<div>').css({
            display: 'block',
            background: '#000',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            zIndex: 255,
            top: 150
        }).appendTo($('body'));

        var $cursor4 = $('<div>').css({
            display: 'block',
            background: '#000',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            zIndex: 255,
            top: 200
        }).appendTo($('body'));

        var $cursor5 = $('<div>').css({
            display: 'block',
            background: '#000',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            position: 'absolute',
            zIndex: 255,
            top: 250
        }).appendTo($('body'));

        var allCursors = [$cursor, $cursor2, $cursor3, $cursor4, $cursor5];



	//takes the x,y coordinates output by leap background and translates them to points on the screen.
	function get_browser_coord(leap_coord) {
		function findFinger(tip){
			var w = $(window).width();
			var h = $(window).height();
			var x = w * tip[0];
			var y = h * tip[1];

			if ((x<0) || (x>w) || (y<0) || (y>h)){
				return [0,0];
			}
			else{
				return [x, y];
			}	
		}



		var allFingers = [];
		for (var i = 0; i<leap_coord.length; i++){
			var coord = findFinger(leap_coord[i]);
			allFingers[allFingers.length] = coord;
		}

		return allFingers;
	}



	//triggers jquery events
        function triggerEvent(name) {

            for (var j = 0; j< poss.length; j++){
                var ev = $.Event(name);
                ev.pageX = (poss[j] === null) ? 0 : poss[j][0];
                ev.pageY = (poss[j] === null) ? 0 : poss[j][1];
                // allCursors[j].hide();
                var ele = document.elementFromPoint(ev.pageX, ev.pageY);
                // allCursors[j].show();
                $(ele).trigger(ev, j);
                //console.log(j);

            }
        }

        function now() {
            return +(new Date()) / 1000;
        }

        var pen_down = false;
        var pos1, pos2, pos3, pos4, pos5 = null;
        var pen_down_time = null;

        $(window).bind('keydown', function(ev) {
            pen_down = true;
            pen_down_time = now();
            triggerEvent('mousedown');
        });
        $(window).bind('keyup', function(ev) {
            pen_down = false;
            triggerEvent('mouseup');
            if ((now() - pen_down_time) < 0.5)
                triggerEvent('click');
        });


        /*controller.on('deviceStopped', function() {
            $cursor.hide();
            $cursor2.hide();
            $cursor3.hide();
            $cursor4.hide();
            $cursor5.hide();
        });*/


	var poss = [];
	
	chrome.runtime.onConnect.addListener(function(port){ // establish a new port connection with chrome runtime...

		console.log('connected');
		console.assert(port.name=="asdf");
		
		port.onMessage.addListener(function(leap_coord) { // run this code every time a message is sent to the active tab...
			console.log('asdfasdfasdf');

			var new_pos = get_browser_coord(leap_coord); 

			poss = [];

			for (var i = 0; i < new_pos.length; i++){
				poss[poss.length] = new_pos[i];
			}
			
			triggerEvent('mouseenter');
			
			// update the position of the points on screen...
			for (var c = 0; c < poss.length; c++){
				allCursors[c].css({
					top: (poss[c][1] - 5) + 'px',
					left: (poss[c][0] - 5) + 'px',
					opacity: 0.5
				});
			}
		});
	});

        $('body').focus();//not sure what this does...
    };
})(jQuery);
