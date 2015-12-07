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
	      //if(this.player) {
	      //this.player.setSize(w, h);
	      //} else {
	      this.playerElement.style.width = w + 'px';
	      this.playerElement.style.height = h + 'px';
	      //}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsUUFBTyxDQUFDLEdBQUcsb0JBQVUsQ0FBQzs7S0FFRCxRQUFROzs7Ozs7Ozs7QUFzQzNCLFlBdENtQixRQUFRLEdBc0N3QjtTQUF2QyxPQUFPLHlEQUFHLFFBQVEsQ0FBQyxJQUFJO1NBQUUsT0FBTyx5REFBRyxFQUFFOzsyQkF0QzlCLFFBQVE7O0FBdUN6QixTQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7O0FBRW5CLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBRXRCLElBQUksQ0FBQyxPQUFPO1NBQS9CLE9BQU8sWUFBUCxPQUFPO1NBQUUsS0FBSyxZQUFMLEtBQUs7O0FBRXRCLFNBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLFNBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQzNCLFNBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRzFCLFNBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBUyxFQUFFLENBQUMsRUFBRTtBQUMzQixXQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFVBQUcsQ0FBQyxHQUFHLG1DQUFpQyxPQUFPLHVCQUFvQixDQUFDO0FBQ3BF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LEVBQU0sYUFBYTs7QUFFMUIsaUJBQWMsRUFBRTtBQUNkLFdBQU0sRUFBVSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLFVBQUssRUFBVyxLQUFLO0FBQ3JCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGNBQVMsRUFBTyxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixPQUFFLEVBQWMsQ0FBQztBQUNqQixPQUFFLEVBQWMsSUFBSTtBQUNwQixtQkFBYyxFQUFFLENBQUM7QUFDakIsU0FBSSxFQUFZLENBQUM7QUFDakIsbUJBQWMsRUFBRSxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixhQUFRLEVBQVEsQ0FBQztBQUNqQixVQUFLLEVBQVcsQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixZQUFPLEVBQVMsT0FBTztBQUFBLElBQ3hCO0FBQ0QsUUFBSyxFQUFXLGlCQUFpQjtFQUNsQztBQTNCa0IsU0FBUSxDQThCcEIsUUFBUSxHQUFHLEtBQUs7bUJBOUJKLFFBQVEsQyIsImZpbGUiOiIwLjZiMWNkMjUyMjlhMWRjNjk4NDY2LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFNpemV9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuXG5jb25zb2xlLmxvZyhwbGF0Zm9ybSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tUdWJlIHtcblxuICBzdGF0aWMgZGVmYXVsdHMgPSB7XG4gICAgYXNwZWN0UmF0aW86IDE2IC8gOSxcbiAgICB2aWRlb0lkOiAgICAgJ1JyUjkwRHFHRDRJJyxcblxuICAgIHBsYXllclNldHRpbmdzOiB7XG4gICAgICB2b2x1bWU6ICAgICAgICAgMCwgLy8gMCAtIDEwMFxuICAgICAgYXV0b2hpZGU6ICAgICAgIDAsIC8vIGF1dG9oaWRlIGNvbnRyb2xzXG4gICAgICBhdXRvcGxheTogICAgICAgMSwgLy8gYXV0b3BsYXkgb24gbG9hZFxuICAgICAgY29sb3I6ICAgICAgICAgICdyZWQnLCAvLyByZWQsIHdoaXRlXG4gICAgICBjb250cm9sczogICAgICAgMCwgLy8gc2hvdyBjb250cm9sIFVJXG4gICAgICBkaXNhYmxla2I6ICAgICAgMCwgLy8gZW5hYmxlL2Rpc2FibGUga2V5Ym9hcmQgY29udHJvbFxuICAgICAgZW5hYmxlanNhcGk6ICAgIDEsXG4gICAgICBmczogICAgICAgICAgICAgMCwgLy8gZGlzcGxheSBmdWxsc2NyZWVuIGJ1dHRvblxuICAgICAgaGw6ICAgICAgICAgICAgIG51bGwsIC8vIGludGVyZmFjZSBsYW5ndWFnZVxuICAgICAgaXZfbG9hZF9wb2xpY3k6IDMsXG4gICAgICBsb29wOiAgICAgICAgICAgMSwgLy8gbG9vcCB2aWRlbyBmbGFnIChkb2Vzbid0IHdvcmsgcHJvcGVybHkpXG4gICAgICBtb2Rlc3RicmFuZGluZzogMSwgLy8gc2hvdy9oaWRlIHlvdXR1YmUgbG9nb1xuICAgICAgcGxheXNpbmxpbmU6ICAgIDAsXG4gICAgICByZWw6ICAgICAgICAgICAgMCwgLy8gc2hvd3MgcmVsYXRpdmUgdmlkZW9zXG4gICAgICBzaG93aW5mbzogICAgICAgMCxcbiAgICAgIHN0YXJ0OiAgICAgICAgICAwLCAvLyBzZXQgYmVnaW5uaW5nIG9mIHRoZSB2aWRlb1xuICAgICAgZW5kOiAgICAgICAgICAgIDAsIC8vIHNldCBlbmQgb2YgdGhlIHZpZGVvXG4gICAgICBxdWFsaXR5OiAgICAgICAgJ2hkNzIwJyAvLyBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgaGQ3MjAsIGhkMTA4MCwgaGlnaHJlcyBvciBkZWZhdWx0XG4gICAgfSxcbiAgICBjb3ZlcjogICAgICAgICAgJ3JnYmEoMCwwLDAsIC41KSdcbiAgfTtcblxuICAvLyBmbGFnIGZvciBZb3V0dWJlQVBJIHJlYWR5XG4gIHN0YXRpYyBhcGlSZWFkeSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCA9IGRvY3VtZW50LmJvZHksIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHdpbiA9IHdpbmRvdztcblxuICAgIHRoaXMuX19pZCA9IERhdGUubm93KCk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnBsYXllciA9IG51bGw7XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25zID0gbWVyZ2UoQmFja1R1YmUuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgeyB2aWRlb0lkLCBjb3ZlciB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdGhpcy5hcHBlbmRDb250YWluZXIodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmFwcGVuZFlvdXR1YmVTY3JpcHQoKTtcbiAgICB0aGlzLnNldENvdmVyQ29sb3IoY292ZXIpO1xuXG5cbiAgICBpZiAoL2lPUy8udGVzdChwbGF0Zm9ybS5vcykpIHtcbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1nLnNyYyA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvSWR9L21heHJlc2RlZmF1bHQuanBnYDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5hcHBlbmRDaGlsZChpbWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBBUEkgaXMgcmVhZHkgdGhlbiBmaXJlIHVwIHBsYXllclxuICAgICAgaWYgKEJhY2tUdWJlLmFwaVJlYWR5KSB7XG4gICAgICAgIHRoaXMub25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdpbi5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSkge1xuICAgICAgICB3aW4ub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSB0aGlzLm9uWW91VHViZUlGcmFtZUFQSVJlYWR5LmJpbmQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCB5b3V0dWJlIGlmcmFtZVxuICAgKi9cbiAgYXBwZW5kQ29udGFpbmVyKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICBjb25zdCBjb250YWluZXIgPSBgPGRpdlxuICAgICAgICBjbGFzcz1cImJhY2t0dWJlLWNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6MDsgbGVmdDowOyBvdmVyZmxvdzpoaWRkZW47IHotaW5kZXg6MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrdHViZS1jb3ZlclwiIHN0eWxlPVwid2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IHBvc2l0aW9uOmFic29sdXRlOyB6LWluZGV4OjE7IGxlZnQ6MDsgdG9wOjA7XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBpZD1cImJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1cIiBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO1wiPjwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgICBjb25zdCBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGNvbnRhaW5lcjtcblxuICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRpdi5maXJzdENoaWxkLCB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrdHViZS1jb250YWluZXInKTtcbiAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCNiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCk7XG4gICAgdGhpcy5jb3ZlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2t0dWJlLWNvdmVyJyk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIFlvdXR1YmUgSWZyYW1lIEFQSVxuICAgKi9cbiAgYXBwZW5kWW91dHViZVNjcmlwdCgpIHtcbiAgICBpZiAoIXdpbmRvdy5ZVCkge1xuICAgICAgY29uc3QgZG9jID0gZG9jdW1lbnQ7XG4gICAgICBjb25zdCB0YWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFlvdVR1YmVJRnJhbWVBUElSZWFkeSBoYW5kbGVyXG4gICAqL1xuICBvbllvdVR1YmVJRnJhbWVBUElSZWFkeSgpIHtcbiAgICAvLyBzZXQgcmVhZHkgZmxhZ1xuICAgIEJhY2tUdWJlLmFwaVJlYWR5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHZpZGVvSWQsXG4gICAgICAgICAgICBwbGF5ZXJTZXR0aW5nc1xuICAgICAgICAgICAgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMucGxheWVyID0gbmV3IFlULlBsYXllcihgYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfWAsIHtcbiAgICAgIHdpZHRoOiAgICAgIDAsIC8vIHdpZHRoIHdpbGwgYXV0byBmaXQgdG8gZWxlbWVudFxuICAgICAgaGVpZ2h0OiAgICAgMCwgLy8gaGVpZ2h0IHdpbGwgYXV0byBmaXQgdG8gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgdmlkZW9JZCxcbiAgICAgIHBsYXllclZhcnM6IHBsYXllclNldHRpbmdzLFxuICAgICAgZXZlbnRzOiAgICAge1xuICAgICAgICBvblJlYWR5OiAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkuYmluZCh0aGlzKSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogdGhpcy5vblBsYXllclN0YXRlQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICAgIG9uRXJyb3I6ICAgICAgIHRoaXMub25QbGF5ZXJFcnJvci5iaW5kKHRoaXMpXG4gICAgICB9XG4gICAgfSlcbiAgICA7XG5cbiAgICAvLyBwbGF5ZXJFbGVtZW50IHJlZmVyZW5jZSBtdXN0IGJlIHNldCBhZnRlciBvbllvdVR1YmVJRnJhbWVBUElSZWFkeVxuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5ZXIgcmVhZHkgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IFtlXVxuICAgKi9cbiAgb25QbGF5ZXJSZWFkeShlKSB7XG4gICAgY29uc3QgeyBwbGF5ZXJTZXR0aW5nczoge3N0YXJ0LCBxdWFsaXR5LCB2b2x1bWV9IH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICB0aGlzLnBsYXllci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB0aGlzLnBsYXllci5zZXRQbGF5YmFja1F1YWxpdHkocXVhbGl0eSk7XG4gICAgdGhpcy5wbGF5ZXIuc2Vla1RvKHN0YXJ0KTtcbiAgICB0aGlzLnBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGF0ZSBjaGFuZ2UgZXZlbnQgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXRlXG4gICAqL1xuICBvblBsYXllclN0YXRlQ2hhbmdlKHN0YXRlKSB7XG4gICAgY29uc3Qge3BsYXllclNldHRpbmdzOiB7c3RhcnQsIGxvb3B9fSA9IHRoaXMub3B0aW9ucztcblxuICAgIC8vIElmIGxvb3AgdGhlbiBwbGF5ZXIgd2lsbCBzZWVrIHRvIHN0YXJ0IHBvc2l0aW9uIGFuZCBsb29wXG4gICAgLy8gU3RhbmRhcmQgbG9vcCBvcHRpb24gd2lsbCBub3Qgd29yayBhcyBpbnRlbmQuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9wbGF5ZXJfcGFyYW1ldGVycyNsb29wXG4gICAgaWYgKHN0YXRlLmRhdGEgPT09IDAgJiYgbG9vcCkge1xuICAgICAgdGhpcy5wbGF5ZXIuc2Vla1RvKHN0YXJ0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGxheWVyIGVycm9yIGhhbmRsZXJcbiAgICpcbiAgICogQHBhcmFtIHsqfSBlXG4gICAqL1xuICBvblBsYXllckVycm9yKGUpIHtcbiAgICBpZiAoZSAmJiBlLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgcGxheWluZyB2aWRlbzogJHtlLmRhdGF9YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlc2l6ZSBwbGF5ZXJcbiAgICpcbiAgICogQHBhcmFtIHtldmVudH0gW2VdXG4gICAqL1xuICByZXNpemUoZSkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGdldFNpemUodGhpcy5lbGVtZW50KTtcbiAgICBjb25zdCB7YXNwZWN0UmF0aW99ID0gdGhpcy5vcHRpb25zO1xuICAgIGxldCB3O1xuICAgIGxldCBoO1xuXG4gICAgaWYgKHdpZHRoIC8gYXNwZWN0UmF0aW8gPCBoZWlnaHQpIHtcbiAgICAgIHcgPSBNYXRoLmNlaWwoaGVpZ2h0ICogYXNwZWN0UmF0aW8pO1xuICAgICAgaCA9IGhlaWdodDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7KHdpZHRoIC0gdykgLyAyfXB4YDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSBNYXRoLmNlaWwod2lkdGggLyBhc3BlY3RSYXRpbyk7XG4gICAgICB3ID0gd2lkdGg7XG5cbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS50b3AgPSBgJHsoaGVpZ2h0IC0gaCkgLyAyfXB4YDtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHBsYXllciBzaXplXG4gICAgLy9pZih0aGlzLnBsYXllcikge1xuICAgICAgLy90aGlzLnBsYXllci5zZXRTaXplKHcsIGgpO1xuICAgIC8vfSBlbHNlIHtcbiAgICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3d9cHhgO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2h9cHhgO1xuICAgIC8vfVxuICAgIC8vIHVwZGF0ZSBjb250YWluZXIgc2l6ZVxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGNvdmVyIGNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAgY3NzIGNvbG9yXG4gICAqL1xuICBzZXRDb3ZlckNvbG9yKGNvbG9yKSB7XG4gICAgdGhpcy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9CYWNrVHViZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=