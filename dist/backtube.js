!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.BackTube=e():t.BackTube=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(4),i=r(o);t.exports=i["default"]},function(t,e){function n(t){return!!t&&"object"==typeof t}function r(t){return function(e){return null==e?void 0:e[t]}}function o(t){return null!=t&&i(s(t))}function i(t){return"number"==typeof t&&t>-1&&t%1==0&&f>=t}function u(t){return n(t)&&o(t)&&c.call(t,"callee")&&!l.call(t,"callee")}var a=Object.prototype,c=a.hasOwnProperty,l=a.propertyIsEnumerable,f=9007199254740991,s=r("length");t.exports=u},function(t,e){function n(t){return!!t&&"object"==typeof t}function r(t,e){var n=null==t?void 0:t[e];return a(n)?n:void 0}function o(t){return"number"==typeof t&&t>-1&&t%1==0&&b>=t}function i(t){return u(t)&&d.call(t)==l}function u(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function a(t){return null==t?!1:i(t)?h.test(p.call(t)):n(t)&&f.test(t)}var c="[object Array]",l="[object Function]",f=/^\[object .+?Constructor\]$/,s=Object.prototype,p=Function.prototype.toString,y=s.hasOwnProperty,d=s.toString,h=RegExp("^"+p.call(y).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),v=r(Array,"isArray"),b=9007199254740991,g=v||function(t){return n(t)&&o(t.length)&&d.call(t)==c};t.exports=g},function(t,e,n){function r(t,e){return t="number"==typeof t||l.test(t)?+t:-1,e=null==e?p:e,t>-1&&t%1==0&&e>t}function o(t){return"number"==typeof t&&t>-1&&t%1==0&&p>=t}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function u(t){if(null==t)return[];i(t)||(t=Object(t));var e=t.length;e=e&&o(e)&&(c(t)||a(t))&&e||0;for(var n=t.constructor,u=-1,l="function"==typeof n&&n.prototype===t,f=Array(e),p=e>0;++u<e;)f[u]=u+"";for(var y in t)p&&r(y,e)||"constructor"==y&&(l||!s.call(t,y))||f.push(y);return f}var a=n(1),c=n(2),l=/^\d+$/,f=Object.prototype,s=f.hasOwnProperty,p=9007199254740991;t.exports=u},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();Object.defineProperty(e,"__esModule",{value:!0});var u=n(5),a=n(17),c=r(a),l=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o(this,t);var r=window;this.__id=Date.now(),this.element=e,this.player=null,this.playerElement=null,this.container=null,this.options=(0,c["default"])(t.defaults,n),this.appendContainer(this.element),this.appendYoutubeScript(),t.apiReady?this.onYouTubeIFrameAPIReady():r.onYouTubeIframeAPIReady||(r.onYouTubeIframeAPIReady=this.onYouTubeIFrameAPIReady.bind(this)),r.addEventListener("resize",this.resize.bind(this))}return i(t,[{key:"appendContainer",value:function(t){var e=document,n='<div\n        class="tubular-container"\n        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">\n          <div class="tubular-shield" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>\n          <div id="tubular-player-'+this.__id+'" style="position:absolute;"></div>\n      </div>',r=e.createElement("div");r.innerHTML=n,t.style.position="relative",t.insertBefore(r.firstChild,this.element.firstElementChild),this.container=t.querySelector(".tubular-container"),this.playerElement=t.querySelector(".tubular-player")}},{key:"appendYoutubeScript",value:function(){if(!window.YT){var t=document,e=t.createElement("script");e.src="https://www.youtube.com/iframe_api";var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}}},{key:"onYouTubeIFrameAPIReady",value:function(){t.apiReady=!0;var e=this.options,n=e.videoId,r=e.playerSettings;this.player=new YT.Player("tubular-player-"+this.__id,{width:0,height:0,videoId:n,playerVars:r,events:{onReady:this.onPlayerReady.bind(this),onStateChange:this.onPlayerStateChange.bind(this),onError:this.onPlayerError.bind(this)}}),this.playerElement=document.getElementById("tubular-player-"+this.__id),this.resize()}},{key:"onPlayerReady",value:function(t){var e=this.options.playerSettings,n=e.start,r=e.quality,o=e.volume;this.player.setVolume(o),this.player.setPlaybackQuality(r),this.player.seekTo(n),this.player.playVideo()}},{key:"onPlayerStateChange",value:function(t){var e=this.options.playerSettings,n=e.start,r=e.loop;0===t.data&&r&&this.player.seekTo(n)}},{key:"onPlayerError",value:function(t){if(t&&t.data)throw new Error("Error playing video: "+t.data)}},{key:"resize",value:function(t){var e=(0,u.getSize)(this.element),n=e.width,r=e.height,o=this.options.aspectRatio,i=void 0,a=void 0;r>n/o?(i=Math.ceil(r*o),a=r,this.playerElement.style.left=(n-i)/2+"px",this.playerElement.style.top=0):(a=Math.ceil(n/o),i=n,this.playerElement.style.left=0,this.playerElement.style.top=(r-a)/2+"px"),this.player.setSize(i,a),this.container.style.width=n+"px",this.container.style.height=r+"px"}}]),t}();l.defaults={aspectRatio:16/9,videoId:"RrR90DqGD4I",playerSettings:{volume:0,autohide:0,autoplay:1,color:"red",controls:0,disablekb:0,enablejsapi:1,fs:0,hl:null,iv_load_policy:3,loop:1,modestbranding:1,playsinline:0,rel:0,showinfo:0,start:0,end:0,quality:"hd720"}},l.apiReady=!1,e["default"]=l},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.getSize=function(t){var e=window,n=document,r=n.documentElement,o=document.body,i=void 0,u=void 0;return t===e?(i=Math.max(e.innerWidth,r.clientWidth,o.clientWidth),u=Math.max(e.innerHeight,r.clientHeight,o.clientHeight)):(i=t.offsetWidth,u=t.offsetHeight),{width:i,height:u}}},function(t,e){function n(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=t.length;++n<r&&e(t[n],n,t)!==!1;);return t}t.exports=n},function(t,e){function n(t,e,n){n||(n={});for(var r=-1,o=e.length;++r<o;){var i=e[r];n[i]=t[i]}return n}t.exports=n},function(t,e){function n(t){return function(e,n,o){for(var i=r(e),u=o(e),a=u.length,c=t?a:-1;t?c--:++c<a;){var l=u[c];if(n(i[l],l,i)===!1)break}return e}}function r(t){return o(t)?t:Object(t)}function o(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var i=n();t.exports=i},function(t,e){function n(t,e,n){if("function"!=typeof t)return r;if(void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 3:return function(n,r,o){return t.call(e,n,r,o)};case 4:return function(n,r,o,i){return t.call(e,n,r,o,i)};case 5:return function(n,r,o,i,u){return t.call(e,n,r,o,i,u)}}return function(){return t.apply(e,arguments)}}function r(t){return t}t.exports=n},function(t,e,n){function r(t){return u(function(e,n){var r=-1,u=null==e?0:n.length,a=u>2?n[u-2]:void 0,c=u>2?n[2]:void 0,l=u>1?n[u-1]:void 0;for("function"==typeof a?(a=o(a,l,5),u-=2):(a="function"==typeof l?l:void 0,u-=a?1:0),c&&i(n[0],n[1],c)&&(a=3>u?void 0:a,u=1);++r<u;){var f=n[r];f&&t(e,f,a)}return e})}var o=n(10),i=n(13),u=n(18);t.exports=r},function(t,e){function n(t){return!!t&&"object"==typeof t}function r(t,e){var n=null==t?void 0:t[e];return u(n)?n:void 0}function o(t){return i(t)&&p.call(t)==a}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function u(t){return null==t?!1:o(t)?y.test(f.call(t)):n(t)&&c.test(t)}var a="[object Function]",c=/^\[object .+?Constructor\]$/,l=Object.prototype,f=Function.prototype.toString,s=l.hasOwnProperty,p=l.toString,y=RegExp("^"+f.call(s).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t,e){function n(t){return function(e){return null==e?void 0:e[t]}}function r(t){return null!=t&&u(f(t))}function o(t,e){return t="number"==typeof t||c.test(t)?+t:-1,e=null==e?l:e,t>-1&&t%1==0&&e>t}function i(t,e,n){if(!a(n))return!1;var i=typeof e;if("number"==i?r(n)&&o(e,n.length):"string"==i&&e in n){var u=n[e];return t===t?t===u:u!==u}return!1}function u(t){return"number"==typeof t&&t>-1&&t%1==0&&l>=t}function a(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var c=/^\d+$/,l=9007199254740991,f=n("length");t.exports=i},function(t,e,n){function r(t){return!!t&&"object"==typeof t}function o(t,e){return u(t,e,c)}function i(t){var e;if(!r(t)||p.call(t)!=l||a(t)||!s.call(t,"constructor")&&(e=t.constructor,"function"==typeof e&&!(e instanceof e)))return!1;var n;return o(t,function(t,e){n=e}),void 0===n||s.call(t,n)}var u=n(9),a=n(1),c=n(3),l="[object Object]",f=Object.prototype,s=f.hasOwnProperty,p=f.toString;t.exports=i},function(t,e){function n(t){return!!t&&"object"==typeof t}function r(t){return"number"==typeof t&&t>-1&&t%1==0&&k>=t}function o(t){return n(t)&&r(t.length)&&!!I[R.call(t)]}var i="[object Arguments]",u="[object Array]",a="[object Boolean]",c="[object Date]",l="[object Error]",f="[object Function]",s="[object Map]",p="[object Number]",y="[object Object]",d="[object RegExp]",h="[object Set]",v="[object String]",b="[object WeakMap]",g="[object ArrayBuffer]",m="[object Float32Array]",j="[object Float64Array]",x="[object Int8Array]",w="[object Int16Array]",E="[object Int32Array]",A="[object Uint8Array]",O="[object Uint8ClampedArray]",P="[object Uint16Array]",S="[object Uint32Array]",I={};I[m]=I[j]=I[x]=I[w]=I[E]=I[A]=I[O]=I[P]=I[S]=!0,I[i]=I[u]=I[g]=I[a]=I[c]=I[l]=I[f]=I[s]=I[p]=I[y]=I[d]=I[h]=I[v]=I[b]=!1;var _=Object.prototype,R=_.toString,k=9007199254740991;t.exports=o},function(t,e,n){function r(t){return function(e){return null==e?void 0:e[t]}}function o(t){return null!=t&&u(g(t))}function i(t,e){return t="number"==typeof t||y.test(t)?+t:-1,e=null==e?b:e,t>-1&&t%1==0&&e>t}function u(t){return"number"==typeof t&&t>-1&&t%1==0&&b>=t}function a(t){for(var e=l(t),n=e.length,r=n&&t.length,o=!!r&&u(r)&&(p(t)||s(t)),a=-1,c=[];++a<n;){var f=e[a];(o&&i(f,r)||h.call(t,f))&&c.push(f)}return c}function c(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function l(t){if(null==t)return[];c(t)||(t=Object(t));var e=t.length;e=e&&u(e)&&(p(t)||s(t))&&e||0;for(var n=t.constructor,r=-1,o="function"==typeof n&&n.prototype===t,a=Array(e),l=e>0;++r<e;)a[r]=r+"";for(var f in t)l&&i(f,e)||"constructor"==f&&(o||!h.call(t,f))||a.push(f);return a}var f=n(12),s=n(1),p=n(2),y=/^\d+$/,d=Object.prototype,h=d.hasOwnProperty,v=f(Object,"keys"),b=9007199254740991,g=r("length"),m=v?function(t){var e=null==t?void 0:t.constructor;return"function"==typeof e&&e.prototype===t||"function"!=typeof t&&o(t)?a(t):c(t)?v(t):[]}:a;t.exports=m},function(t,e,n){function r(t){return!!t&&"object"==typeof t}function o(t,e,n,u,c){if(!l(t))return t;var f=a(e)&&(d(e)||v(e)),p=f?void 0:b(e);return s(p||e,function(a,l){if(p&&(l=a,a=e[l]),r(a))u||(u=[]),c||(c=[]),i(t,e,l,o,n,u,c);else{var s=t[l],y=n?n(s,a,l,t,e):void 0,d=void 0===y;d&&(y=a),void 0===y&&(!f||l in t)||!d&&(y===y?y===s:s!==s)||(t[l]=y)}}),t}function i(t,e,n,r,o,i,u){for(var c=i.length,l=e[n];c--;)if(i[c]==l)return void(t[n]=u[c]);var s=t[n],p=o?o(s,l,n,t,e):void 0,b=void 0===p;b&&(p=l,a(l)&&(d(l)||v(l))?p=d(s)?s:a(s)?f(s):[]:h(l)||y(l)?p=y(s)?g(s):h(s)?s:{}:b=!1),i.push(l),u.push(p),b?t[n]=r(p,l,o,i,u):(p===p?p!==s:s===s)&&(t[n]=p)}function u(t){return function(e){return null==e?void 0:e[t]}}function a(t){return null!=t&&c(j(t))}function c(t){return"number"==typeof t&&t>-1&&t%1==0&&m>=t}function l(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var f=n(6),s=n(7),p=n(11),y=n(1),d=n(2),h=n(14),v=n(15),b=n(16),g=n(19),m=9007199254740991,j=u("length"),x=p(o);t.exports=x},function(t,e){function n(t,e){if("function"!=typeof t)throw new TypeError(r);return e=o(void 0===e?t.length-1:+e||0,0),function(){for(var n=arguments,r=-1,i=o(n.length-e,0),u=Array(i);++r<i;)u[r]=n[e+r];switch(e){case 0:return t.call(this,u);case 1:return t.call(this,n[0],u);case 2:return t.call(this,n[0],n[1],u)}var a=Array(e+1);for(r=-1;++r<e;)a[r]=n[r];return a[e]=u,t.apply(this,a)}}var r="Expected a function",o=Math.max;t.exports=n},function(t,e,n){function r(t){return o(t,i(t))}var o=n(8),i=n(3);t.exports=r}])});