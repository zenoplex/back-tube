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
	
	    if (!videoId) {
	      throw new Error('videoId');
	    }
	
	    this.appendContainer(this.element);
	    this.appendYoutubeScript();
	    this.setCoverColor(cover);
	
	    if (/iOS/.test(_platform2.default.os)) {
	      var img = document.createElement('img');
	      img.src = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
	      img.style.width = '100%';
	      img.style.height = '100%';
	      this.playerElement.appendChild(img);
	      this.resize();
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
	      this.playerElement.style.width = w + 'px';
	      this.playerElement.style.height = h + 'px';
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
	  videoId: null,
	
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
	    quality: 'default' // small, medium, large, hd720, hd1080, highres or default
	  },
	  cover: 'rgba(0,0,0, .4)'
	};
	BackTube.apiReady = false;
	exports.default = BackTube;

/***/ }
])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLFFBQVE7Ozs7Ozs7OztBQXNDM0IsWUF0Q21CLFFBQVEsR0FzQ3dCO1NBQXZDLE9BQU8seURBQUcsUUFBUSxDQUFDLElBQUk7U0FBRSxPQUFPLHlEQUFHLEVBQUU7OzJCQXRDOUIsUUFBUTs7QUF1Q3pCLFNBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFbkIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsU0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsU0FBSSxDQUFDLE9BQU8sR0FBRyxzQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztvQkFFdEIsSUFBSSxDQUFDLE9BQU87U0FBL0IsT0FBTyxZQUFQLE9BQU87U0FBRSxLQUFLLFlBQUwsS0FBSzs7QUFFdEIsU0FBRyxDQUFDLE9BQU8sRUFBRTtBQUFFLGFBQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQztNQUFFOztBQUU1QyxTQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxTQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUMzQixTQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUxQixTQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQVMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsV0FBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxVQUFHLENBQUMsR0FB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QUFFO0FBQ25CLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7TUFDMUM7OztVQTVOa0IsUUFBUTs7O0FBQVIsU0FBUSxDQUVwQixRQUFRLEdBQUc7QUFDaEIsY0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDO0FBQ25CLFVBQU8sRUFBTSxJQUFJOztBQUVqQixpQkFBYyxFQUFFO0FBQ2QsV0FBTSxFQUFVLENBQUM7QUFDakIsYUFBUSxFQUFRLENBQUM7QUFDakIsYUFBUSxFQUFRLENBQUM7QUFDakIsVUFBSyxFQUFXLEtBQUs7QUFDckIsYUFBUSxFQUFRLENBQUM7QUFDakIsY0FBUyxFQUFPLENBQUM7QUFDakIsZ0JBQVcsRUFBSyxDQUFDO0FBQ2pCLE9BQUUsRUFBYyxDQUFDO0FBQ2pCLE9BQUUsRUFBYyxJQUFJO0FBQ3BCLG1CQUFjLEVBQUUsQ0FBQztBQUNqQixTQUFJLEVBQVksQ0FBQztBQUNqQixtQkFBYyxFQUFFLENBQUM7QUFDakIsZ0JBQVcsRUFBSyxDQUFDO0FBQ2pCLFFBQUcsRUFBYSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLFVBQUssRUFBVyxDQUFDO0FBQ2pCLFFBQUcsRUFBYSxDQUFDO0FBQ2pCLFlBQU8sRUFBUyxTQUFTO0FBQUEsSUFDMUI7QUFDRCxRQUFLLEVBQUUsaUJBQWlCO0VBQ3pCO0FBM0JrQixTQUFRLENBOEJwQixRQUFRLEdBQUcsS0FBSzttQkE5QkosUUFBUSxDIiwiZmlsZSI6IjAuNjllOTI2M2VjZGU2YzUzNzhhMGEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0U2l6ZX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICdwbGF0Zm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tUdWJlIHtcblxuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgYXNwZWN0UmF0aW86IDE2IC8gOSxcbiAgICB2aWRlb0lkOiAgICAgbnVsbCxcblxuICAgIHBsYXllclNldHRpbmdzOiB7XG4gICAgICB2b2x1bWU6ICAgICAgICAgMCwgLy8gMCAtIDEwMFxuICAgICAgYXV0b2hpZGU6ICAgICAgIDAsIC8vIGF1dG9oaWRlIGNvbnRyb2xzXG4gICAgICBhdXRvcGxheTogICAgICAgMSwgLy8gYXV0b3BsYXkgb24gbG9hZFxuICAgICAgY29sb3I6ICAgICAgICAgICdyZWQnLCAvLyByZWQsIHdoaXRlXG4gICAgICBjb250cm9sczogICAgICAgMCwgLy8gc2hvdyBjb250cm9sIFVJXG4gICAgICBkaXNhYmxla2I6ICAgICAgMCwgLy8gZW5hYmxlL2Rpc2FibGUga2V5Ym9hcmQgY29udHJvbFxuICAgICAgZW5hYmxlanNhcGk6ICAgIDEsXG4gICAgICBmczogICAgICAgICAgICAgMCwgLy8gZGlzcGxheSBmdWxsc2NyZWVuIGJ1dHRvblxuICAgICAgaGw6ICAgICAgICAgICAgIG51bGwsIC8vIGludGVyZmFjZSBsYW5ndWFnZVxuICAgICAgaXZfbG9hZF9wb2xpY3k6IDMsXG4gICAgICBsb29wOiAgICAgICAgICAgMSwgLy8gbG9vcCB2aWRlbyBmbGFnIChkb2Vzbid0IHdvcmsgcHJvcGVybHkpXG4gICAgICBtb2Rlc3RicmFuZGluZzogMSwgLy8gc2hvdy9oaWRlIHlvdXR1YmUgbG9nb1xuICAgICAgcGxheXNpbmxpbmU6ICAgIDAsXG4gICAgICByZWw6ICAgICAgICAgICAgMCwgLy8gc2hvd3MgcmVsYXRpdmUgdmlkZW9zXG4gICAgICBzaG93aW5mbzogICAgICAgMCxcbiAgICAgIHN0YXJ0OiAgICAgICAgICAwLCAvLyBzZXQgYmVnaW5uaW5nIG9mIHRoZSB2aWRlb1xuICAgICAgZW5kOiAgICAgICAgICAgIDAsIC8vIHNldCBlbmQgb2YgdGhlIHZpZGVvXG4gICAgICBxdWFsaXR5OiAgICAgICAgJ2RlZmF1bHQnIC8vIHNtYWxsLCBtZWRpdW0sIGxhcmdlLCBoZDcyMCwgaGQxMDgwLCBoaWdocmVzIG9yIGRlZmF1bHRcbiAgICB9LFxuICAgIGNvdmVyOiAncmdiYSgwLDAsMCwgLjQpJ1xuICB9O1xuXG4gIC8vIGZsYWcgZm9yIFlvdXR1YmVBUEkgcmVhZHlcbiAgc3RhdGljIGFwaVJlYWR5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgd2luID0gd2luZG93O1xuXG4gICAgdGhpcy5fX2lkID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZShCYWNrVHViZS5kZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCB7IHZpZGVvSWQsIGNvdmVyIH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBpZighdmlkZW9JZCkgeyB0aHJvdyBuZXcgRXJyb3IoYHZpZGVvSWRgKTsgfVxuXG4gICAgdGhpcy5hcHBlbmRDb250YWluZXIodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmFwcGVuZFlvdXR1YmVTY3JpcHQoKTtcbiAgICB0aGlzLnNldENvdmVyQ29sb3IoY292ZXIpO1xuXG4gICAgaWYgKC9pT1MvLnRlc3QocGxhdGZvcm0ub3MpKSB7XG4gICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHt2aWRlb0lkfS9tYXhyZXNkZWZhdWx0LmpwZ2A7XG4gICAgICBpbWcuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBBUEkgaXMgcmVhZHkgdGhlbiBmaXJlIHVwIHBsYXllclxuICAgICAgaWYgKEJhY2tUdWJlLmFwaVJlYWR5KSB7XG4gICAgICAgIHRoaXMub25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdpbi5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSkge1xuICAgICAgICB3aW4ub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSB0aGlzLm9uWW91VHViZUlGcmFtZUFQSVJlYWR5LmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCB5b3V0dWJlIGlmcmFtZVxuICAgKi9cbiAgYXBwZW5kQ29udGFpbmVyKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICBjb25zdCBjb250YWluZXIgPSBgPGRpdlxuICAgICAgICBjbGFzcz1cImJhY2t0dWJlLWNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6MDsgbGVmdDowOyBvdmVyZmxvdzpoaWRkZW47IHotaW5kZXg6MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrdHViZS1jb3ZlclwiIHN0eWxlPVwid2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IHBvc2l0aW9uOmFic29sdXRlOyB6LWluZGV4OjE7IGxlZnQ6MDsgdG9wOjA7XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBpZD1cImJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1cIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO1wiPjwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICBjb25zdCBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGNvbnRhaW5lcjtcblxuICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRpdi5maXJzdENoaWxkLCB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrdHViZS1jb250YWluZXInKTtcbiAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCNiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCk7XG4gICAgdGhpcy5jb3ZlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2t0dWJlLWNvdmVyJyk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIFlvdXR1YmUgSWZyYW1lIEFQSVxuICAgKi9cbiAgYXBwZW5kWW91dHViZVNjcmlwdCgpIHtcbiAgICBpZiAoIXdpbmRvdy5ZVCkge1xuICAgICAgY29uc3QgZG9jID0gZG9jdW1lbnQ7XG4gICAgICBjb25zdCB0YWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFlvdVR1YmVJRnJhbWVBUElSZWFkeSBoYW5kbGVyXG4gICAqL1xuICBvbllvdVR1YmVJRnJhbWVBUElSZWFkeSgpIHtcbiAgICAvLyBzZXQgcmVhZHkgZmxhZ1xuICAgIEJhY2tUdWJlLmFwaVJlYWR5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZpZGVvSWQsXG4gICAgICAgICAgICBwbGF5ZXJTZXR0aW5nc1xuICAgICAgICAgICAgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMucGxheWVyID0gbmV3IFlULlBsYXllcihgYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfWAsIHtcbiAgICAgIHdpZHRoOiAgICAgIDAsIC8vIHdpZHRoIHdpbGwgYXV0byBmaXQgdG8gZWxlbWVudFxuICAgICAgaGVpZ2h0OiAgICAgMCwgLy8gaGVpZ2h0IHdpbGwgYXV0byBmaXQgdG8gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgdmlkZW9JZCxcbiAgICAgIHBsYXllclZhcnM6IHBsYXllclNldHRpbmdzLFxuICAgICAgZXZlbnRzOiAgICAge1xuICAgICAgICBvblJlYWR5OiAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkuYmluZCh0aGlzKSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogdGhpcy5vblBsYXllclN0YXRlQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIG9uRXJyb3I6ICAgICAgIHRoaXMub25QbGF5ZXJFcnJvci5iaW5kKHRoaXMpXG4gICAgICB9XG4gICAgfSlcbiAgICA7XG5cbiAgICAvLyBwbGF5ZXJFbGVtZW50IHJlZmVyZW5jZSBtdXN0IGJlIHNldCBhZnRlciBvbllvdVR1YmVJRnJhbWVBUElSZWFkeVxuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5ZXIgcmVhZHkgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IFtlXVxuICAgKi9cbiAgb25QbGF5ZXJSZWFkeShlKSB7XG4gICAgY29uc3QgeyBwbGF5ZXJTZXR0aW5nczoge3N0YXJ0LCBxdWFsaXR5LCB2b2x1bWV9IH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICB0aGlzLnBsYXllci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB0aGlzLnBsYXllci5zZXRQbGF5YmFja1F1YWxpdHkocXVhbGl0eSk7XG4gICAgdGhpcy5wbGF5ZXIuc2Vla1RvKHN0YXJ0KTtcbiAgICB0aGlzLnBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGF0ZSBjaGFuZ2UgZXZlbnQgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXRlXG4gICAqL1xuICBvblBsYXllclN0YXRlQ2hhbmdlKHN0YXRlKSB7XG4gICAgY29uc3Qge3BsYXllclNldHRpbmdzOiB7c3RhcnQsIGxvb3B9fSA9IHRoaXMub3B0aW9ucztcblxuICAgIC8vIElmIGxvb3AgdGhlbiBwbGF5ZXIgd2lsbCBzZWVrIHRvIHN0YXJ0IHBvc2l0aW9uIGFuZCBsb29wXG4gICAgLy8gU3RhbmRhcmQgbG9vcCBvcHRpb24gd2lsbCBub3Qgd29yayBhcyBpbnRlbmQuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9wbGF5ZXJfcGFyYW1ldGVycyNsb29wXG4gICAgaWYgKHN0YXRlLmRhdGEgPT09IDAgJiYgbG9vcCkge1xuICAgICAgdGhpcy5wbGF5ZXIuc2Vla1RvKHN0YXJ0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGxheWVyIGVycm9yIGhhbmRsZXJcbiAgICpcbiAgICogQHBhcmFtIHsqfSBlXG4gICAqL1xuICBvblBsYXllckVycm9yKGUpIHtcbiAgICBpZiAoZSAmJiBlLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgcGxheWluZyB2aWRlbzogJHtlLmRhdGF9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlc2l6ZSBwbGF5ZXJcbiAgICpcbiAgICogQHBhcmFtIHtldmVudH0gW2VdXG4gICAqL1xuICByZXNpemUoZSkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGdldFNpemUodGhpcy5lbGVtZW50KTtcbiAgICBjb25zdCB7YXNwZWN0UmF0aW99ID0gdGhpcy5vcHRpb25zO1xuICAgIGxldCB3O1xuICAgIGxldCBoO1xuXG4gICAgaWYgKHdpZHRoIC8gYXNwZWN0UmF0aW8gPCBoZWlnaHQpIHtcbiAgICAgIHcgPSBNYXRoLmNlaWwoaGVpZ2h0ICogYXNwZWN0UmF0aW8pO1xuICAgICAgaCA9IGhlaWdodDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7KHdpZHRoIC0gdykgLyAyfXB4YDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSBNYXRoLmNlaWwod2lkdGggLyBhc3BlY3RSYXRpbyk7XG4gICAgICB3ID0gd2lkdGg7XG5cbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHsoaGVpZ2h0IC0gaCkgLyAyfXB4YDtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHBsYXllciBzaXplXG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7d31weGA7XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2h9cHhgO1xuICAgIC8vIHVwZGF0ZSBjb250YWluZXIgc2l6ZVxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGNvdmVyIGNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAgY3NzIGNvbG9yXG4gICAqL1xuICBzZXRDb3ZlckNvbG9yKGNvbG9yKSB7XG4gICAgdGhpcy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQmFja1R1YmUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9