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


        function leapToScene(frame) {
            /*var tip = frame.fingers[0].tipPosition;
            var tip2 = frame.fingers[1].tipPosition;
            var tip3 = frame.fingers[2].tipPosition;
            var tip4 = frame.fingers[3].tipPosition;
            var tip5 = frame.fingers[4].tipPosition;
            var ibox = frame.interactionBox;
            var npos = ibox.normalizePoint(tip);
            var npos2 = ibox.normalizePoint(tip2);
            var npos3 = ibox.normalizePoint(tip3);
            var npos4 = ibox.normalizePoint(tip4);
            var npos5 = ibox.normalizePoint(tip5);
            var w = $(window).width();
            var h = $(window).height();

            var x = w * npos[0];
            var y = h * (1 - npos[1]);
            var x2 = w * npos2[0];
            var y2 = h * (1 - npos2[1]);
            var x3 = w * npos3[0];
            var y3 = h * (1 - npos3[1]);
            var x4 = w * npos4[0];
            var y4 = h * (1 - npos4[1]);
            var x5 = w * npos5[0];
            var y5 = h * (1 - npos5[1]);

            if ((x < 0) || (x > w) || (y < 0) || (y > h) || (x2 < 0) || (x2 > w) || (y2 < 0) || (y2 > h) || (x3 < 0) || (x3 > w) || (y3 < 0) || (y3 > h) || (x4 < 0) || (x4 > w) || (y4 < 0) || (y4 > h) || (x5 < 0) || (x5 > w) || (y5 < 0) || (y5 > h))
                return null;

            return [[x, y], [x2, y2], [x3, y3], [x4, y4], [x5, y5]];*/
            function findFinger(finger)
            {
                if (finger === null)
                {
                    return [0,0];
                }
                else
                {
                    var tip = finger.tipPosition;
                    var w = $(window).width();
                    var h = $(window).height();
                    var ibox = frame.interactionBox;
                    var npos = ibox.normalizePoint(tip);
                    var x = w * npos[0];
                    var y = h * (1 - npos[1]);

                    if ((x<0) || (x>w) || (y<0) || (y>h))
                    {
                        return [0,0];
                    }
                    else
                    {
                        return [x, y];
                    }
                }
            }

            var allFingers = [];
            for (var i = 0; i<frame.fingers.length; i++)
            {
                var coord = findFinger(frame.fingers[i]);
                allFingers[allFingers.length] = coord;
            }

            return allFingers;

        }

        function triggerEvent(name) {

            for (var j = 0; j< poss.length; j++)
            {
                var ev = $.Event(name);
                ev.pageX = (poss[j] === null) ? 0 : poss[j][0];
                ev.pageY = (poss[j] === null) ? 0 : poss[j][1];
                allCursors[j].hide();
                var ele = document.elementFromPoint(ev.pageX, ev.pageY);
                allCursors[j].show();
                $(ele).trigger(ev);

            }
            /*var ev = $.Event(name);
            ev.pageX = (pos1 === null) ? 0 : pos1[0];
            ev.pageY = (pos1 === null) ? 0 : pos1[1];
            $cursor.hide();
            var el = document.elementFromPoint(ev.pageX, ev.pageY);
            $cursor.show();
            $(el).trigger(ev);*/
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

        var controller = new Leap.Controller({
            frameEventName: 'animationFrame'
        });
        controller.on('deviceDisconnected', function() {
            $cursor.hide();
            $cursor2.hide();
            $cursor3.hide();
            $cursor4.hide();
            $cursor5.hide();
        });

        var poss = [];

        controller.on('frame', function(frame) {
            if (frame.pointables.length < 1) return;

            var new_pos = leapToScene(frame);
            if (new_pos === null)
                return;

            poss = [];
            for (var i = 0; i < new_pos.length; i++)
            {
                poss[poss.length] = new_pos[i];
            }

            triggerEvent('mouseenter');

            for (var c = 0; c < poss.length; c++)
            {
                allCursors[c].css({
                    top: (poss[c][1] - 5) + 'px',
                    left: (poss[c][0] - 5) + 'px',
                    opacity: 0.5
                });
            }

            /*var allCurPoss = [];
            for (var d = 0; d<poss.length; d++)
            {
                allCursors[d].getPosition();
            }*/
            /*
            $cursor.css({
                top: (pos1[1] - 5) + 'px',
                left: (pos1[0] - 5) + 'px',
                opacity: 0.5
            });
            $cursor2.css({
                top: (pos2[1] - 5) + 'px',
                left: (pos2[0] - 5) + 'px',
                opacity: 0.5
            });
            $cursor3.css({
                top: (pos3[1] - 5) + 'px',
                left: (pos3[0] - 5) + 'px',
                opacity: 0.5
            });
            $cursor4.css({
                top: (pos4[1] - 5) + 'px',
                left: (pos4[0] - 5) + 'px',
                opacity: 0.5
            });
            $cursor5.css({
                top: (pos5[1] - 5) + 'px',
                left: (pos5[0] - 5) + 'px',
                opacity: 0.5
            });*/
        });

        $('body').focus();
        controller.connect();
    };
})(jQuery);