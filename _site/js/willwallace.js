/*!
  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
;
(function(root, blazy) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register bLazy as an anonymous module
        define(blazy);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = blazy();
    } else {
        // Browser globals. Register bLazy on window
        root.Blazy = blazy();
    }
})(this, function() {
    'use strict';

    //private vars
    var _source, _viewport, _isRetina, _attrSrc = 'src',
        _attrSrcset = 'srcset';

    // constructor
    return function Blazy(options) {
        //IE7- fallback for missing querySelectorAll support
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(r, c, i, j, a) {
                a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v');
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            };
        }

        //options and helper vars
        var scope = this;
        var util = scope._util = {};
        util.elements = [];
        util.destroyed = true;
        scope.options = options || {};
        scope.options.error = scope.options.error || false;
        scope.options.offset = scope.options.offset || 100;
        scope.options.success = scope.options.success || false;
        scope.options.selector = scope.options.selector || '.b-lazy';
        scope.options.separator = scope.options.separator || '|';
        scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
        scope.options.errorClass = scope.options.errorClass || 'b-error';
        scope.options.breakpoints = scope.options.breakpoints || false; // obsolete
        scope.options.loadInvisible = scope.options.loadInvisible || false;
        scope.options.successClass = scope.options.successClass || 'b-loaded';
        scope.options.validateDelay = scope.options.validateDelay || 25;
        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
        scope.options.srcset = scope.options.srcset || 'data-srcset';
        scope.options.src = _source = scope.options.src || 'data-src';
        _isRetina = window.devicePixelRatio > 1;
        _viewport = {};
        _viewport.top = 0 - scope.options.offset;
        _viewport.left = 0 - scope.options.offset;


        /* public functions
         ************************************/
        scope.revalidate = function() {
            initialize(this);
        };
        scope.load = function(elements, force) {
            var opt = this.options;
            if (elements.length === undefined) {
                loadElement(elements, force, opt);
            } else {
                each(elements, function(element) {
                    loadElement(element, force, opt);
                });
            }
        };
        scope.destroy = function() {
            var self = this;
            var util = self._util;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    unbindEvent(object, 'scroll', util.validateT);
                });
            }
            unbindEvent(window, 'scroll', util.validateT);
            unbindEvent(window, 'resize', util.validateT);
            unbindEvent(window, 'resize', util.saveViewportOffsetT);
            util.count = 0;
            util.elements.length = 0;
            util.destroyed = true;
        };

        //throttle, ensures that we don't call the functions too often
        util.validateT = throttle(function() {
            validate(scope);
        }, scope.options.validateDelay, scope);
        util.saveViewportOffsetT = throttle(function() {
            saveViewportOffset(scope.options.offset);
        }, scope.options.saveViewportOffsetDelay, scope);
        saveViewportOffset(scope.options.offset);

        //handle multi-served image src (obsolete)
        each(scope.options.breakpoints, function(object) {
            if (object.width >= window.screen.width) {
                _source = object.src;
                return false;
            }
        });

        // start lazy load
        setTimeout(function() {
            initialize(scope);
        }); // "dom ready" fix

    };


    /* Private helper functions
     ************************************/
    function initialize(self) {
        var util = self._util;
        // First we create an array of elements to lazy load
        util.elements = toArray(self.options.selector);
        util.count = util.elements.length;
        // Then we bind resize and scroll events if not already binded
        if (util.destroyed) {
            util.destroyed = false;
            if (self.options.container) {
                each(self.options.container, function(object) {
                    bindEvent(object, 'scroll', util.validateT);
                });
            }
            bindEvent(window, 'resize', util.saveViewportOffsetT);
            bindEvent(window, 'resize', util.validateT);
            bindEvent(window, 'scroll', util.validateT);
        }
        // And finally, we start to lazy load.
        validate(self);
    }

    function validate(self) {
        var util = self._util;
        for (var i = 0; i < util.count; i++) {
            var element = util.elements[i];
            if (elementInView(element) || hasClass(element, self.options.successClass)) {
                self.load(element);
                util.elements.splice(i, 1);
                util.count--;
                i--;
            }
        }
        if (util.count === 0) {
            self.destroy();
        }
    }

    function elementInView(ele) {
        var rect = ele.getBoundingClientRect();
        return (
            // Intersection
            rect.right >= _viewport.left && rect.bottom >= _viewport.top && rect.left <= _viewport.right && rect.top <= _viewport.bottom
        );
    }

    function loadElement(ele, force, options) {
        // if element is visible, not loaded or forced
        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || (ele.offsetWidth > 0 && ele.offsetHeight > 0))) {
            var dataSrc = ele.getAttribute(_source) || ele.getAttribute(options.src); // fallback to default 'data-src'
            if (dataSrc) {
                var dataSrcSplitted = dataSrc.split(options.separator);
                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                var isImage = equal(ele, 'img');
                // Image or background image
                if (isImage || ele.src === undefined) {
                    var img = new Image();
                    // using EventListener instead of onerror and onload
                    // due to bug introduced in chrome v50 
                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)
                    var onErrorHandler = function() {
                        if (options.error) options.error(ele, "invalid");
                        addClass(ele, options.errorClass);
                        unbindEvent(img, 'error', onErrorHandler);
                        unbindEvent(img, 'load', onLoadHandler);
                    };
                    var onLoadHandler = function() {
                        // Is element an image
                        if (isImage) {
                            setSrc(ele, src); //src
                            handleSource(ele, _attrSrcset, options.srcset); //srcset
                            //picture element
                            var parent = ele.parentNode;
                            if (parent && equal(parent, 'picture')) {
                                each(parent.getElementsByTagName('source'), function(source) {
                                    handleSource(source, _attrSrcset, options.srcset);
                                });
                            }
                        // or background-image
                        } else {
                            ele.style.backgroundImage = 'url("' + src + '")';
                        }
                        itemLoaded(ele, options);
                        unbindEvent(img, 'load', onLoadHandler);
                        unbindEvent(img, 'error', onErrorHandler);
                    };
                    bindEvent(img, 'error', onErrorHandler);
                    bindEvent(img, 'load', onLoadHandler);
                    setSrc(img, src); //preload
                } else { // An item with src like iframe, unity, simpelvideo etc
                    setSrc(ele, src);
                    itemLoaded(ele, options);
                }
            } else {
                // video with child source
                if (equal(ele, 'video')) {
                    each(ele.getElementsByTagName('source'), function(source) {
                        handleSource(source, _attrSrc, options.src);
                    });
                    ele.load();
                    itemLoaded(ele, options);
                } else {
                    if (options.error) options.error(ele, "missing");
                    addClass(ele, options.errorClass);
                }
            }
        }
    }

    function itemLoaded(ele, options) {
        addClass(ele, options.successClass);
        if (options.success) options.success(ele);
        // cleanup markup, remove data source attributes
        ele.removeAttribute(options.src);
        each(options.breakpoints, function(object) {
            ele.removeAttribute(object.src);
        });
    }

    function setSrc(ele, src) {
        ele[_attrSrc] = src;
    }

    function handleSource(ele, attr, dataAttr) {
        var dataSrc = ele.getAttribute(dataAttr);
        if (dataSrc) {
            ele[attr] = dataSrc;
            ele.removeAttribute(dataAttr);
        }
    }

    function equal(ele, str) {
        return ele.nodeName.toLowerCase() === str;
    }

    function hasClass(ele, className) {
        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
    }

    function addClass(ele, className) {
        if (!hasClass(ele, className)) {
            ele.className += ' ' + className;
        }
    }

    function toArray(selector) {
        var array = [];
        var nodelist = document.querySelectorAll(selector);
        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
        return array;
    }

    function saveViewportOffset(offset) {
        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
    }

    function bindEvent(ele, type, fn) {
        if (ele.attachEvent) {
            ele.attachEvent && ele.attachEvent('on' + type, fn);
        } else {
            ele.addEventListener(type, fn, false);
        }
    }

    function unbindEvent(ele, type, fn) {
        if (ele.detachEvent) {
            ele.detachEvent && ele.detachEvent('on' + type, fn);
        } else {
            ele.removeEventListener(type, fn, false);
        }
    }

    function each(object, fn) {
        if (object && fn) {
            var l = object.length;
            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
        }
    }

    function throttle(fn, minDelay, scope) {
        var lastCall = 0;
        return function() {
            var now = +new Date();
            if (now - lastCall < minDelay) {
                return;
            }
            lastCall = now;
            fn.apply(scope, arguments);
        };
    }
});
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssvhunit-objectfit-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var f in g)if(g.hasOwnProperty(f)){if(e=[],n=g[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),y.push((o?"":"no-")+a.join("-"))}}function i(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?S.className.baseVal=n:S.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(){var e=n.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function l(e,t,r,o){var i,s,l,u,p="modernizr",d=a("div"),c=f();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:p+(r+1),d.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+p,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=p,c.fake&&(c.style.background="",c.style.overflow="hidden",u=S.style.overflow,S.style.overflow="hidden",S.appendChild(c)),s=t(d,e),c.fake?(c.parentNode.removeChild(c),S.style.overflow=u,S.offsetHeight):d.parentNode.removeChild(d),!!s}function u(e,n){return!!~(""+e).indexOf(n)}function p(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?p(o,t||n):o);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(n[o])+":"+r+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,i){function f(){p&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=m(e,o);if(!r(l,"undefined"))return l}for(var p,d,c,h,v,y=["modernizr","tspan","samp"];!N.style&&y.length;)p=!0,N.modElem=a(y.shift()),N.style=N.modElem.style;for(c=e.length,d=0;c>d;d++)if(h=e[d],v=N.style[h],u(h,"-")&&(h=s(h)),N.style[h]!==t){if(i||r(o,"undefined"))return f(),"pfx"==n?h:!0;try{N.style[h]=o}catch(g){}if(N.style[h]!=v)return f(),"pfx"==n?h:!0}return f(),!1}function v(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,i):(a=(e+" "+j.join(s+" ")+s).split(" "),d(a,n,t))}var y=[],g=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var S=n.documentElement,_="svg"===S.nodeName.toLowerCase(),w=C.testStyles=l;w("#modernizr { height: 50vh; }",function(n){var t=parseInt(e.innerHeight/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).height,10);Modernizr.addTest("cssvhunit",r==t)});var x="Moz O ms Webkit",b=C._config.usePrefixes?x.split(" "):[];C._cssomPrefixes=b;var E=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};C.atRule=E;var j=C._config.usePrefixes?x.toLowerCase().split(" "):[];C._domPrefixes=j;var z={elem:a("modernizr")};Modernizr._q.push(function(){delete z.elem});var N={style:z.elem.style};Modernizr._q.unshift(function(){delete N.style}),C.testAllProps=v;var P=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=s(e)),n?v(e,n,t):v(e,"pfx"))};Modernizr.addTest("objectfit",!!P("objectFit"),{aliases:["object-fit"]}),o(),i(y),delete C.addTest,delete C.addAsyncTest;for(var T=0;T<Modernizr._q.length;T++)Modernizr._q[T]();e.Modernizr=Modernizr}(window,document);
// Cross-browser event listener
// http://stackoverflow.com/a/12783362
function addListener(elem, type, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);

    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, function() {
			return fn.call(elem, window.event);
		});
    } else {
        elem["on" + type] = fn;
    }
}

