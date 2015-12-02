!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=p.p+""+e+"."+g+".hot-update.js",t.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var t=new XMLHttpRequest,n=p.p+""+g+".hot-update.json";t.open("GET",n,!0),t.timeout=1e4,t.send(null)}catch(r){return e(r)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)e(new Error("Manifest request to "+n+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)e(new Error("Manifest request to "+n+" failed."));else{try{var r=JSON.parse(t.responseText)}catch(o){return void e(o)}e(null,r)}}}function r(e){var t=S[e];if(!t)return p;var n=function(n){return t.hot.active?S[n]?(S[n].parents.indexOf(e)<0&&S[n].parents.push(e),t.children.indexOf(n)<0&&t.children.push(n)):j=[e]:j=[],p(n)};for(var r in p)Object.prototype.hasOwnProperty.call(p,r)&&(n[r]=p[r]);return n.e=function(e,t){"ready"===x&&i("prepare"),_++,p.e(e,function(){function r(){_--,"prepare"===x&&(E[e]||l(e),0===_&&0===O&&f())}try{t.call(null,n)}finally{r()}})},n}function o(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if("undefined"==typeof e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n;else t._acceptedDependencies[e]=n},decline:function(e){if("undefined"==typeof e)t._selfDeclined=!0;else if("number"==typeof e)t._declinedDependencies[e]=!0;else for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:a,apply:s,status:function(e){return e?void w.push(e):x},addStatusHandler:function(e){w.push(e)},removeStatusHandler:function(e){var t=w.indexOf(e);t>=0&&w.splice(t,1)},data:m[e]};return t}function i(e){x=e;for(var t=0;t<w.length;t++)w[t].call(null,e)}function u(e){var t=+e+""===e;return t?+e:e}function a(e,t){if("idle"!==x)throw new Error("check() is only allowed in idle status");"function"==typeof e?(b=!1,t=e):(b=e,t=t||function(e){if(e)throw e}),i("check"),n(function(e,n){if(e)return t(e);if(!n)return i("idle"),void t(null,null);A={},P={},E={};for(var r=0;r<n.c.length;r++)P[n.c[r]]=!0;v=n.h,i("prepare"),y=t,h={};var o=0;l(o),"prepare"===x&&0===_&&0===O&&f()})}function c(e,t){if(P[e]&&A[e]){A[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0===--O&&0===_&&f()}}function l(e){P[e]?(A[e]=!0,O++,t(e)):E[e]=!0}function f(){i("ready");var e=y;if(y=null,e)if(b)s(b,e);else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(u(n));e(null,t)}}function s(t,n){function r(e){for(var t=[e],n={},r=t.slice();r.length>0;){var i=r.pop(),e=S[i];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+i);if(0===i)return;for(var u=0;u<e.parents.length;u++){var a=e.parents[u],c=S[a];if(c.hot._declinedDependencies[i])return new Error("Aborted because of declined dependency: "+i+" in "+a);t.indexOf(a)>=0||(c.hot._acceptedDependencies[i]?(n[a]||(n[a]=[]),o(n[a],[i])):(delete n[a],t.push(a),r.push(a)))}}}return[t,n]}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==x)throw new Error("apply() is only allowed in ready status");"function"==typeof t?(n=t,t={}):t&&"object"==typeof t?n=n||function(e){if(e)throw e}:(t={},n=n||function(e){if(e)throw e});var a={},c=[],l={};for(var f in h)if(Object.prototype.hasOwnProperty.call(h,f)){var s=u(f),d=r(s);if(!d){if(t.ignoreUnaccepted)continue;return i("abort"),n(new Error("Aborted because "+s+" is not accepted"))}if(d instanceof Error)return i("abort"),n(d);l[s]=h[s],o(c,d[0]);for(var s in d[1])Object.prototype.hasOwnProperty.call(d[1],s)&&(a[s]||(a[s]=[]),o(a[s],d[1][s]))}for(var y=[],b=0;b<c.length;b++){var s=c[b];S[s]&&S[s].hot._selfAccepted&&y.push({module:s,errorHandler:S[s].hot._selfAccepted})}i("dispose");for(var w=c.slice();w.length>0;){var s=w.pop(),O=S[s];if(O){for(var _={},E=O.hot._disposeHandlers,A=0;A<E.length;A++){var P=E[A];P(_)}m[s]=_,O.hot.active=!1,delete S[s];for(var A=0;A<O.children.length;A++){var k=S[O.children[A]];if(k){var H=k.parents.indexOf(s);H>=0&&k.parents.splice(H,1)}}}}for(var s in a)if(Object.prototype.hasOwnProperty.call(a,s))for(var O=S[s],R=a[s],A=0;A<R.length;A++){var I=R[A],H=O.children.indexOf(I);H>=0&&O.children.splice(H,1)}i("apply"),g=v;for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);var D=null;for(var s in a)if(Object.prototype.hasOwnProperty.call(a,s)){for(var O=S[s],R=a[s],T=[],b=0;b<R.length;b++){var I=R[b],P=O.hot._acceptedDependencies[I];T.indexOf(P)>=0||T.push(P)}for(var b=0;b<T.length;b++){var P=T[b];try{P(a)}catch(M){D||(D=M)}}}for(var b=0;b<y.length;b++){var $=y[b],s=$.module;j=[s];try{p(s)}catch(M){if("function"==typeof $.errorHandler)try{$.errorHandler(M)}catch(M){D||(D=M)}else D||(D=M)}}return D?(i("fail"),n(D)):(i("idle"),void n(null,c))}function p(t){if(S[t])return S[t].exports;var n=S[t]={exports:{},id:t,loaded:!1,hot:o(t),parents:j,children:[]};return e[t].call(n.exports,n,n.exports,r(t)),n.loaded=!0,n.exports}var d=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){c(e,t),d&&d(e,t)};var y,h,v,b=!0,g="8893a598103fe04d2485",m={},j=[],w=[],x="idle",O=0,_=0,E={},A={},P={},S={};return p.m=e,p.c=S,p.p="",p.h=function(){return g},r(0)(0)}([function(e,t,n){e.exports=n(5)},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e){return function(t){return null==t?void 0:t[e]}}function o(e){return null!=e&&i(s(e))}function i(e){return"number"==typeof e&&e>-1&&e%1==0&&f>=e}function u(e){return n(e)&&o(e)&&c.call(e,"callee")&&!l.call(e,"callee")}var a=Object.prototype,c=a.hasOwnProperty,l=a.propertyIsEnumerable,f=9007199254740991,s=r("length");e.exports=u},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e,t){var n=null==e?void 0:e[t];return a(n)?n:void 0}function o(e){return"number"==typeof e&&e>-1&&e%1==0&&b>=e}function i(e){return u(e)&&y.call(e)==l}function u(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function a(e){return null==e?!1:i(e)?h.test(p.call(e)):n(e)&&f.test(e)}var c="[object Array]",l="[object Function]",f=/^\[object .+?Constructor\]$/,s=Object.prototype,p=Function.prototype.toString,d=s.hasOwnProperty,y=s.toString,h=RegExp("^"+p.call(d).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),v=r(Array,"isArray"),b=9007199254740991,g=v||function(e){return n(e)&&o(e.length)&&y.call(e)==c};e.exports=g},function(e,t,n){function r(e,t){return e="number"==typeof e||l.test(e)?+e:-1,t=null==t?p:t,e>-1&&e%1==0&&t>e}function o(e){return"number"==typeof e&&e>-1&&e%1==0&&p>=e}function i(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function u(e){if(null==e)return[];i(e)||(e=Object(e));var t=e.length;t=t&&o(t)&&(c(e)||a(e))&&t||0;for(var n=e.constructor,u=-1,l="function"==typeof n&&n.prototype===e,f=Array(t),p=t>0;++u<t;)f[u]=u+"";for(var d in e)p&&r(d,t)||"constructor"==d&&(l||!s.call(e,d))||f.push(d);return f}var a=n(1),c=n(2),l=/^\d+$/,f=Object.prototype,s=f.hasOwnProperty,p=9007199254740991;e.exports=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=n(6),a=n(18),c=r(a),l=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o(this,e);var r=window;this.__id=Date.now(),this.element=t,this.player=null,this.playerElement=null,this.container=null,this.options=(0,c["default"])(e.defaults,n),this.appendContainer(this.element),this.appendYoutubeScript(),e.apiReady?this.onYouTubeIFrameAPIReady():r.onYouTubeIframeAPIReady||(r.onYouTubeIframeAPIReady=this.onYouTubeIFrameAPIReady.bind(this)),r.addEventListener("resize",this.resize.bind(this))}return i(e,[{key:"appendContainer",value:function(e){var t=document,n='<div\n        class="tubular-container"\n        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">\n          <div class="tubular-shield" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>\n          <div id="tubular-player-'+this.__id+'" style="position:absolute;"></div>\n      </div>',r=t.createElement("div");r.innerHTML=n,e.style.position="relative",e.insertBefore(r.firstChild,this.element.firstElementChild),this.container=e.querySelector(".tubular-container"),this.playerElement=e.querySelector(".tubular-player")}},{key:"appendYoutubeScript",value:function(){if(!window.YT){var e=document,t=e.createElement("script");t.src="https://www.youtube.com/iframe_api";var n=e.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}}},{key:"onYouTubeIFrameAPIReady",value:function(){e.apiReady=!0;var t=this.options,n=t.videoId,r=t.playerSettings;this.player=new YT.Player("tubular-player-"+this.__id,{width:0,height:0,videoId:n,playerVars:r,events:{onReady:this.onPlayerReady.bind(this),onStateChange:this.onPlayerStateChange.bind(this),onError:this.onPlayerError.bind(this)}}),this.playerElement=document.getElementById("tubular-player-"+this.__id),this.resize()}},{key:"onPlayerReady",value:function(e){var t=this.options.playerSettings,n=t.start,r=t.quality,o=t.volume;this.player.setVolume(o),this.player.setPlaybackQuality(r),this.player.seekTo(n),this.player.playVideo()}},{key:"onPlayerStateChange",value:function(e){var t=this.options.playerSettings,n=t.start,r=t.loop;0===e.data&&r&&this.player.seekTo(n)}},{key:"onPlayerError",value:function(e){if(e&&e.data)throw new Error("Error playing video: "+e.data)}},{key:"resize",value:function(e){var t=(0,u.getSize)(this.element),n=t.width,r=t.height,o=this.options.aspectRatio,i=void 0,a=void 0;r>n/o?(i=Math.ceil(r*o),a=r,this.playerElement.style.left=(n-i)/2+"px",this.playerElement.style.top=0):(a=Math.ceil(n/o),i=n,this.playerElement.style.left=0,this.playerElement.style.top=(r-a)/2+"px"),this.player.setSize(i,a),this.container.style.width=n+"px",this.container.style.height=r+"px"}}]),e}();l.defaults={aspectRatio:16/9,videoId:"RrR90DqGD4I",playerSettings:{volume:0,autohide:0,autoplay:1,color:"red",controls:0,disablekb:0,enablejsapi:1,fs:0,hl:null,iv_load_policy:3,loop:1,modestbranding:1,playsinline:0,rel:0,showinfo:0,start:0,end:0,quality:"hd720"}},l.apiReady=!1,t["default"]=l},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.BackTube=void 0;var o=n(4),i=r(o);t.BackTube=i["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getSize=function(e){var t=window,n=document,r=n.documentElement,o=document.body,i=void 0,u=void 0;return e===t?(i=Math.max(t.innerWidth,r.clientWidth,o.clientWidth),u=Math.max(t.innerHeight,r.clientHeight,o.clientHeight)):(i=e.offsetWidth,u=e.offsetHeight),{width:i,height:u}}},function(e,t){function n(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=e.length;++n<r&&t(e[n],n,e)!==!1;);return e}e.exports=n},function(e,t){function n(e,t,n){n||(n={});for(var r=-1,o=t.length;++r<o;){var i=t[r];n[i]=e[i]}return n}e.exports=n},function(e,t){function n(e){return function(t,n,o){for(var i=r(t),u=o(t),a=u.length,c=e?a:-1;e?c--:++c<a;){var l=u[c];if(n(i[l],l,i)===!1)break}return t}}function r(e){return o(e)?e:Object(e)}function o(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var i=n();e.exports=i},function(e,t){function n(e,t,n){if("function"!=typeof e)return r;if(void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)};case 5:return function(n,r,o,i,u){return e.call(t,n,r,o,i,u)}}return function(){return e.apply(t,arguments)}}function r(e){return e}e.exports=n},function(e,t,n){function r(e){return u(function(t,n){var r=-1,u=null==t?0:n.length,a=u>2?n[u-2]:void 0,c=u>2?n[2]:void 0,l=u>1?n[u-1]:void 0;for("function"==typeof a?(a=o(a,l,5),u-=2):(a="function"==typeof l?l:void 0,u-=a?1:0),c&&i(n[0],n[1],c)&&(a=3>u?void 0:a,u=1);++r<u;){var f=n[r];f&&e(t,f,a)}return t})}var o=n(11),i=n(14),u=n(19);e.exports=r},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e,t){var n=null==e?void 0:e[t];return u(n)?n:void 0}function o(e){return i(e)&&p.call(e)==a}function i(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function u(e){return null==e?!1:o(e)?d.test(f.call(e)):n(e)&&c.test(e)}var a="[object Function]",c=/^\[object .+?Constructor\]$/,l=Object.prototype,f=Function.prototype.toString,s=l.hasOwnProperty,p=l.toString,d=RegExp("^"+f.call(s).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},function(e,t){function n(e){return function(t){return null==t?void 0:t[e]}}function r(e){return null!=e&&u(f(e))}function o(e,t){return e="number"==typeof e||c.test(e)?+e:-1,t=null==t?l:t,e>-1&&e%1==0&&t>e}function i(e,t,n){if(!a(n))return!1;var i=typeof t;if("number"==i?r(n)&&o(t,n.length):"string"==i&&t in n){var u=n[t];return e===e?e===u:u!==u}return!1}function u(e){return"number"==typeof e&&e>-1&&e%1==0&&l>=e}function a(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var c=/^\d+$/,l=9007199254740991,f=n("length");e.exports=i},function(e,t,n){function r(e){return!!e&&"object"==typeof e}function o(e,t){return u(e,t,c)}function i(e){var t;if(!r(e)||p.call(e)!=l||a(e)||!s.call(e,"constructor")&&(t=e.constructor,"function"==typeof t&&!(t instanceof t)))return!1;var n;return o(e,function(e,t){n=t}),void 0===n||s.call(e,n)}var u=n(10),a=n(1),c=n(3),l="[object Object]",f=Object.prototype,s=f.hasOwnProperty,p=f.toString;e.exports=i},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e){return"number"==typeof e&&e>-1&&e%1==0&&R>=e}function o(e){return n(e)&&r(e.length)&&!!S[H.call(e)]}var i="[object Arguments]",u="[object Array]",a="[object Boolean]",c="[object Date]",l="[object Error]",f="[object Function]",s="[object Map]",p="[object Number]",d="[object Object]",y="[object RegExp]",h="[object Set]",v="[object String]",b="[object WeakMap]",g="[object ArrayBuffer]",m="[object Float32Array]",j="[object Float64Array]",w="[object Int8Array]",x="[object Int16Array]",O="[object Int32Array]",_="[object Uint8Array]",E="[object Uint8ClampedArray]",A="[object Uint16Array]",P="[object Uint32Array]",S={};S[m]=S[j]=S[w]=S[x]=S[O]=S[_]=S[E]=S[A]=S[P]=!0,S[i]=S[u]=S[g]=S[a]=S[c]=S[l]=S[f]=S[s]=S[p]=S[d]=S[y]=S[h]=S[v]=S[b]=!1;var k=Object.prototype,H=k.toString,R=9007199254740991;e.exports=o},function(e,t,n){function r(e){return function(t){return null==t?void 0:t[e]}}function o(e){return null!=e&&u(g(e))}function i(e,t){return e="number"==typeof e||d.test(e)?+e:-1,t=null==t?b:t,e>-1&&e%1==0&&t>e}function u(e){return"number"==typeof e&&e>-1&&e%1==0&&b>=e}function a(e){for(var t=l(e),n=t.length,r=n&&e.length,o=!!r&&u(r)&&(p(e)||s(e)),a=-1,c=[];++a<n;){var f=t[a];(o&&i(f,r)||h.call(e,f))&&c.push(f)}return c}function c(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function l(e){if(null==e)return[];c(e)||(e=Object(e));var t=e.length;t=t&&u(t)&&(p(e)||s(e))&&t||0;for(var n=e.constructor,r=-1,o="function"==typeof n&&n.prototype===e,a=Array(t),l=t>0;++r<t;)a[r]=r+"";for(var f in e)l&&i(f,t)||"constructor"==f&&(o||!h.call(e,f))||a.push(f);return a}var f=n(13),s=n(1),p=n(2),d=/^\d+$/,y=Object.prototype,h=y.hasOwnProperty,v=f(Object,"keys"),b=9007199254740991,g=r("length"),m=v?function(e){var t=null==e?void 0:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&o(e)?a(e):c(e)?v(e):[]}:a;e.exports=m},function(e,t,n){function r(e){return!!e&&"object"==typeof e}function o(e,t,n,u,c){if(!l(e))return e;var f=a(t)&&(y(t)||v(t)),p=f?void 0:b(t);return s(p||t,function(a,l){if(p&&(l=a,a=t[l]),r(a))u||(u=[]),c||(c=[]),i(e,t,l,o,n,u,c);else{var s=e[l],d=n?n(s,a,l,e,t):void 0,y=void 0===d;y&&(d=a),void 0===d&&(!f||l in e)||!y&&(d===d?d===s:s!==s)||(e[l]=d)}}),e}function i(e,t,n,r,o,i,u){for(var c=i.length,l=t[n];c--;)if(i[c]==l)return void(e[n]=u[c]);var s=e[n],p=o?o(s,l,n,e,t):void 0,b=void 0===p;b&&(p=l,a(l)&&(y(l)||v(l))?p=y(s)?s:a(s)?f(s):[]:h(l)||d(l)?p=d(s)?g(s):h(s)?s:{}:b=!1),i.push(l),u.push(p),b?e[n]=r(p,l,o,i,u):(p===p?p!==s:s===s)&&(e[n]=p)}function u(e){return function(t){return null==t?void 0:t[e]}}function a(e){return null!=e&&c(j(e))}function c(e){return"number"==typeof e&&e>-1&&e%1==0&&m>=e}function l(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var f=n(7),s=n(8),p=n(12),d=n(1),y=n(2),h=n(15),v=n(16),b=n(17),g=n(20),m=9007199254740991,j=u("length"),w=p(o);e.exports=w},function(e,t){function n(e,t){if("function"!=typeof e)throw new TypeError(r);return t=o(void 0===t?e.length-1:+t||0,0),function(){for(var n=arguments,r=-1,i=o(n.length-t,0),u=Array(i);++r<i;)u[r]=n[t+r];switch(t){case 0:return e.call(this,u);case 1:return e.call(this,n[0],u);case 2:return e.call(this,n[0],n[1],u)}var a=Array(t+1);for(r=-1;++r<t;)a[r]=n[r];return a[t]=u,e.apply(this,a)}}var r="Expected a function",o=Math.max;e.exports=n},function(e,t,n){function r(e){return o(e,i(e))}var o=n(9),i=n(3);e.exports=r}])});