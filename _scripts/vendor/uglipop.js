/*|--uglipop.js--|
|--(A Minimalistic Pure JavaScript Modal )--|
|--Author : flouthoc (gunnerar7@gmail.com)(https://github.com/flouthoc)--|
|--Contributers : Add Your Name Below--|
|-- zhuharev (kirill at zhuharev.ru)(https://github.com/zhuharev)--|*/

(function(w, doc) {
    "use strict";

    var initted = false

    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    }

    function init() {
        if (initted) {
            return
        };

        initted = true;
        
        var overlay = doc.createElement('div');
        overlay.id = "uglipop_overlay";
        var content_fixed = doc.createElement('div');
        content_fixed.id = 'uglipop_content_fixed';
        var popbox = doc.createElement('div');
        popbox.id = 'uglipop_popbox';
        var overlay_wrapper = doc.createElement('div');
        overlay_wrapper.id = "uglipop_overlay_wrapper";
        var uglipop_close_button = doc.createElement('button');
        uglipop_close_button.id = "uglipop_close_button";
        uglipop_close_button.innerHTML = uglipop_close_button.innerHTML = '&times;';
        uglipop_close_button.addEventListener('click',remove);
        overlay_wrapper.appendChild(overlay);
        content_fixed.appendChild(popbox);
        content_fixed.appendChild(uglipop_close_button);
        doc.body.appendChild(overlay_wrapper);
        doc.body.appendChild(content_fixed);
        overlay_wrapper.addEventListener('click', remove);
        popbox.addEventListener('click', zoomIn);
        on(w, 'keydown', function(e) {
            //kill pop if button is ESC ;)
            if (e.keyCode == 27) {
                remove();
            }
        });


        //create global variables
        w.uglipop = uglipop
        w.removeuglipop = remove
    }

    function uglipop(config) {

        if (config) {
            if (typeof config.class == 'string' && config.class) {
                doc.getElementById('uglipop_popbox').setAttribute('class', config.class);
            }

            if (typeof config.content == 'string' && config.content && config.source == 'html') {
                doc.getElementById('uglipop_popbox').innerHTML = config.content;
            }

            if (typeof config.content == 'string' && config.content && config.source == 'div') {

                doc.getElementById('uglipop_popbox').innerHTML = doc.getElementById(config.content).innerHTML;

            }
        }

        doc.getElementById('html').className="js popped";


    }

    function remove() {
        doc.getElementById('html').className="js";
        zoomOut();
    }

    function zoomIn() {
        console.log('zoomIn');
        doc.getElementById('uglipop_content_fixed').className = "zoomed";
        doc.getElementById('uglipop_popbox').removeEventListener('click',zoomIn);
        doc.getElementById('uglipop_popbox').addEventListener('click',function(){
            zoomOut();
        })
    }

    function zoomOut() {
        console.log('zoomOut')
        doc.getElementById('uglipop_content_fixed').className = "";
        doc.getElementById('uglipop_popbox').removeEventListener('click',zoomOut)
        doc.getElementById('uglipop_popbox').addEventListener('click',function(){
            zoomIn();
        })
    }

    //init on window loaded
    on(doc, "DOMContentLoaded", init)
    on(doc, "load", init)
})(window, document)