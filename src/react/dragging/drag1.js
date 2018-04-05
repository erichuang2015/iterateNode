(function ( $ ) {
    $.fn.dragging = function(options){

        if(this.length == 0) return this;

        // support mutltiple elements
        if(this.length > 1){
            return this.each(function(){$(this).dragging(options)});
            return this;
        }

        // set a reference to our slider element
        var el = this;

        var defaults = {
            axis:null,
            container:$(this).parent(),
            containment:true,
            handler:el,
            onDragStart:function(){},
            onDrag:function(){},
            onDragStop:function(){}
        };

        var settings = $.extend( {}, defaults, options );
        var containerWidth,
            containerHeight,
            costrainX,
            costrainY,
            stop = false;
        var startX = 0,
            startY = 0,
            $left = 0,
            $top = 0;

// private functions

        var initialize = function(){
            console.log('draggin on element ' + el + ' is playing.');
            console.log( el.width(), el );
            containerWidth = settings.container.width();
            containerHeight = settings.container.height();
            costrainX = containerWidth - el.outerWidth();
            costrainY = containerHeight - el.outerHeight();
            startX = 0;
            startY = 0;
            $left = 0;
            $top = 0;
        }

        // desktop case
        var desktop = function(){
            var dragging = false;
            settings.handler.on('mousedown',function(e){
                if ( stop ) return false;
                dragging = true;
                boxleft = parseInt(el.css('left')); // get left position of box
                boxtop = parseInt(el.position().top);
                startX = parseInt(e.clientX); // get x coord of touch point
                startY = parseInt(e.clientY); // get x coord of touch point
                settings.onDragStart.call(undefined); // callback function on Drag starting
            })
            $(document).on('mouseup',function(e){
                if (dragging){
                    dragging = false;
                    settings.onDragStop.call(undefined, $left, $top, el); // callback function
                }
            })
            $(document).on('mousemove',function(e){
                if (dragging){

                    currentNewPositionX = boxleft + ( e.clientX - startX );
                    currentNewPositionY = boxtop + (e.clientY - startY);

                    $left = (currentNewPositionX > costrainX && settings.containment ) ? costrainX : (currentNewPositionX< 0 && settings.containment)? 0 : currentNewPositionX;
                    $top = (currentNewPositionY > costrainY && settings.containment )? costrainY : (currentNewPositionY < 0 && settings.containment)? 0 : currentNewPositionY;

                    settings.onDrag.call(undefined, $left, $top, el); // callback function

                    if ( !settings.axis || settings.axis.toUpperCase() == 'X' )
                        el.css({'left':$left + 'px' });
                    if ( !settings.axis || settings.axis.toUpperCase() == 'Y' )
                        el.css({'top':$top + 'px' })
                }
            })
        }

        // Mobile case
        var mobile = function() {
            var DOMel = el[0];
            var HandlerEl = settings.handler[0];
            var boxleft = 0, // left position of moving box
                boxtop = 0,
                startx = 0, // starting x coordinate of touch point
                starty = 0,
                dist = 0, // distance traveled by touch point
                touchobj = null, // Touch object holder
                $left = 0,
                $top = 0;

            // listeners
            HandlerEl.addEventListener('touchstart', function(e){
                if (stop) return false;
                touchobj = e.changedTouches[0] // reference first touch point
                boxleft = parseInt(el.css('left')) // get left position of box
                boxtop = parseInt(el.position().top) // get top position of box
                startx = parseInt(touchobj.clientX) // get x coord of touch point
                starty = parseInt(touchobj.clientY) // get x coord of touch point
                settings.onDragStart.call(undefined); // callback function on Drag starti
                e.preventDefault() // prevent default click behavior
            }, false)

            HandlerEl.addEventListener('touchmove', function(e){
                if (stop) return false;
                touchobj = e.changedTouches[0] // reference first touch point for this event
                var distX = parseInt(touchobj.clientX) - startx;// calculate dist traveled by touch point
                var distY = parseInt(touchobj.clientY) - starty;
                $left = (boxleft + distX > costrainX && settings.containment )? costrainX : (boxleft + distX < 0 && settings.containment)? 0 : boxleft + distX;
                $top = (boxtop + distY > costrainY && settings.containment )? costrainY : (boxtop + distY < 0 && settings.containment)? 0 : boxtop + distY;
                settings.onDrag.call(undefined, $left, $top, el ); // callback function
                // move box according to starting pos plus dist
                if ( !settings.axis  || settings.axis.toUpperCase() == 'X' )
                    DOMel.style.left = $left + 'px';
                if ( !settings.axis || settings.axis.toUpperCase() == 'Y' )
                    DOMel.style.top = $top + 'px';
                e.preventDefault()
            }, false)

            HandlerEl.addEventListener('touchend', function(e){
                if (stop) return false;
                settings.onDragStop.call(undefined, $left, $top, el);
            }, false)

        }

        this.stop = function(){
            stop = true;
            console.log('draggin on element ' + el + ' is stopped.');
            return this;
        };

        this.play = function(){
            stop = false;
            initialize();
            return this;
        }

// main code		
        initialize();
        $(window).bind('resize', function(){ initialize() } );
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            mobile();
        else
            desktop();

        return this;
    }
}( jQuery ));