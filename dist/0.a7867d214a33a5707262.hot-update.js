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
	      this.player.setSize(w, h);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsUUFBTyxDQUFDLEdBQUcsb0JBQVUsQ0FBQzs7S0FFRCxRQUFROzs7Ozs7Ozs7QUFzQzNCLFlBdENtQixRQUFRLEdBc0N3QjtTQUF2QyxPQUFPLHlEQUFHLFFBQVEsQ0FBQyxJQUFJO1NBQUUsT0FBTyx5REFBRyxFQUFFOzsyQkF0QzlCLFFBQVE7O0FBdUN6QixTQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7O0FBRW5CLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBRXRCLElBQUksQ0FBQyxPQUFPO1NBQS9CLE9BQU8sWUFBUCxPQUFPO1NBQUUsS0FBSyxZQUFMLEtBQUs7O0FBRXRCLFNBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLFNBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLFNBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRzFCLFNBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBUyxFQUFFLENBQUMsRUFBRTtBQUMzQixXQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFVBQUcsQ0FBQyxHQUFHLG1DQUFpQyxPQUFPLHVCQUFvQixDQUFDO0FBQ3BF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Q0FBQztBQUNqQixhQUFRLEVBQVEsQ0FBQztBQUNqQixVQUFLLEVBQVcsS0FBSztBQUNyQixhQUFRLEVBQVEsQ0FBQztBQUNqQixjQUFTLEVBQU8sQ0FBQztBQUNqQixnQkFBVyxFQUFLLENBQUM7QUFDakIsT0FBRSxFQUFjLENBQUM7QUFDakIsT0FBRSxFQUFjLElBQUk7QUFDcEIsbUJBQWMsRUFBRSxDQUFDO0FBQ2pCLFNBQUksRUFBWSxDQUFDO0FBQ2pCLG1CQUFjLEVBQUUsQ0FBQztBQUNqQixnQkFBVyxFQUFLLENBQUM7QUFDakIsUUFBRyxFQUFhLENBQUM7QUFDakIsYUFBUSxFQUFRLENBQUM7QUFDakIsVUFBSyxFQUFXLENBQUM7QUFDakIsUUFBRyxFQUFhLENBQUM7QUFDakIsWUFBTyxFQUFTLE9BQU87QUFBQSxJQUN4QjtBQUNELFFBQUssRUFBVyxpQkFBaUI7RUFDbEM7QUEzQmtCLFNBQVEsQ0E4QnBCLFFBQVEsR0FBRyxLQUFLO21CQTlCSixRQUFRLEMiLCJmaWxlIjoiMC5hNzg2N2QyMTRhMzNhNTcwNzI2Mi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRTaXplfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gubWVyZ2UnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJ3BsYXRmb3JtJztcblxuY29uc29sZS5sb2cocGxhdGZvcm0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrVHViZSB7XG5cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIGFzcGVjdFJhdGlvOiAxNiAvIDksXG4gICAgdmlkZW9JZDogICAgICdSclI5MERxR0Q0SScsXG5cbiAgICBwbGF5ZXJTZXR0aW5nczoge1xuICAgICAgdm9sdW1lOiAgICAgICAgIDAsIC8vIDAgLSAxMDBcbiAgICAgIGF1dG9oaWRlOiAgICAgICAwLCAvLyBhdXRvaGlkZSBjb250cm9sc1xuICAgICAgYXV0b3BsYXk6ICAgICAgIDEsIC8vIGF1dG9wbGF5IG9uIGxvYWRcbiAgICAgIGNvbG9yOiAgICAgICAgICAncmVkJywgLy8gcmVkLCB3aGl0ZVxuICAgICAgY29udHJvbHM6ICAgICAgIDAsIC8vIHNob3cgY29udHJvbCBVSVxuICAgICAgZGlzYWJsZWtiOiAgICAgIDAsIC8vIGVuYWJsZS9kaXNhYmxlIGtleWJvYXJkIGNvbnRyb2xcbiAgICAgIGVuYWJsZWpzYXBpOiAgICAxLFxuICAgICAgZnM6ICAgICAgICAgICAgIDAsIC8vIGRpc3BsYXkgZnVsbHNjcmVlbiBidXR0b25cbiAgICAgIGhsOiAgICAgICAgICAgICBudWxsLCAvLyBpbnRlcmZhY2UgbGFuZ3VhZ2VcbiAgICAgIGl2X2xvYWRfcG9saWN5OiAzLFxuICAgICAgbG9vcDogICAgICAgICAgIDEsIC8vIGxvb3AgdmlkZW8gZmxhZyAoZG9lc24ndCB3b3JrIHByb3Blcmx5KVxuICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsIC8vIHNob3cvaGlkZSB5b3V0dWJlIGxvZ29cbiAgICAgIHBsYXlzaW5saW5lOiAgICAwLFxuICAgICAgcmVsOiAgICAgICAgICAgIDAsIC8vIHNob3dzIHJlbGF0aXZlIHZpZGVvc1xuICAgICAgc2hvd2luZm86ICAgICAgIDAsXG4gICAgICBzdGFydDogICAgICAgICAgMCwgLy8gc2V0IGJlZ2lubmluZyBvZiB0aGUgdmlkZW9cbiAgICAgIGVuZDogICAgICAgICAgICAwLCAvLyBzZXQgZW5kIG9mIHRoZSB2aWRlb1xuICAgICAgcXVhbGl0eTogICAgICAgICdoZDcyMCcgLy8gc21hbGwsIG1lZGl1bSwgbGFyZ2UsIGhkNzIwLCBoZDEwODAsIGhpZ2hyZXMgb3IgZGVmYXVsdFxuICAgIH0sXG4gICAgY292ZXI6ICAgICAgICAgICdyZ2JhKDAsMCwwLCAuNSknXG4gIH07XG5cbiAgLy8gZmxhZyBmb3IgWW91dHViZUFQSSByZWFkeVxuICBzdGF0aWMgYXBpUmVhZHkgPSBmYWxzZTtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XG5cbiAgICB0aGlzLl9faWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlKEJhY2tUdWJlLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHsgdmlkZW9JZCwgY292ZXIgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5hcHBlbmRZb3V0dWJlU2NyaXB0KCk7XG4gICAgdGhpcy5zZXRDb3ZlckNvbG9yKGNvdmVyKTtcblxuXG4gICAgaWYgKC9pT1MvLnRlc3QocGxhdGZvcm0ub3MpKSB7XG4gICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGltZy5zcmMgPSBgaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHt2aWRlb0lkfS9tYXhyZXNkZWZhdWx0LmpwZ2A7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgQVBJIGlzIHJlYWR5IHRoZW4gZmlyZSB1cCBwbGF5ZXJcbiAgICAgIGlmIChCYWNrVHViZS5hcGlSZWFkeSkge1xuICAgICAgICB0aGlzLm9uWW91VHViZUlGcmFtZUFQSVJlYWR5KCk7XG4gICAgICB9IGVsc2UgaWYgKCF3aW4ub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkpIHtcbiAgICAgICAgd2luLm9uWW91VHViZUlmcmFtZUFQSVJlYWR5ID0gdGhpcy5vbllvdVR1YmVJRnJhbWVBUElSZWFkeS5iaW5kKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgd2luZG93IHJlc2l6ZSBldmVudFxuICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgeW91dHViZSBpZnJhbWVcbiAgICovXG4gIGFwcGVuZENvbnRhaW5lcihlbGVtZW50KSB7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY29udGFpbmVyID0gYDxkaXZcbiAgICAgICAgY2xhc3M9XCJiYWNrdHViZS1jb250YWluZXJcIlxuICAgICAgICBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOjA7IGxlZnQ6MDsgb3ZlcmZsb3c6aGlkZGVuOyB6LWluZGV4OjBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFja3R1YmUtY292ZXJcIiBzdHlsZT1cIndpZHRoOjEwMCU7IGhlaWdodDoxMDAlOyBwb3NpdGlvbjphYnNvbHV0ZTsgei1pbmRleDoxOyBsZWZ0OjA7IHRvcDowO1wiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgaWQ9XCJiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9XCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTtcIj48L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBjb250YWluZXI7XG5cbiAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShkaXYuZmlyc3RDaGlsZCwgdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIHRoaXMuY29udGFpbmVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja3R1YmUtY29udGFpbmVyJyk7XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfWApO1xuICAgIHRoaXMuY292ZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrdHViZS1jb3ZlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCBZb3V0dWJlIElmcmFtZSBBUElcbiAgICovXG4gIGFwcGVuZFlvdXR1YmVTY3JpcHQoKSB7XG4gICAgaWYgKCF3aW5kb3cuWVQpIHtcbiAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuICAgICAgY29uc3QgdGFnID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgdGFnLnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgICAgIGNvbnN0IGZpcnN0U2NyaXB0VGFnID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBZb3VUdWJlSUZyYW1lQVBJUmVhZHkgaGFuZGxlclxuICAgKi9cbiAgb25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkoKSB7XG4gICAgLy8gc2V0IHJlYWR5IGZsYWdcbiAgICBCYWNrVHViZS5hcGlSZWFkeSA9IHRydWU7XG5cbiAgICBjb25zdCB7XG4gICAgICAgICAgICB2aWRlb0lkLFxuICAgICAgICAgICAgcGxheWVyU2V0dGluZ3NcbiAgICAgICAgICAgIH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICB0aGlzLnBsYXllciA9IG5ldyBZVC5QbGF5ZXIoYGJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gLCB7XG4gICAgICB3aWR0aDogICAgICAwLCAvLyB3aWR0aCB3aWxsIGF1dG8gZml0IHRvIGVsZW1lbnRcbiAgICAgIGhlaWdodDogICAgIDAsIC8vIGhlaWdodCB3aWxsIGF1dG8gZml0IHRvIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgIHZpZGVvSWQsXG4gICAgICBwbGF5ZXJWYXJzOiBwbGF5ZXJTZXR0aW5ncyxcbiAgICAgIGV2ZW50czogICAgIHtcbiAgICAgICAgb25SZWFkeTogICAgICAgdGhpcy5vblBsYXllclJlYWR5LmJpbmQodGhpcyksXG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IHRoaXMub25QbGF5ZXJTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpLFxuICAgICAgICBvbkVycm9yOiAgICAgICB0aGlzLm9uUGxheWVyRXJyb3IuYmluZCh0aGlzKVxuICAgICAgfVxuICAgIH0pXG4gICAgO1xuXG4gICAgLy8gcGxheWVyRWxlbWVudCByZWZlcmVuY2UgbXVzdCBiZSBzZXQgYWZ0ZXIgb25Zb3VUdWJlSUZyYW1lQVBJUmVhZHlcbiAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfWApO1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogUGxheWVyIHJlYWR5IGhhbmRsZXJcbiAgICpcbiAgICogQHBhcmFtIHsqfSBbZV1cbiAgICovXG4gIG9uUGxheWVyUmVhZHkoZSkge1xuICAgIGNvbnN0IHsgcGxheWVyU2V0dGluZ3M6IHtzdGFydCwgcXVhbGl0eSwgdm9sdW1lfSB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdGhpcy5wbGF5ZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgdGhpcy5wbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5KHF1YWxpdHkpO1xuICAgIHRoaXMucGxheWVyLnNlZWtUbyhzdGFydCk7XG4gICAgdGhpcy5wbGF5ZXIucGxheVZpZGVvKCk7XG4gIH1cblxuICAvKipcbiAgICogc3RhdGUgY2hhbmdlIGV2ZW50IGhhbmRsZXJcbiAgICpcbiAgICogQHBhcmFtIHsqfSBzdGF0ZVxuICAgKi9cbiAgb25QbGF5ZXJTdGF0ZUNoYW5nZShzdGF0ZSkge1xuICAgIGNvbnN0IHtwbGF5ZXJTZXR0aW5nczoge3N0YXJ0LCBsb29wfX0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAvLyBJZiBsb29wIHRoZW4gcGxheWVyIHdpbGwgc2VlayB0byBzdGFydCBwb3NpdGlvbiBhbmQgbG9vcFxuICAgIC8vIFN0YW5kYXJkIGxvb3Agb3B0aW9uIHdpbGwgbm90IHdvcmsgYXMgaW50ZW5kLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvcGxheWVyX3BhcmFtZXRlcnMjbG9vcFxuICAgIGlmIChzdGF0ZS5kYXRhID09PSAwICYmIGxvb3ApIHtcbiAgICAgIHRoaXMucGxheWVyLnNlZWtUbyhzdGFydCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXllciBlcnJvciBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZVxuICAgKi9cbiAgb25QbGF5ZXJFcnJvcihlKSB7XG4gICAgaWYgKGUgJiYgZS5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHBsYXlpbmcgdmlkZW86ICR7ZS5kYXRhfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXNpemUgcGxheWVyXG4gICAqXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFtlXVxuICAgKi9cbiAgcmVzaXplKGUpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBnZXRTaXplKHRoaXMuZWxlbWVudCk7XG4gICAgY29uc3Qge2FzcGVjdFJhdGlvfSA9IHRoaXMub3B0aW9ucztcbiAgICBsZXQgdztcbiAgICBsZXQgaDtcblxuICAgIGlmICh3aWR0aCAvIGFzcGVjdFJhdGlvIDwgaGVpZ2h0KSB7XG4gICAgICB3ID0gTWF0aC5jZWlsKGhlaWdodCAqIGFzcGVjdFJhdGlvKTtcbiAgICAgIGggPSBoZWlnaHQ7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAkeyh3aWR0aCAtIHcpIC8gMn1weGA7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUudG9wID0gMDtcblxuICAgIH0gZWxzZSB7XG4gICAgICBoID0gTWF0aC5jZWlsKHdpZHRoIC8gYXNwZWN0UmF0aW8pO1xuICAgICAgdyA9IHdpZHRoO1xuXG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7KGhlaWdodCAtIGgpIC8gMn1weGA7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSBwbGF5ZXIgc2l6ZVxuICAgIHRoaXMucGxheWVyLnNldFNpemUodywgaCk7XG4gICAgLy8gdXBkYXRlIGNvbnRhaW5lciBzaXplXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY292ZXIgY29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yICBjc3MgY29sb3JcbiAgICovXG4gIHNldENvdmVyQ29sb3IoY29sb3IpIHtcbiAgICB0aGlzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0JhY2tUdWJlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==