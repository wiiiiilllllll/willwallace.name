/*!
  hey, [be]Lazy.js - v1.6.2 - 2016.05.09
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
  (function(p,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():p.Blazy=m()})(this,function(){function p(b){var c=b._util;c.elements=B(b.options.selector);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&k(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.save_viewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],f=d.getBoundingClientRect();if(f.right>=e.left&&f.bottom>=e.top&&f.left<=e.right&&f.top<=e.bottom||q(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function x(b,c,a){if(!q(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(r)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[y&&1<c.length?1:0],f="img"===b.nodeName.toLowerCase();if(f||void 0===b.src){var l=new Image,u=function(){a.error&&a.error(b,"invalid");t(b,a.errorClass);g(l,"error",u);g(l,"load",h)},h=function(){if(f){b.src=d;v(b,"srcset",a.srcset);var c=b.parentNode;c&&"picture"===c.nodeName.toLowerCase()&&k(c.getElementsByTagName("source"),function(b){v(b,"srcset",a.srcset)})}else b.style.backgroundImage='url("'+d+'")';w(b,a);g(l,"load",h);g(l,"error",u)};n(l,"error",u);n(l,"load",h);l.src=d}else b.src=d,w(b,a)}else"video"===b.nodeName.toLowerCase()?(k(b.getElementsByTagName("source"),function(b){v(b,"src",a.src)}),b.load(),w(b,a)):(a.error&&a.error(b,"missing"),t(b,a.errorClass))}function w(b,c){t(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);k(c.breakpoints,function(a){b.removeAttribute(a.src)})}function v(b,c,a){var d=b.getAttribute(a);d&&(b[c]=d,b.removeAttribute(a))}function q(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function t(b,c){q(b,c)||(b.className+=" "+c)}function B(b){var c=[];b=document.querySelectorAll(b);for(var a=b.length;a--;c.unshift(b[a]));return c}function z(b){e.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;e.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,!1)}function g(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,!1)}function k(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function A(b,c,a){var d=0;return function(){var f=+new Date;f-d<c||(d=f,b.apply(a,arguments))}}var r,e,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,e){e=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=e.length;h--;)e[h].currentStyle.k&&b.push(e[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.container=a.options.container?document.querySelectorAll(a.options.container):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.save_viewportOffsetDelay=a.options.save_viewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=r=a.options.src||"data-src";y=1<window.devicePixelRatio;e={};e.top=0-a.options.offset;e.left=0-a.options.offset;a.revalidate=function(){p(this)};a.load=function(a,b){var c=this.options;void 0===a.length?x(a,b,c):k(a,function(a){x(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&k(this.options.container,function(b){g(b,"scroll",a.validateT)});g(window,"scroll",a.validateT);g(window,"resize",a.validateT);g(window,"resize",a.save_viewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=A(function(){m(a)},a.options.validateDelay,a);d.save_viewportOffsetT=A(function(){z(a.options.offset)},a.options.save_viewportOffsetDelay,a);z(a.options.offset);k(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return r=a.src,!1});setTimeout(function(){p(a)})}});
// cash
// http://kenwheeler.github.io/cash/
// v1.0.0

"use strict";!function(t,e){"function"==typeof define&&define.amd?define(e):"undefined"!=typeof exports?module.exports=e():t.cash=t.$=e()}(this,function(){function t(e,n){return new t.fn.init(e,n)}function e(t){var e=e||s.createDocumentFragment(),n=n||e.appendChild(s.createElement("div"));return n.innerHTML=t,n}function n(t,e){return parseInt(u.getComputedStyle(t[0],null)[e],10)}function i(){function t(t){var e=(Math.random().toString(16)+"000000000").substr(2,8);return t?"-"+e.substr(0,4)+"-"+e.substr(4,4):e}return t()+t(!0)+t(!0)+t()}function r(e,n,r){var s=t(e).data("cshid")||i();t(e).data("cshid",s),s in p||(p[s]={}),n in p[s]||(p[s][n]=[]),p[s][n].push(r)}var s=document,u=window,c=Array.prototype,a=c.slice,h=c.filter,o=/^#[\w-]*$/,f=/^\.[\w-]*$/,l=/^[\w-]*$/,d=t.fn=t.prototype={cash:!0,length:0};d.init=function(e,n){var i,r,u=[];if(!e)return this;if(this.length=1,"string"!=typeof e)return e.cash?e:(this[0]=e,this);if("<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3)u=t.parseHTML(e);else{if(i=o.test(e),r=e.slice(1),!n&&i)return this[0]=s.getElementById(r),this;n=t(n)[0]||s,u=a.call(l.test(r)?f.test(e)?s.getElementsByClassName(r):s.getElementsByTagName(e):n.querySelectorAll(e))}return this.length=0,t.merge(this,u),this},d.init.prototype=d,t.each=function(t,e){for(var n=t.length,i=0;n>i;i++)e.call(t[i],t[i],i,t)},t.extend=d.extend=function(t,e){var n;e||(e=t,t=this);for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},t.matches=function(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)},t.merge=function(t,e){for(var n=+e.length,i=t.length,r=0;n>r;i++,r++)t[i]=e[r];return t.length=i,t},t.parseHTML=function(t){var n=/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(t);return n?[s.createElement(n[1])]:(n=e(t),a.call(n.childNodes))},t.unique=function(e){return t.merge(t(),a.call(e).filter(function(t,e,n){return n.indexOf(t)===e}))};var m=/\S+/g;d.extend({addClass:function(t){var e,n,i=t.match(m);return this.each(function(t){if(n=i.length,t.classList)for(;n--;)t.classList.add(i[n]);else for(;n--;)e=" "+t.className+" ",-1===e.indexOf(" "+i[n]+" ")&&(t.className+=" "+i[n])}),this},attr:function(t,e){return e?(this.each(function(n){return n.setAttribute(t,e)}),this):this[0].getAttribute(t)},hasClass:function(t){return this[0].classList?this[0].classList.contains(t):-1!==this[0].className.indexOf(t)},prop:function(t){return this[0][t]},removeAttr:function(t){return this.each(function(e){return e.removeAttribute(t)}),this},removeClass:function(t){var e,n,i=t.match(m);return this.each(function(t){if(e=i.length,t.classList)for(;e--;)t.classList.remove(i[e]);else{for(n=" "+t.className+" ";e--;)n=n.replace(" "+i[e]+" "," ");t.className=n.trim()}}),this}}),d.extend({add:function(){var e,n=a.call(this),i=0;for(e=arguments.length;e>i;i++)n=n.concat(a.call(t(arguments[i])));return t.unique(n)},each:function(e){t.each(this,e)},eq:function(e){return t(this[e])},filter:function(e){return"string"==typeof e?h.call(this,function(n){return t.matches(n,e)}):h.call(this,e)},first:function(){return t(this[0])},get:function(t){return this[t]},index:function(e){return e?a.call(t(e).children()).indexOf(this[0]):a.call(t(this[0]).parent().children()).indexOf(this[0])},last:function(){return t(this[this.length-1])}}),d.extend({css:function(t,e){return"object"!=typeof t?e?(this.each(function(n){return n.style[t]=e}),this):u.getComputedStyle(this[0],null)[t]:void this.each(function(e){for(var n in t)t.hasOwnProperty(n)&&(e.style[n]=t[n])})}}),d.extend({data:function(e,n){return n?(this.each(function(i){i.dataset?i.dataset[e]=n:t(i).attr("data-"+e,n)}),this):this[0].dataset?this[0].dataset[e]:t(this[0]).attr("data-"+e)},removeData:function(e){return this.each(function(n){n.dataset?delete n.dataset[e]:t(n).removeAttr("data-"+e)}),this}}),d.extend({height:function(){return this[0].getBoundingClientRect().height},innerWidth:function(){return this[0].clientWidth},innerHeight:function(){return this[0].clientHeight},outerWidth:function(t){return t===!0?this[0].offsetWidth+(n(this,"margin-left")||n(this,"marginLeft")||0)+(n(this,"margin-right")||n(this,"marginRight")||0):this[0].offsetWidth},outerHeight:function(t){return t===!0?this[0].offsetHeight+(n(this,"margin-top")||n(this,"marginTop")||0)+(n(this,"margin-bottom")||n(this,"marginBottom")||0):this[0].offsetHeight},width:function(){return this[0].getBoundingClientRect().width}});var p={};d.extend({off:function(e,n){return this.each(function(i){if(n)i.removeEventListener(e,n);else for(var r in p[t(i).data("cshid")][e])i.removeEventListener(e,p[t(i).data("cshid")][e][r])}),this},on:function(e,n,i){return"function"==typeof n?(i=n,this.each(function(n){r(t(n),e,i),n.addEventListener(e,i)}),this):(this.each(function(s){function u(e){var r=e.target;if(t.matches(r,n))i.call(r);else{for(;!t.matches(r,n);){if(r===s)return r=!1;r=r.parentNode}r&&i.call(r)}}r(t(s),e,u),s.addEventListener(e,u)}),this)},ready:function(t){this[0].addEventListener("DOMContentLoaded",t)},trigger:function(t){var e=s.createEvent("HTMLEvents");return e.initEvent(t,!0,!1),this.each(function(t){return t.dispatchEvent(e)}),this}});var g=encodeURIComponent;return d.extend({serialize:function(){var t,e,n,i=this[0],r="";for(e=i.elements.length-1;e>=0;e--)if(t=i.elements[e],t.name&&"file"!==t.type&&"reset"!==t.type)if("select-multiple"===t.type)for(n=i.elements[e].options.length-1;n>=0;n--)t.options[n].selected&&(r+="&"+t.name+"="+g(t.options[n].value).replace(/%20/g,"+"));else"submit"!==t.type&&"button"!==t.type&&(r+="&"+t.name+"="+g(t.value).replace(/%20/g,"+"));return r.substr(1)},val:function(t){return void 0===t?this[0].value:(this.each(function(e){return e.value=t}),this)}}),d.extend({append:function(e){return this[0].appendChild(t(e)[0]),this},appendTo:function(e){return t(e)[0].appendChild(this[0]),this},clone:function(){return t(this[0].cloneNode(!0))},empty:function(){return this.each(function(t){return t.innerHTML=""}),this},html:function(e){var n;return"undefined"===e?this[0].innerHTML:(n="object"==typeof e?t(e)[0].outerHTML:e,this.each(function(t){return t.innerHTML=""+n}),this)},insertAfter:function(e){return t(e)[0].insertAdjacentHTML("afterend",this[0].outerHTML),this},insertBefore:function(e){return t(e)[0].insertAdjacentHTML("beforebegin",this[0].outerHTML),this},prepend:function(e){return t(this)[0].insertAdjacentHTML("afterBegin",t(e)[0].outerHTML),this},prependTo:function(e){return t(e)[0].insertAdjacentHTML("afterBegin",this[0].outerHTML),this},remove:function(){this.each(function(t){return t.parentNode.removeChild(t)})},text:function(t){return t?(this.each(function(e){return e.textContent=t}),this):this[0].textContent}}),d.extend({children:function(e){return e?t(this[0].children).filter(function(n){return t.matches(n,e)}):t.fn.extend(this[0].children,t.fn)},closest:function(e){return!e||t.matches(this[0],e)?this:this.parent().closest(e)},is:function(e){return e?e.cash?this[0]===e[0]:"string"==typeof e?t.matches(this[0],e):!1:!1},find:function(e){return t.fn.extend(this[0].querySelectorAll(e),t.fn)},has:function(e){return h.call(this,function(n){return 0!==t(n).find(e).length})},next:function(){return t(this[0].nextElementSibling)},not:function(e){return h.call(this,function(n){return!t.matches(n,e)})},parent:function(){var e=c.map.call(this,function(t){return t.parentElement||s.body.parentNode});return t.unique(e)},parents:function(e){var n,i=[],r=0;return this.each(function(u){for(n=u;n!==s.body.parentNode;)n=n.parentElement,(!e||e&&t.matches(n,e))&&(i[r]=n,r++)}),t.unique(i)},prev:function(){return t(this[0].previousElementSibling)},siblings:function(){var t=this.parent().children(),e=this[0];return h.call(t,function(t){return t!==e})}}),t});
var ajax = function(url, callback, type) {
	var type = type || 'GET';
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);

	xhr.onload = function(e) {
	  if (xhr.status >= 200 && xhr.status < 400) {
	    // Success!
	    var resp = xhr.responseText;
	    console.log(resp);
	    console.log(e)
	  } else {
	    // We reached our target server, but it returned an error
		console.error('ajax.js: error 1')
	  }
	};

	xhr.onerror = function() {
	  // There was a connection error of some sort
	  console.error('ajax.js: error 2')
	};

	xhr.send();
}
var app = {
	init : function() {
		$('html').removeClass('no-js').addClass('js');
		var bLazy = new Blazy();
		// zoom.init();
	}
}

$(document).ready(app.init);
// Lay out tiles on a nice neat 4x4 grid

var grid = {

	// init: function() {
	// 	grid.doLayout();
	// },

	// doLayout: function() {
		
	// },

	// layOutTiles: function() {
	// 	var numberOfTiles = $('.second .tile').length;
	// 	console.log(numberOfTiles);
		
	// 	var tilePositions = [];

	// 	var x = 0;

	// 	$('.yr, .xr').each(function(){
	// 		console.log(x++)
	// 		var yr = Math.floor(Math.random() * (4 - 1)) + 1;
	// 		var xr = Math.floor(Math.random() * (4 - 1)) + 1;
	// 		var newClass = 'y'+yr+' '+'x'+xr;
	// 		if (tilePositions.indexOf(newClass) != -1) {
				
	// 		}
	// 		$(this).removeClass('yr, xr').addClass(newClass);
	// 		tilePositions.push(newClass)
	// 	})
	// }

}
// $('.hero').on('mouseover', function() {
// 	console.log('hey there')
// })
// http://callmenick.com/post/advanced-parallax-scrolling-effect

;(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });
  };

})();
// ZOOM JS
// Like a lightbox but written from scratch for some reason

var zoom = {

	init: function(){
		$('.zoom').on('click', function(e){
			e.preventDefault();
			target = $(e.target).attr('href') ? $(e) : $(e).parents('[href]');
			zoom.load(target);
		})
	},

	load: function(e){
		href = e.attr('href');
		frag = document.createDocumentFragment();
		img = ajax(href);
		zoom.show(img);
	},

	show: function(img){
		console.log('img ',img);
	},
}