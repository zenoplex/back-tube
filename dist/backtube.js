!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BackTube=t():e.BackTube=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(4),i=r(o);e.exports=i["default"]},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e){return function(t){return null==t?void 0:t[e]}}function o(e){return null!=e&&i(p(e))}function i(e){return"number"==typeof e&&e>-1&&e%1==0&&s>=e}function a(e){return n(e)&&o(e)&&u.call(e,"callee")&&!c.call(e,"callee")}var l=Object.prototype,u=l.hasOwnProperty,c=l.propertyIsEnumerable,s=9007199254740991,p=r("length");e.exports=a},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e,t){var n=null==e?void 0:e[t];return l(n)?n:void 0}function o(e){return"number"==typeof e&&e>-1&&e%1==0&&v>=e}function i(e){return a(e)&&d.call(e)==c}function a(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function l(e){return null==e?!1:i(e)?h.test(f.call(e)):n(e)&&s.test(e)}var u="[object Array]",c="[object Function]",s=/^\[object .+?Constructor\]$/,p=Object.prototype,f=Function.prototype.toString,b=p.hasOwnProperty,d=p.toString,h=RegExp("^"+f.call(b).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),y=r(Array,"isArray"),v=9007199254740991,m=y||function(e){return n(e)&&o(e.length)&&d.call(e)==u};e.exports=m},function(e,t,n){function r(e,t){return e="number"==typeof e||c.test(e)?+e:-1,t=null==t?f:t,e>-1&&e%1==0&&t>e}function o(e){return"number"==typeof e&&e>-1&&e%1==0&&f>=e}function i(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function a(e){if(null==e)return[];i(e)||(e=Object(e));var t=e.length;t=t&&o(t)&&(u(e)||l(e))&&t||0;for(var n=e.constructor,a=-1,c="function"==typeof n&&n.prototype===e,s=Array(t),f=t>0;++a<t;)s[a]=a+"";for(var b in e)f&&r(b,t)||"constructor"==b&&(c||!p.call(e,b))||s.push(b);return s}var l=n(1),u=n(2),c=/^\d+$/,s=Object.prototype,p=s.hasOwnProperty,f=9007199254740991;e.exports=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),l=n(17),u=r(l),c=n(20),s=r(c),p=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?document.body:arguments[0],n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o(this,e);var r=window;this.__id=Date.now(),this.element=t,this.player=null,this.playerElement=null,this.container=null,this.options=(0,u["default"])(e.defaults,n);var i=this.options,a=i.videoId,l=i.cover;if(!a)throw new Error("videoId");if(this.appendContainer(this.element),this.appendYoutubeScript(),this.setCoverColor(l),/iOS/.test(s["default"].os)){var c=document.createElement("img");c.src="https://img.youtube.com/vi/"+a+"/maxresdefault.jpg",c.style.width="100%",c.style.height="100%",this.playerElement.appendChild(c),this.resize()}else e.apiReady?this.onYouTubeIFrameAPIReady():r.onYouTubeIframeAPIReady||(r.onYouTubeIframeAPIReady=this.onYouTubeIFrameAPIReady.bind(this));r.addEventListener("resize",this.resize.bind(this))}return i(e,[{key:"appendContainer",value:function(e){var t=document,n='<div\n        class="backtube-container"\n        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">\n          <div class="backtube-cover" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>\n          <div id="backtube-player-'+this.__id+'" style="position:absolute;"></div>\n      </div>',r=t.createElement("div");r.innerHTML=n,e.style.position="relative",e.insertBefore(r.firstChild,this.element.firstElementChild),this.container=e.querySelector(".backtube-container"),this.playerElement=e.querySelector("#backtube-player-"+this.__id),this.cover=e.querySelector(".backtube-cover")}},{key:"appendYoutubeScript",value:function(){if(!window.YT){var e=document,t=e.createElement("script");t.src="https://www.youtube.com/iframe_api";var n=e.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}}},{key:"onYouTubeIFrameAPIReady",value:function(){e.apiReady=!0;var t=this.options,n=t.videoId,r=t.playerSettings;this.player=new YT.Player("backtube-player-"+this.__id,{width:0,height:0,videoId:n,playerVars:r,events:{onReady:this.onPlayerReady.bind(this),onStateChange:this.onPlayerStateChange.bind(this),onError:this.onPlayerError.bind(this)}}),this.playerElement=document.getElementById("backtube-player-"+this.__id),this.resize()}},{key:"onPlayerReady",value:function(e){var t=this.options.playerSettings,n=t.start,r=t.quality,o=t.volume;this.player.setVolume(o),this.player.setPlaybackQuality(r),this.player.seekTo(n),this.player.playVideo()}},{key:"onPlayerStateChange",value:function(e){var t=this.options.playerSettings,n=t.start,r=t.loop;0===e.data&&r&&this.player.seekTo(n)}},{key:"onPlayerError",value:function(e){if(e&&e.data)throw new Error("Error playing video: "+e.data)}},{key:"resize",value:function(e){var t=(0,a.getSize)(this.element),n=t.width,r=t.height,o=this.options.aspectRatio,i=void 0,l=void 0;r>n/o?(i=Math.ceil(r*o),l=r,this.playerElement.style.left=(n-i)/2+"px",this.playerElement.style.top=0):(l=Math.ceil(n/o),i=n,this.playerElement.style.left=0,this.playerElement.style.top=(r-l)/2+"px"),this.playerElement.style.width=i+"px",this.playerElement.style.height=l+"px",this.container.style.width=n+"px",this.container.style.height=r+"px"}},{key:"setCoverColor",value:function(e){this.cover.style.backgroundColor=e}}]),e}();p.defaults={aspectRatio:16/9,videoId:null,playerSettings:{volume:0,autohide:0,autoplay:1,color:"red",controls:0,disablekb:0,enablejsapi:1,fs:0,hl:null,iv_load_policy:3,loop:1,modestbranding:1,playsinline:0,rel:0,showinfo:0,start:0,end:0,quality:"default"},cover:"rgba(0,0,0, .4)"},p.apiReady=!1,t["default"]=p},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getSize=function(e){var t=window,n=document,r=n.documentElement,o=document.body,i=void 0,a=void 0;return e===t?(i=Math.max(t.innerWidth,r.clientWidth,o.clientWidth),a=Math.max(t.innerHeight,r.clientHeight,o.clientHeight)):(i=e.offsetWidth,a=e.offsetHeight),{width:i,height:a}}},function(e,t){function n(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=e.length;++n<r&&t(e[n],n,e)!==!1;);return e}e.exports=n},function(e,t){function n(e,t,n){n||(n={});for(var r=-1,o=t.length;++r<o;){var i=t[r];n[i]=e[i]}return n}e.exports=n},function(e,t){function n(e){return function(t,n,o){for(var i=r(t),a=o(t),l=a.length,u=e?l:-1;e?u--:++u<l;){var c=a[u];if(n(i[c],c,i)===!1)break}return t}}function r(e){return o(e)?e:Object(e)}function o(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var i=n();e.exports=i},function(e,t){function n(e,t,n){if("function"!=typeof e)return r;if(void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)};case 5:return function(n,r,o,i,a){return e.call(t,n,r,o,i,a)}}return function(){return e.apply(t,arguments)}}function r(e){return e}e.exports=n},function(e,t,n){function r(e){return a(function(t,n){var r=-1,a=null==t?0:n.length,l=a>2?n[a-2]:void 0,u=a>2?n[2]:void 0,c=a>1?n[a-1]:void 0;for("function"==typeof l?(l=o(l,c,5),a-=2):(l="function"==typeof c?c:void 0,a-=l?1:0),u&&i(n[0],n[1],u)&&(l=3>a?void 0:l,a=1);++r<a;){var s=n[r];s&&e(t,s,l)}return t})}var o=n(10),i=n(13),a=n(18);e.exports=r},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e,t){var n=null==e?void 0:e[t];return a(n)?n:void 0}function o(e){return i(e)&&f.call(e)==l}function i(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function a(e){return null==e?!1:o(e)?b.test(s.call(e)):n(e)&&u.test(e)}var l="[object Function]",u=/^\[object .+?Constructor\]$/,c=Object.prototype,s=Function.prototype.toString,p=c.hasOwnProperty,f=c.toString,b=RegExp("^"+s.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},function(e,t){function n(e){return function(t){return null==t?void 0:t[e]}}function r(e){return null!=e&&a(s(e))}function o(e,t){return e="number"==typeof e||u.test(e)?+e:-1,t=null==t?c:t,e>-1&&e%1==0&&t>e}function i(e,t,n){if(!l(n))return!1;var i=typeof t;if("number"==i?r(n)&&o(t,n.length):"string"==i&&t in n){var a=n[t];return e===e?e===a:a!==a}return!1}function a(e){return"number"==typeof e&&e>-1&&e%1==0&&c>=e}function l(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var u=/^\d+$/,c=9007199254740991,s=n("length");e.exports=i},function(e,t,n){function r(e){return!!e&&"object"==typeof e}function o(e,t){return a(e,t,u)}function i(e){var t;if(!r(e)||f.call(e)!=c||l(e)||!p.call(e,"constructor")&&(t=e.constructor,"function"==typeof t&&!(t instanceof t)))return!1;var n;return o(e,function(e,t){n=t}),void 0===n||p.call(e,n)}var a=n(9),l=n(1),u=n(3),c="[object Object]",s=Object.prototype,p=s.hasOwnProperty,f=s.toString;e.exports=i},function(e,t){function n(e){return!!e&&"object"==typeof e}function r(e){return"number"==typeof e&&e>-1&&e%1==0&&C>=e}function o(e){return n(e)&&r(e.length)&&!!M[I.call(e)]}var i="[object Arguments]",a="[object Array]",l="[object Boolean]",u="[object Date]",c="[object Error]",s="[object Function]",p="[object Map]",f="[object Number]",b="[object Object]",d="[object RegExp]",h="[object Set]",y="[object String]",v="[object WeakMap]",m="[object ArrayBuffer]",g="[object Float32Array]",x="[object Float64Array]",S="[object Int8Array]",O="[object Int16Array]",w="[object Int32Array]",j="[object Uint8Array]",P="[object Uint8ClampedArray]",E="[object Uint16Array]",k="[object Uint32Array]",M={};M[g]=M[x]=M[S]=M[O]=M[w]=M[j]=M[P]=M[E]=M[k]=!0,M[i]=M[a]=M[m]=M[l]=M[u]=M[c]=M[s]=M[p]=M[f]=M[b]=M[d]=M[h]=M[y]=M[v]=!1;var A=Object.prototype,I=A.toString,C=9007199254740991;e.exports=o},function(e,t,n){function r(e){return function(t){return null==t?void 0:t[e]}}function o(e){return null!=e&&a(m(e))}function i(e,t){return e="number"==typeof e||b.test(e)?+e:-1,t=null==t?v:t,e>-1&&e%1==0&&t>e}function a(e){return"number"==typeof e&&e>-1&&e%1==0&&v>=e}function l(e){for(var t=c(e),n=t.length,r=n&&e.length,o=!!r&&a(r)&&(f(e)||p(e)),l=-1,u=[];++l<n;){var s=t[l];(o&&i(s,r)||h.call(e,s))&&u.push(s)}return u}function u(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function c(e){if(null==e)return[];u(e)||(e=Object(e));var t=e.length;t=t&&a(t)&&(f(e)||p(e))&&t||0;for(var n=e.constructor,r=-1,o="function"==typeof n&&n.prototype===e,l=Array(t),c=t>0;++r<t;)l[r]=r+"";for(var s in e)c&&i(s,t)||"constructor"==s&&(o||!h.call(e,s))||l.push(s);return l}var s=n(12),p=n(1),f=n(2),b=/^\d+$/,d=Object.prototype,h=d.hasOwnProperty,y=s(Object,"keys"),v=9007199254740991,m=r("length"),g=y?function(e){var t=null==e?void 0:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&o(e)?l(e):u(e)?y(e):[]}:l;e.exports=g},function(e,t,n){function r(e){return!!e&&"object"==typeof e}function o(e,t,n,a,u){if(!c(e))return e;var s=l(t)&&(d(t)||y(t)),f=s?void 0:v(t);return p(f||t,function(l,c){if(f&&(c=l,l=t[c]),r(l))a||(a=[]),u||(u=[]),i(e,t,c,o,n,a,u);else{var p=e[c],b=n?n(p,l,c,e,t):void 0,d=void 0===b;d&&(b=l),void 0===b&&(!s||c in e)||!d&&(b===b?b===p:p!==p)||(e[c]=b)}}),e}function i(e,t,n,r,o,i,a){for(var u=i.length,c=t[n];u--;)if(i[u]==c)return void(e[n]=a[u]);var p=e[n],f=o?o(p,c,n,e,t):void 0,v=void 0===f;v&&(f=c,l(c)&&(d(c)||y(c))?f=d(p)?p:l(p)?s(p):[]:h(c)||b(c)?f=b(p)?m(p):h(p)?p:{}:v=!1),i.push(c),a.push(f),v?e[n]=r(f,c,o,i,a):(f===f?f!==p:p===p)&&(e[n]=f)}function a(e){return function(t){return null==t?void 0:t[e]}}function l(e){return null!=e&&u(x(e))}function u(e){return"number"==typeof e&&e>-1&&e%1==0&&g>=e}function c(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var s=n(6),p=n(7),f=n(11),b=n(1),d=n(2),h=n(14),y=n(15),v=n(16),m=n(19),g=9007199254740991,x=a("length"),S=f(o);e.exports=S},function(e,t){function n(e,t){if("function"!=typeof e)throw new TypeError(r);return t=o(void 0===t?e.length-1:+t||0,0),function(){for(var n=arguments,r=-1,i=o(n.length-t,0),a=Array(i);++r<i;)a[r]=n[t+r];switch(t){case 0:return e.call(this,a);case 1:return e.call(this,n[0],a);case 2:return e.call(this,n[0],n[1],a)}var l=Array(t+1);for(r=-1;++r<t;)l[r]=n[r];return l[t]=a,e.apply(this,l)}}var r="Expected a function",o=Math.max;e.exports=n},function(e,t,n){function r(e){return o(e,i(e))}var o=n(8),i=n(3);e.exports=r},function(e,t,n){var r;(function(e,o){(function(){"use strict";function i(e){return e=String(e),e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,n){var r={6.4:"10",6.3:"8.1",6.2:"8",6.1:"Server 2008 R2 / 7","6.0":"Server 2008 / Vista",5.2:"Server 2003 / XP 64-bit",5.1:"XP",5.01:"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"};return t&&n&&/^Win/i.test(e)&&(r=r[/[\d.]+$/.exec(e)])&&(e="Windows "+r),e=String(e),t&&n&&(e=e.replace(RegExp(t,"i"),n)),e=u(e.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").split(" on ")[0])}function l(e,t){var n=-1,r=e?e.length:0;if("number"==typeof r&&r>-1&&O>=r)for(;++n<r;)t(e[n],n,e);else c(e,t)}function u(e){return e=d(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:i(e)}function c(e,t){for(var n in e)E.call(e,n)&&t(e[n],n,e)}function s(e){return null==e?i(e):k.call(e).slice(8,-1)}function p(e,t){var n=null!=e?typeof e[t]:"number";return!/^(?:boolean|number|string|undefined)$/.test(n)&&("object"==n?!!e[t]:!0)}function f(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function b(e,t){var n=null;return l(e,function(r,o){n=t(n,r,o,e)}),n}function d(e){return String(e).replace(/^ +| +$/g,"")}function h(e){function t(t){return b(t,function(t,n){return t||RegExp("\\b"+(n.pattern||f(n))+"\\b","i").exec(e)&&(n.label||n)})}function n(t){return b(t,function(t,n,r){return t||(n[Y]||n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(Y)]||RegExp("\\b"+f(r)+"(?:\\b|\\w*\\d)","i").exec(e))&&r})}function r(t){return b(t,function(t,n){return t||RegExp("\\b"+(n.pattern||f(n))+"\\b","i").exec(e)&&(n.label||n)})}function o(t){return b(t,function(t,n){var r=n.pattern||f(n);return!t&&(t=RegExp("\\b"+r+"(?:/[\\d.]+|[ \\w.]*)","i").exec(e))&&(t=a(t,r,n.label||n)),t})}function i(t){return b(t,function(t,n){var r=n.pattern||f(n);return!t&&(t=RegExp("\\b"+r+" *\\d+[.\\w_]*","i").exec(e)||RegExp("\\b"+r+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(e))&&((t=String(n.label&&!RegExp(r,"i").test(n.label)?n.label:t).split("/"))[1]&&!/[\d.]+/.test(t[0])&&(t[0]+=" "+t[1]),n=n.label||n,t=u(t[0].replace(RegExp(r,"i"),n).replace(RegExp("; *(?:"+n+"[_-])?","i")," ").replace(RegExp("("+n+")[-_.]?(\\w)","i"),"$1 $2"))),t})}function l(t){return b(t,function(t,n){return t||(RegExp(n+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(e)||0)[1]||null})}function y(){return this.description||""}var g=v,x=e&&"object"==typeof e&&"String"!=s(e);x&&(g=e,e=null);var S=g.navigator||{},O=S.userAgent||"";e||(e=O);var P,E,M=x||j==m,A=x?!!S.likeChrome:/\bChrome\b/.test(e)&&!/internal|\n/i.test(k.toString()),I="Object",C=x?I:"ScriptBridgingProxyObject",R=x?I:"Environment",B=x&&g.java?"JavaPackage":s(g.java),T=x?I:"RuntimeObject",W=/\bJava/.test(B)&&g.java,$=W&&s(g.environment)==R,F=W?"a":"α",_=W?"b":"β",G=g.document||{},z=g.operamini||g.opera,X=w.test(X=x&&z?z["[[Class]]"]:s(z))?X:z=null,N=e,K=[],V=null,H=e==O,L=H&&z&&"function"==typeof z.version&&z.version(),q=t(["Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"]),U=r(["Adobe AIR","Arora","Avant Browser","Breach","Camino","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel",{label:"SRWare Iron",pattern:"Iron"},"K-Meleon","Konqueror","Lunascape","Maxthon","Midori","Nook Browser","PhantomJS","Raven","Rekonq","RockMelt","SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser","Sunrise","Swiftfox","WebPositive","Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chrome",{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"]),Y=i([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nook","PlayBook","PlayStation 4","PlayStation 3","PlayStation Vita","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),D=n({Apple:{iPad:1,iPhone:1,iPod:1},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1},HP:{TouchPad:1},HTC:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{"PlayStation 4":1,"PlayStation 3":1,"PlayStation Vita":1}}),J=o(["Windows Phone ","Android","CentOS","Debian","Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "]);if(q&&(q=[q]),D&&!Y&&(Y=i([D])),(P=/\bGoogle TV\b/.exec(Y))&&(Y=P[0]),/\bSimulator\b/i.test(e)&&(Y=(Y?Y+" ":"")+"Simulator"),"Opera Mini"==U&&/\bOPiOS\b/.test(e)&&K.push("running in Turbo/Uncompressed mode"),/^iP/.test(Y)?(U||(U="Safari"),J="iOS"+((P=/ OS ([\d_]+)/i.exec(e))?" "+P[1].replace(/_/g,"."):"")):"Konqueror"!=U||/buntu/i.test(J)?D&&"Google"!=D&&(/Chrome/.test(U)&&!/\bMobile Safari\b/i.test(e)||/\bVita\b/.test(Y))?(U="Android Browser",J=/\bAndroid\b/.test(J)?J:"Android"):(!U||(P=!/\bMinefield\b|\(Android;/i.test(e)&&/\b(?:Firefox|Safari)\b/.exec(U)))&&(U&&!Y&&/[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(P+"/")+8))&&(U=null),(P=Y||D||J)&&(Y||D||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(J))&&(U=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(J)?J:P)+" Browser")):J="Kubuntu",(P=/\((Mobile|Tablet).*?Firefox\b/i.exec(e))&&P[1]&&(J="Firefox OS",Y||(Y=P[1])),L||(L=l(["(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))","Version",f(U),"(?:Firefox|Minefield|NetFront)"])),"iCab"==q&&parseFloat(L)>3?q=["WebKit"]:"Trident"!=q&&(P=/\bOpera\b/.test(U)&&(/\bOPR\b/.test(e)?"Blink":"Presto")||/\b(?:Midori|Nook|Safari)\b/i.test(e)&&"WebKit"||!q&&/\bMSIE\b/i.test(e)&&("Mac OS"==J?"Tasman":"Trident"))?q=[P]:/\bPlayStation\b(?! Vita\b)/i.test(U)&&"WebKit"==q&&(q=["NetFront"]),"IE"==U&&(P=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e)||0)[1])?(U+=" Mobile",J="Windows Phone "+(/\+$/.test(P)?P:P+".x"),K.unshift("desktop mode")):/\bWPDesktop\b/i.test(e)?(U="IE Mobile",J="Windows Phone 8+",K.unshift("desktop mode"),L||(L=(/\brv:([\d.]+)/.exec(e)||0)[1])):"IE"!=U&&"Trident"==q&&(P=/\brv:([\d.]+)/.exec(e))?(/\bWPDesktop\b/i.test(e)||(U&&K.push("identifying as "+U+(L?" "+L:"")),U="IE"),L=P[1]):"Chrome"!=U&&"IE"==U||!(P=/\bEdge\/([\d.]+)/.exec(e))||(U="IE",L=P[1],q=["Trident"],K.unshift("platform preview")),H){if(p(g,"global"))if(W&&(P=W.lang.System,N=P.getProperty("os.arch"),J=J||P.getProperty("os.name")+" "+P.getProperty("os.version")),M&&p(g,"system")&&(P=[g.system])[0]){J||(J=P[0].os||null);try{P[1]=g.require("ringo/engine").version,L=P[1].join("."),U="RingoJS"}catch(Z){P[0].global.system==g.system&&(U="Narwhal")}}else"object"==typeof g.process&&(P=g.process)?(U="Node.js",N=P.arch,J=P.platform,L=/[\d.]+/.exec(P.version)[0]):$&&(U="Rhino");else s(P=g.runtime)==C?(U="Adobe AIR",J=P.flash.system.Capabilities.os):s(P=g.phantom)==T?(U="PhantomJS",L=(P=P.version||null)&&P.major+"."+P.minor+"."+P.patch):"number"==typeof G.documentMode&&(P=/\bTrident\/(\d+)/i.exec(e))&&(L=[L,G.documentMode],(P=+P[1]+4)!=L[1]&&(K.push("IE "+L[1]+" mode"),q&&(q[1]=""),L[1]=P),L="IE"==U?String(L[1].toFixed(1)):L[0]);J=J&&u(J)}L&&(P=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(L)||/(?:alpha|beta)(?: ?\d)?/i.exec(e+";"+(H&&S.appMinorVersion))||/\bMinefield\b/i.test(e)&&"a")&&(V=/b/i.test(P)?"beta":"alpha",L=L.replace(RegExp(P+"\\+?$"),"")+("beta"==V?_:F)+(/\d+\+?/.exec(P)||"")),"Fennec"==U||"Firefox"==U&&/\b(?:Android|Firefox OS)\b/.test(J)?U="Firefox Mobile":"Maxthon"==U&&L?L=L.replace(/\.[\d.]+/,".x"):"Silk"==U?(/\bMobi/i.test(e)||(J="Android",K.unshift("desktop mode")),/Accelerated *= *true/i.test(e)&&K.unshift("accelerated")):/\bXbox\b/i.test(Y)?(J=null,"Xbox 360"==Y&&/\bIEMobile\b/.test(e)&&K.unshift("mobile mode")):!/^(?:Chrome|IE|Opera)$/.test(U)&&(!U||Y||/Browser|Mobi/.test(U))||"Windows CE"!=J&&!/Mobi/i.test(e)?"IE"==U&&H&&null===g.external?K.unshift("platform preview"):(/\bBlackBerry\b/.test(Y)||/\bBB10\b/.test(e))&&(P=(RegExp(Y.replace(/ +/g," *")+"/([.\\d]+)","i").exec(e)||0)[1]||L)?(P=[P,/BB10/.test(e)],J=(P[1]?(Y=null,D="BlackBerry"):"Device Software")+" "+P[0],L=null):this!=c&&"Wii"!=Y&&(H&&z||/Opera/.test(U)&&/\b(?:MSIE|Firefox)\b/i.test(e)||"Firefox"==U&&/\bOS X (?:\d+\.){2,}/.test(J)||"IE"==U&&(J&&!/^Win/.test(J)&&L>5.5||/\bWindows XP\b/.test(J)&&L>8||8==L&&!/\bTrident\b/.test(e)))&&!w.test(P=h.call(c,e.replace(w,"")+";"))&&P.name&&(P="ing as "+P.name+((P=P.version)?" "+P:""),w.test(U)?(/\bIE\b/.test(P)&&"Mac OS"==J&&(J=null),P="identify"+P):(P="mask"+P,U=X?u(X.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(P)&&(J=null),H||(L=null)),q=["Presto"],K.push(P)):U+=" Mobile",(P=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(e)||0)[1])&&(P=[parseFloat(P.replace(/\.(\d)$/,".0$1")),P],"Safari"==U&&"+"==P[1].slice(-1)?(U="WebKit Nightly",V="alpha",L=P[1].slice(0,-1)):(L==P[1]||L==(P[2]=(/\bSafari\/([\d.]+\+?)/i.exec(e)||0)[1]))&&(L=null),P[1]=(/\bChrome\/([\d.]+)/i.exec(e)||0)[1],537.36==P[0]&&537.36==P[2]&&parseFloat(P[1])>=28&&"IE"!=U&&(q=["Blink"]),H&&(A||P[1])?(q&&(q[1]="like Chrome"),P=P[1]||(P=P[0],530>P?1:532>P?2:532.05>P?3:533>P?4:534.03>P?5:534.07>P?6:534.1>P?7:534.13>P?8:534.16>P?9:534.24>P?10:534.3>P?11:535.01>P?12:535.02>P?"13+":535.07>P?15:535.11>P?16:535.19>P?17:536.05>P?18:536.1>P?19:537.01>P?20:537.11>P?"21+":537.13>P?23:537.18>P?24:537.24>P?25:537.36>P?26:"Blink"!=q?"27":"28")):(q&&(q[1]="like Safari"),P=P[0],P=400>P?1:500>P?2:526>P?3:533>P?4:534>P?"4+":535>P?5:537>P?6:538>P?7:601>P?8:"8"),q&&(q[1]+=" "+(P+="number"==typeof P?".x":/[.+]/.test(P)?"":"+")),"Safari"==U&&(!L||parseInt(L)>45)&&(L=P)),"Opera"==U&&(P=/\bzbov|zvav$/.exec(J))?(U+=" ",K.unshift("desktop mode"),"zvav"==P?(U+="Mini",L=null):U+="Mobile",J=J.replace(RegExp(" *"+P+"$"),"")):"Safari"==U&&/\bChrome\b/.exec(q&&q[1])&&(K.unshift("desktop mode"),U="Chrome Mobile",L=null,/\bOS X\b/.test(J)?(D="Apple",J="iOS 4.3+"):J=null),L&&0==L.indexOf(P=/[\d.]+$/.exec(J))&&e.indexOf("/"+P+"-")>-1&&(J=d(J.replace(P,""))),q&&!/\b(?:Avant|Nook)\b/.test(U)&&(/Browser|Lunascape|Maxthon/.test(U)||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(U)&&q[1])&&(P=q[q.length-1])&&K.push(P),K.length&&(K=["("+K.join("; ")+")"]),D&&Y&&Y.indexOf(D)<0&&K.push("on "+D),Y&&K.push((/^on /.test(K[K.length-1])?"":"on ")+Y),J&&(P=/ ([\d.+]+)$/.exec(J),E=P&&"/"==J.charAt(J.length-P[0].length-1),J={architecture:32,family:P&&!E?J.replace(P[0],""):J,version:P?P[1]:null,toString:function(){var e=this.version;return this.family+(e&&!E?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(P=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(N))&&!/\bi686\b/i.test(N)&&(J&&(J.architecture=64,J.family=J.family.replace(RegExp(" *"+P),"")),U&&(/\bWOW64\b/i.test(e)||H&&/\w(?:86|32)$/.test(S.cpuClass||S.platform)&&!/\bWin64; x64\b/i.test(e))&&K.unshift("32-bit")),e||(e=null);var Q={};return Q.description=e,Q.layout=q&&q[0],Q.manufacturer=D,Q.name=U,Q.prerelease=V,Q.product=Y,Q.ua=e,Q.version=U&&L,Q.os=J||{architecture:null,family:null,version:null,toString:function(){return"null"}},Q.parse=h,Q.toString=y,Q.version&&K.unshift(L),Q.name&&K.unshift(U),J&&U&&(J!=String(J).split(" ")[0]||J!=U.split(" ")[0]&&!Y)&&K.push(Y?"("+J+")":"on "+J),K.length&&(Q.description=K.join(" ")),Q}var y={"function":!0,object:!0},v=y[typeof window]&&window||this,m=v,g=y[typeof t]&&t,x=y[typeof e]&&e&&!e.nodeType&&e,S=g&&x&&"object"==typeof o&&o;!S||S.global!==S&&S.window!==S&&S.self!==S||(v=S);var O=Math.pow(2,53)-1,w=/\bOpera/,j=this,P=Object.prototype,E=P.hasOwnProperty,k=P.toString;r=function(){return h()}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}).call(this)}).call(t,n(21)(e),function(){return this}())},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});