// Add classname
function addClass(el, cl) {
	if (el.classList) {
		el.classList.add(cl);
	} else if (!hasClass(el, cl)) {
		el.className += ' ' + cl;
	}
}

// Remove classname
function removeClass(el, cl) {
	if (el.classList) {
		el.classList.remove(cl);
	} else if (hasClass(el, cl)) {
		el.className = el.className.replace(new RegExp('(^|\\b)' + cl.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

// Check if element has a certain class
function hasClass(ele, className) {
    return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;
}
// It's a lightbox oh geez
// Hand-written by me so probably full of bugs
var lux = {
	
	init: function(){
		// Set up click event handlers
		var images = document.querySelectorAll('.lux');

		for (i=0;i<images.length;i++) {
			addListener(images[i], 'click', function(e){

				if (hasClass(e,'obj-lux')) {
					e = e.querySelector('img');
				};

				lux.show(e.target);
			});
		};
	},
	
	show: function(e){

		// Create a clone of the image that was clicked on
		var clone = document.createElement('img');
		clone.src = e.getAttribute("data-full");
		addClass(clone, 'clone');

		// Create an overlay div
		var overlay = document.createElement('div');
		addClass(overlay, 'overlay');

		// Append the clone inside the overlay, then append the overlay to the body
		overlay.appendChild(clone);
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(overlay);

		// Add 'overlay--open' class
		setTimeout(function(){
			addClass(overlay, 'overlay--open')
		}, 10);

		// Add click handlers for closing the overlay
		addListener(overlay, 'click', function(){
			lux.hide();
		});

		// Prevent scrolling while lightbox is open
		var html = document.getElementById('html');
		addClass(html, 'frozen');
	},

	hide: function(){
		var overlay = document.querySelectorAll('.overlay')[0];
		
		// Remove 'overlay--open' class
		removeClass(overlay, 'overlay--open');

		setTimeout(function(){
			overlay.parentNode.removeChild(overlay);
			var html = document.getElementById('html');
		}, 210);

		// Restore scrolling
		removeClass(html, 'frozen');
	},

	obj: function(el) {
		addListener(el, 'click', function(e){
			e = el.querySelector('img');
			lux.show(e);
		});
	}
}
// Obj
// A basic replacement for object-fit
// Adapted from http://codepen.io/xaddict/pen/xZpJgW

function obj(el) {
	var img = el.querySelector('img');
	if (img.currentSrc) {
		el.style.backgroundImage = 'url(' + img.currentSrc + ')';
		addClass(el, 'obj');
		if (hasClass(img, 'lux')) {
			addClass(el, 'obj-lux');
			lux.obj(el);
		}
	}
}
// Add a new class "js" to the HTML element to show that js is enabled
document.getElementById('html').className = "js";

// b-lazy is our lazy-loading image solution
// https://github.com/dinbror/blazy
var bLazy = new Blazy({
	success: function(el){
		if (Modernizr.objectfit) {
			obj(el.parentNode);
		};
	}
});

// It's time to light the lightboxes
lux.init();