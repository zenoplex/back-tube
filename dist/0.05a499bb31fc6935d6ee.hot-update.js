webpackHotUpdateBackTube(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(2);
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _platform = __webpack_require__(20);
	
	var _platform2 = _interopRequireDefault(_platform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log(_platform2.default);
	
	var BackTube = (function () {
	
	  /**
	   * constructor
	   *
	   * @param element
	   * @param options
	   */
	
	  function BackTube() {
	    var element = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, BackTube);
	
	    var win = window;
	
	    this.__id = Date.now();
	    this.element = element;
	    this.player = null;
	    this.playerElement = null;
	    this.container = null;
	    this.options = (0, _lodash2.default)(BackTube.defaults, options);
	
	    var _options = this.options;
	    var videoId = _options.videoId;
	    var cover = _options.cover;
	
	    this.appendContainer(this.element);
	    this.appendYoutubeScript();
	    this.setCoverColor(cover);
	
	    if (/iOS/.test(_platform2.default.os)) {
	      var img = document.createElement('img');
	      img.src = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
	      this.playerElement.appendChild(img);
	    } else {
	      // if API is ready then fire up player
	      if (BackTube.apiReady) {
	        this.onYouTubeIFrameAPIReady();
	      } else if (!win.onYouTubeIframeAPIReady) {
	        win.onYouTubeIframeAPIReady = this.onYouTubeIFrameAPIReady.bind(this);
	      }
	    }
	    // add window resize event
	    win.addEventListener('resize', this.resize.bind(this));
	  }
	
	  /**
	   * append youtube iframe
	   */
	
	  // flag for YoutubeAPI ready
	
	  _createClass(BackTube, [{
	    key: 'appendContainer',
	    value: function appendContainer(element) {
	      var doc = document;
	      var container = '<div\n        class="backtube-container"\n        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">\n          <div class="backtube-cover" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>\n          <div id="backtube-player-' + this.__id + '" style="position:absolute;"></div>\n      </div>';
	      var div = doc.createElement('div');
	      div.innerHTML = container;
	
	      element.style.position = 'relative';
	      element.insertBefore(div.firstChild, this.element.firstElementChild);
	
	      this.container = element.querySelector('.backtube-container');
	      this.playerElement = element.querySelector('#backtube-player-' + this.__id);
	      this.cover = element.querySelector('.backtube-cover');
	    }
	
	    /**
	     * append Youtube Iframe API
	     */
	
	  }, {
	    key: 'appendYoutubeScript',
	    value: function appendYoutubeScript() {
	      if (!window.YT) {
	        var doc = document;
	        var tag = doc.createElement('script');
	        tag.src = 'https://www.youtube.com/iframe_api';
	        var firstScriptTag = doc.getElementsByTagName('script')[0];
	        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	      }
	    }
	
	    /**
	     * YouTubeIFrameAPIReady handler
	     */
	
	  }, {
	    key: 'onYouTubeIFrameAPIReady',
	    value: function onYouTubeIFrameAPIReady() {
	      // set ready flag
	      BackTube.apiReady = true;
	
	      var _options2 = this.options;
	      var videoId = _options2.videoId;
	      var playerSettings = _options2.playerSettings;
	
	      this.player = new YT.Player('backtube-player-' + this.__id, {
	        width: 0, // width will auto fit to element
	        height: 0, // height will auto fit to element
	        videoId: videoId,
	        playerVars: playerSettings,
	        events: {
	          onReady: this.onPlayerReady.bind(this),
	          onStateChange: this.onPlayerStateChange.bind(this),
	          onError: this.onPlayerError.bind(this)
	        }
	      });
	
	      // playerElement reference must be set after onYouTubeIFrameAPIReady
	      this.playerElement = document.getElementById('backtube-player-' + this.__id);
	      this.resize();
	    }
	
	    /**
	     * Player ready handler
	     *
	     * @param {*} [e]
	     */
	
	  }, {
	    key: 'onPlayerReady',
	    value: function onPlayerReady(e) {
	      var _options$playerSettin = this.options.playerSettings;
	      var start = _options$playerSettin.start;
	      var quality = _options$playerSettin.quality;
	      var volume = _options$playerSettin.volume;
	
	      this.player.setVolume(volume);
	      this.player.setPlaybackQuality(quality);
	      this.player.seekTo(start);
	      this.player.playVideo();
	    }
	
	    /**
	     * state change event handler
	     *
	     * @param {*} state
	     */
	
	  }, {
	    key: 'onPlayerStateChange',
	    value: function onPlayerStateChange(state) {
	      var _options$playerSettin2 = this.options.playerSettings;
	      var start = _options$playerSettin2.start;
	      var loop = _options$playerSettin2.loop;
	
	      // If loop then player will seek to start position and loop
	      // Standard loop option will not work as intend.
	      // https://developers.google.com/youtube/player_parameters#loop
	
	      if (state.data === 0 && loop) {
	        this.player.seekTo(start);
	      }
	    }
	
	    /**
	     * Player error handler
	     *
	     * @param {*} e
	     */
	
	  }, {
	    key: 'onPlayerError',
	    value: function onPlayerError(e) {
	      if (e && e.data) {
	        throw new Error('Error playing video: ' + e.data);
	      }
	    }
	
	    /**
	     * resize player
	     *
	     * @param {event} [e]
	     */
	
	  }, {
	    key: 'resize',
	    value: function resize(e) {
	      var _getSize = (0, _utils.getSize)(this.element);
	
	      var width = _getSize.width;
	      var height = _getSize.height;
	      var aspectRatio = this.options.aspectRatio;
	
	      var w = undefined;
	      var h = undefined;
	
	      if (width / aspectRatio < height) {
	        w = Math.ceil(height * aspectRatio);
	        h = height;
	        this.playerElement.style.left = (width - w) / 2 + 'px';
	        this.playerElement.style.top = 0;
	      } else {
	        h = Math.ceil(width / aspectRatio);
	        w = width;
	
	        this.playerElement.style.left = 0;
	        this.playerElement.style.top = (height - h) / 2 + 'px';
	      }
	      // update player size
	      if (this.player) {
	        this.player.setSize(w, h);
	      } else {
	        this.playerElement.style.width = w + 'px';
	        this.playerElement.style.height = h + 'px';
	      }
	      // update container size
	      this.container.style.width = width + 'px';
	      this.container.style.height = height + 'px';
	    }
	
	    /**
	     * update cover color
	     *
	     * @param {string} color  css color
	     */
	
	  }, {
	    key: 'setCoverColor',
	    value: function setCoverColor(color) {
	      this.cover.style.backgroundColor = color;
	    }
	  }]);
	
	  return BackTube;
	})();
	
	BackTube.defaults = {
	  aspectRatio: 16 / 9,
	  videoId: 'RrR90DqGD4I',
	
	  playerSettings: {
	    volume: 0, // 0 - 100
	    autohide: 0, // autohide controls
	    autoplay: 1, // autoplay on load
	    color: 'red', // red, white
	    controls: 0, // show control UI
	    disablekb: 0, // enable/disable keyboard control
	    enablejsapi: 1,
	    fs: 0, // display fullscreen button
	    hl: null, // interface language
	    iv_load_policy: 3,
	    loop: 1, // loop video flag (doesn't work properly)
	    modestbranding: 1, // show/hide youtube logo
	    playsinline: 0,
	    rel: 0, // shows relative videos
	    showinfo: 0,
	    start: 0, // set beginning of the video
	    end: 0, // set end of the video
	    quality: 'hd720' // small, medium, large, hd720, hd1080, highres or default
	  },
	  cover: 'rgba(0,0,0, .5)'
	};
	BackTube.apiReady = false;
	exports.default = BackTube;

/***/ }
])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsUUFBTyxDQUFDLEdBQUcsb0JBQVUsQ0FBQzs7S0FFRCxRQUFROzs7Ozs7Ozs7QUFzQzNCLFlBdENtQixRQUFRLEdBc0N3QjtTQUF2QyxPQUFPLHlEQUFHLFFBQVEsQ0FBQyxJQUFJO1NBQUUsT0FBTyx5REFBRyxFQUFFOzsyQkF0QzlCLFFBQVE7O0FBdUN6QixTQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7O0FBRW5CLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBRXRCLElBQUksQ0FBQyxPQUFPO1NBQS9CLE9BQU8sWUFBUCxPQUFPO1NBQUUsS0FBSyxZQUFMLEtBQUs7O0FBRXRCLFNBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLFNBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLFNBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRzFCLFNBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBUyxFQUFFLENBQUMsRUFBRTtBQUMzQixXQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFVBQUcsQ0FBQyxHQUFHLG1DQUFpQyxPQUFPLHVCQUFvQixDQUFDO0FBQ3BFLFdBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3JDLE1BQU07O0FBRUwsV0FBSSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3JCLGFBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRTtBQUN2QyxZQUFHLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RTtNQUNGOztBQUVELFFBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RDs7Ozs7OztBQUFBO2dCQXJFa0IsUUFBUTs7cUNBMEVYLE9BQU8sRUFBRTtBQUN2QixXQUFNLEdBQUcsR0FBRyxRQUFRLENBQUM7QUFDckIsV0FBTSxTQUFTLGlTQUlrQixJQUFJLENBQUMsSUFBSSxzREFDakMsQ0FBQztBQUNWLFdBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsVUFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTFCLGNBQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUNwQyxjQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVyRSxXQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM5RCxXQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLHVCQUFxQixJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDNUUsV0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDdkQ7Ozs7Ozs7OzJDQUtxQjtBQUNwQixXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtBQUNkLGFBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNyQixhQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLFlBQUcsQ0FBQyxHQUFHLEdBQUcsb0NBQW9DLENBQUM7QUFDL0MsYUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdELHVCQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0Q7TUFDRjs7Ozs7Ozs7K0NBS3lCOztBQUV4QixlQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs7dUJBS2IsSUFBSSxDQUFDLE9BQU87V0FGaEIsT0FBTyxhQUFQLE9BQU87V0FDUCxjQUFjLGFBQWQsY0FBYzs7QUFHdEIsV0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLHNCQUFvQixJQUFJLENBQUMsSUFBSSxFQUFJO0FBQzFELGNBQUssRUFBTyxDQUFDO0FBQ2IsZUFBTSxFQUFNLENBQUM7QUFDRCxnQkFBTyxFQUFQLE9BQU87QUFDbkIsbUJBQVUsRUFBRSxjQUFjO0FBQzFCLGVBQU0sRUFBTTtBQUNWLGtCQUFPLEVBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQzVDLHdCQUFhLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbEQsa0JBQU8sRUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7VUFDN0M7UUFDRixDQUFDOzs7QUFJRixXQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLHNCQUFvQixJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDN0UsV0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO01BQ2Y7Ozs7Ozs7Ozs7bUNBT2EsQ0FBQyxFQUFFO21DQUNzQyxJQUFJLENBQUMsT0FBTyxDQUF6RCxjQUFjO1dBQUcsS0FBSyx5QkFBTCxLQUFLO1dBQUUsT0FBTyx5QkFBUCxPQUFPO1dBQUUsTUFBTSx5QkFBTixNQUFNOztBQUUvQyxXQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixXQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLFdBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLFdBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7TUFDekI7Ozs7Ozs7Ozs7eUNBT21CLEtBQUssRUFBRTtvQ0FDZSxJQUFJLENBQUMsT0FBTyxDQUE3QyxjQUFjO1dBQUcsS0FBSywwQkFBTCxLQUFLO1dBQUUsSUFBSSwwQkFBSixJQUFJOzs7Ozs7QUFLbkMsV0FBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDNUIsYUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0I7TUFDRjs7Ozs7Ozs7OzttQ0FPYSxDQUFDLEVBQUU7QUFDZixXQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ2YsZUFBTSxJQUFJLEtBQUssMkJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUcsQ0FBQztRQUNuRDtNQUNGOzs7Ozs7Ozs7OzRCQU9NLENBQUMsRUFBRTtzQkFDZ0IsV0E3THBCLE9BQU8sRUE2THFCLElBQUksQ0FBQyxPQUFPLENBQUM7O1dBQXRDLEtBQUssWUFBTCxLQUFLO1dBQUUsTUFBTSxZQUFOLE1BQU07V0FDYixXQUFXLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBM0IsV0FBVzs7QUFDbEIsV0FBSSxDQUFDLGFBQUM7QUFDTixXQUFJLENBQUMsYUFBQzs7QUFFTixXQUFJLEtBQUssR0FBRyxXQUFXLEdBQUcsTUFBTSxFQUFFO0FBQ2hDLFVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQztBQUNwQyxVQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ1gsYUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQUksQ0FBQztBQUN2RCxhQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLE1BQU07QUFDTCxVQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUM7QUFDbkMsVUFBQyxHQUFHLEtBQUssQ0FBQzs7QUFFVixhQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLGFBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFJLENBQUM7UUFDeEQ7O0FBRUQsV0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2QsYUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU07QUFDTCxhQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQU0sQ0FBQyxPQUFJLENBQUM7QUFDMUMsYUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFNLENBQUMsT0FBSSxDQUFDO1FBQzVDOztBQUVELFdBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBTSxLQUFLLE9BQUksQ0FBQztBQUMxQyxXQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sTUFBTSxPQUFJLENBQUM7TUFDN0M7Ozs7Ozs7Ozs7bUNBT2EsS0FBSyxFQUFFO0FBQ25CLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7TUFDMUM7OztVQTVOa0IsUUFBUTs7O0FBQVIsU0FBUSxDQUVwQixRQUFRLEdBQUc7QUFDaEIsY0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDO0FBQ25CLFVBQU8sRUFBTSxhQUFhOztBQUUxQixpQkFBYyxFQUFFO0FBQ2QsV0FBTSxFQUFVLENBQUM7QUFDakIsYUFBUSxFQUFRLENBQUM7QUFDakIsYUFBUSxFQUFRLENBQUM7QUFDakIsVUFBSyxFQUFXLEtBQUs7QUFDckIsYUFBUSxFQUFRLENBQUM7QUFDakIsY0FBUyxFQUFPLENBQUM7QUFDakIsZ0JBQVcsRUFBSyxDQUFDO0FBQ2pCLE9BQUUsRUFBYyxDQUFDO0FBQ2pCLE9BQUUsRUFBYyxJQUFJO0FBQ3BCLG1CQUFjLEVBQUUsQ0FBQztBQUNqQixTQUFJLEVBQVksQ0FBQztBQUNqQixtQkFBYyxFQUFFLENBQUM7QUFDakIsZ0JBQVcsRUFBSyxDQUFDO0FBQ2pCLFFBQUcsRUFBYSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLFVBQUssRUFBVyxDQUFDO0FBQ2pCLFFBQUcsRUFBYSxDQUFDO0FBQ2pCLFlBQU8sRUFBUyxPQUFPO0FBQUEsSUFDeEI7QUFDRCxRQUFLLEVBQVcsaUJBQWlCO0VBQ2xDO0FBM0JrQixTQUFRLENBOEJwQixRQUFRLEdBQUcsS0FBSzttQkE5QkosUUFBUSxDIiwiZmlsZSI6IjAuMDVhNDk5YmIzMWZjNjkzNWQ2ZWUuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0U2l6ZX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICdwbGF0Zm9ybSc7XG5cbmNvbnNvbGUubG9nKHBsYXRmb3JtKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja1R1YmUge1xuXG4gIHN0YXRpYyBkZWZhdWx0cyA9IHtcbiAgICBhc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgIHZpZGVvSWQ6ICAgICAnUnJSOTBEcUdENEknLFxuXG4gICAgcGxheWVyU2V0dGluZ3M6IHtcbiAgICAgIHZvbHVtZTogICAgICAgICAwLCAvLyAwIC0gMTAwXG4gICAgICBhdXRvaGlkZTogICAgICAgMCwgLy8gYXV0b2hpZGUgY29udHJvbHNcbiAgICAgIGF1dG9wbGF5OiAgICAgICAxLCAvLyBhdXRvcGxheSBvbiBsb2FkXG4gICAgICBjb2xvcjogICAgICAgICAgJ3JlZCcsIC8vIHJlZCwgd2hpdGVcbiAgICAgIGNvbnRyb2xzOiAgICAgICAwLCAvLyBzaG93IGNvbnRyb2wgVUlcbiAgICAgIGRpc2FibGVrYjogICAgICAwLCAvLyBlbmFibGUvZGlzYWJsZSBrZXlib2FyZCBjb250cm9sXG4gICAgICBlbmFibGVqc2FwaTogICAgMSxcbiAgICAgIGZzOiAgICAgICAgICAgICAwLCAvLyBkaXNwbGF5IGZ1bGxzY3JlZW4gYnV0dG9uXG4gICAgICBobDogICAgICAgICAgICAgbnVsbCwgLy8gaW50ZXJmYWNlIGxhbmd1YWdlXG4gICAgICBpdl9sb2FkX3BvbGljeTogMyxcbiAgICAgIGxvb3A6ICAgICAgICAgICAxLCAvLyBsb29wIHZpZGVvIGZsYWcgKGRvZXNuJ3Qgd29yayBwcm9wZXJseSlcbiAgICAgIG1vZGVzdGJyYW5kaW5nOiAxLCAvLyBzaG93L2hpZGUgeW91dHViZSBsb2dvXG4gICAgICBwbGF5c2lubGluZTogICAgMCxcbiAgICAgIHJlbDogICAgICAgICAgICAwLCAvLyBzaG93cyByZWxhdGl2ZSB2aWRlb3NcbiAgICAgIHNob3dpbmZvOiAgICAgICAwLFxuICAgICAgc3RhcnQ6ICAgICAgICAgIDAsIC8vIHNldCBiZWdpbm5pbmcgb2YgdGhlIHZpZGVvXG4gICAgICBlbmQ6ICAgICAgICAgICAgMCwgLy8gc2V0IGVuZCBvZiB0aGUgdmlkZW9cbiAgICAgIHF1YWxpdHk6ICAgICAgICAnaGQ3MjAnIC8vIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCBoZDcyMCwgaGQxMDgwLCBoaWdocmVzIG9yIGRlZmF1bHRcbiAgICB9LFxuICAgIGNvdmVyOiAgICAgICAgICAncmdiYSgwLDAsMCwgLjUpJ1xuICB9O1xuXG4gIC8vIGZsYWcgZm9yIFlvdXR1YmVBUEkgcmVhZHlcbiAgc3RhdGljIGFwaVJlYWR5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgd2luID0gd2luZG93O1xuXG4gICAgdGhpcy5fX2lkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZShCYWNrVHViZS5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCB7IHZpZGVvSWQsIGNvdmVyIH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICB0aGlzLmFwcGVuZENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuYXBwZW5kWW91dHViZVNjcmlwdCgpO1xuICAgIHRoaXMuc2V0Q292ZXJDb2xvcihjb3Zlcik7XG5cblxuICAgIGlmICgvaU9TLy50ZXN0KHBsYXRmb3JtLm9zKSkge1xuICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBpbWcuc3JjID0gYGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7dmlkZW9JZH0vbWF4cmVzZGVmYXVsdC5qcGdgO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LmFwcGVuZENoaWxkKGltZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIEFQSSBpcyByZWFkeSB0aGVuIGZpcmUgdXAgcGxheWVyXG4gICAgICBpZiAoQmFja1R1YmUuYXBpUmVhZHkpIHtcbiAgICAgICAgdGhpcy5vbllvdVR1YmVJRnJhbWVBUElSZWFkeSgpO1xuICAgICAgfSBlbHNlIGlmICghd2luLm9uWW91VHViZUlmcmFtZUFQSVJlYWR5KSB7XG4gICAgICAgIHdpbi5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IHRoaXMub25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkuYmluZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIHlvdXR1YmUgaWZyYW1lXG4gICAqL1xuICBhcHBlbmRDb250YWluZXIoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYmFja3R1YmUtY29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDowOyBsZWZ0OjA7IG92ZXJmbG93OmhpZGRlbjsgei1pbmRleDowXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2t0dWJlLWNvdmVyXCIgc3R5bGU9XCJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgcG9zaXRpb246YWJzb2x1dGU7IHotaW5kZXg6MTsgbGVmdDowOyB0b3A6MDtcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGlkPVwiYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gY29udGFpbmVyO1xuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LmZpcnN0Q2hpbGQsIHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2t0dWJlLWNvbnRhaW5lcicpO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgI2JhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLmNvdmVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja3R1YmUtY292ZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgWW91dHViZSBJZnJhbWUgQVBJXG4gICAqL1xuICBhcHBlbmRZb3V0dWJlU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93LllUKSB7XG4gICAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICAgIGNvbnN0IHRhZyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICBjb25zdCBmaXJzdFNjcmlwdFRhZyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWW91VHViZUlGcmFtZUFQSVJlYWR5IGhhbmRsZXJcbiAgICovXG4gIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5KCkge1xuICAgIC8vIHNldCByZWFkeSBmbGFnXG4gICAgQmFja1R1YmUuYXBpUmVhZHkgPSB0cnVlO1xuXG4gICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9JZCxcbiAgICAgICAgICAgIHBsYXllclNldHRpbmdzXG4gICAgICAgICAgICB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGBiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCwge1xuICAgICAgd2lkdGg6ICAgICAgMCwgLy8gd2lkdGggd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICBoZWlnaHQ6ICAgICAwLCAvLyBoZWlnaHQgd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICAgICAgICAgICAgICB2aWRlb0lkLFxuICAgICAgcGxheWVyVmFyczogcGxheWVyU2V0dGluZ3MsXG4gICAgICBldmVudHM6ICAgICB7XG4gICAgICAgIG9uUmVhZHk6ICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeS5iaW5kKHRoaXMpLFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgb25FcnJvcjogICAgICAgdGhpcy5vblBsYXllckVycm9yLmJpbmQodGhpcylcbiAgICAgIH1cbiAgICB9KVxuICAgIDtcblxuICAgIC8vIHBsYXllckVsZW1lbnQgcmVmZXJlbmNlIG11c3QgYmUgc2V0IGFmdGVyIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXllciByZWFkeSBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gW2VdXG4gICAqL1xuICBvblBsYXllclJlYWR5KGUpIHtcbiAgICBjb25zdCB7IHBsYXllclNldHRpbmdzOiB7c3RhcnQsIHF1YWxpdHksIHZvbHVtZX0gfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMucGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIHRoaXMucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShxdWFsaXR5KTtcbiAgICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXRlIGNoYW5nZSBldmVudCBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAgICovXG4gIG9uUGxheWVyU3RhdGVDaGFuZ2Uoc3RhdGUpIHtcbiAgICBjb25zdCB7cGxheWVyU2V0dGluZ3M6IHtzdGFydCwgbG9vcH19ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgLy8gSWYgbG9vcCB0aGVuIHBsYXllciB3aWxsIHNlZWsgdG8gc3RhcnQgcG9zaXRpb24gYW5kIGxvb3BcbiAgICAvLyBTdGFuZGFyZCBsb29wIG9wdGlvbiB3aWxsIG5vdCB3b3JrIGFzIGludGVuZC5cbiAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL3BsYXllcl9wYXJhbWV0ZXJzI2xvb3BcbiAgICBpZiAoc3RhdGUuZGF0YSA9PT0gMCAmJiBsb29wKSB7XG4gICAgICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5ZXIgZXJyb3IgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IGVcbiAgICovXG4gIG9uUGxheWVyRXJyb3IoZSkge1xuICAgIGlmIChlICYmIGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwbGF5aW5nIHZpZGVvOiAke2UuZGF0YX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVzaXplIHBsYXllclxuICAgKlxuICAgKiBAcGFyYW0ge2V2ZW50fSBbZV1cbiAgICovXG4gIHJlc2l6ZShlKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gZ2V0U2l6ZSh0aGlzLmVsZW1lbnQpO1xuICAgIGNvbnN0IHthc3BlY3RSYXRpb30gPSB0aGlzLm9wdGlvbnM7XG4gICAgbGV0IHc7XG4gICAgbGV0IGg7XG5cbiAgICBpZiAod2lkdGggLyBhc3BlY3RSYXRpbyA8IGhlaWdodCkge1xuICAgICAgdyA9IE1hdGguY2VpbChoZWlnaHQgKiBhc3BlY3RSYXRpbyk7XG4gICAgICBoID0gaGVpZ2h0O1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHsod2lkdGggLSB3KSAvIDJ9cHhgO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaCA9IE1hdGguY2VpbCh3aWR0aCAvIGFzcGVjdFJhdGlvKTtcbiAgICAgIHcgPSB3aWR0aDtcblxuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAkeyhoZWlnaHQgLSBoKSAvIDJ9cHhgO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgcGxheWVyIHNpemVcbiAgICBpZih0aGlzLnBsYXllcikge1xuICAgICAgdGhpcy5wbGF5ZXIuc2V0U2l6ZSh3LCBoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7d31weGA7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aH1weGA7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSBjb250YWluZXIgc2l6ZVxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGNvdmVyIGNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAgY3NzIGNvbG9yXG4gICAqL1xuICBzZXRDb3ZlckNvbG9yKGNvbG9yKSB7XG4gICAgdGhpcy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9CYWNrVHViZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=