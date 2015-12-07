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
	
	      console.log(state.data);
	
	      // If loop then player will seek to start position and loop
	      // Standard loop option will not work as intend.
	      // https://developers.google.com/youtube/player_parameters#loop
	      //if (state.data === 0 && loop) {
	      //  this.player.seekTo(start);
	      //}
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
	    quality: 'hd720' // small, medium, large, hd720, hd1080, highres or default
	  },
	  cover: 'rgba(0,0,0, .5)'
	};
	BackTube.apiReady = false;
	exports.default = BackTube;

/***/ }
])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLFFBQVE7Ozs7Ozs7OztBQXNDM0IsWUF0Q21CLFFBQVEsR0FzQ3dCO1NBQXZDLE9BQU8seURBQUcsUUFBUSxDQUFDLElBQUk7U0FBRSxPQUFPLHlEQUFHLEVBQUU7OzJCQXRDOUIsUUFBUTs7QUF1Q3pCLFNBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFbkIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsU0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsU0FBSSxDQUFDLE9BQU8sR0FBRyxzQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztvQkFFdEIsSUFBSSxDQUFDLE9BQU87U0FBL0IsT0FBTyxZQUFQLE9BQU87U0FBRSxLQUFLLFlBQUwsS0FBSzs7QUFFdEIsU0FBRyxDQUFDLE9BQU8sRUFBRTtBQUFFLGFBQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQztNQUFFOztBQUU1QyxTQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxTQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUMzQixTQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUxQixTQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQVMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsV0FBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxVQUFHLENBQUMsR0FB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SyxDQUFDO01BQzFDOzs7VUE5TmtCLFFBQVE7OztBQUFSLFNBQVEsQ0FFcEIsUUFBUSxHQUFHO0FBQ2hCLGNBQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQztBQUNuQixVQUFPLEVBQU0sSUFBSTs7QUFFakIsaUJBQWMsRUFBRTtBQUNkLFdBQU0sRUFBVSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLFVBQUssRUFBVyxLQUFLO0FBQ3JCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGNBQVMsRUFBTyxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixPQUFFLEVBQWMsQ0FBQztBQUNqQixPQUFFLEVBQWMsSUFBSTtBQUNwQixtQkFBYyxFQUFFLENBQUM7QUFDakIsU0FBSSxFQUFZLENBQUM7QUFDakIsbUJBQWMsRUFBRSxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixhQUFRLEVBQVEsQ0FBQztBQUNqQixVQUFLLEVBQVcsQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixZQUFPLEVBQVMsT0FBTztBQUFBLElBQ3hCO0FBQ0QsUUFBSyxFQUFFLGlCQUFpQjtFQUN6QjtBQTNCa0IsU0FBUSxDQThCcEIsUUFBUSxHQUFHLEtBQUs7bUJBOUJKLFFBQVEsQyIsImZpbGUiOiIwLmYzOGU5YTY1MzIyNjA4ZmUyZDMwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFNpemV9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrVHViZSB7XG5cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIGFzcGVjdFJhdGlvOiAxNiAvIDksXG4gICAgdmlkZW9JZDogICAgIG51bGwsXG5cbiAgICBwbGF5ZXJTZXR0aW5nczoge1xuICAgICAgdm9sdW1lOiAgICAgICAgIDAsIC8vIDAgLSAxMDBcbiAgICAgIGF1dG9oaWRlOiAgICAgICAwLCAvLyBhdXRvaGlkZSBjb250cm9sc1xuICAgICAgYXV0b3BsYXk6ICAgICAgIDEsIC8vIGF1dG9wbGF5IG9uIGxvYWRcbiAgICAgIGNvbG9yOiAgICAgICAgICAncmVkJywgLy8gcmVkLCB3aGl0ZVxuICAgICAgY29udHJvbHM6ICAgICAgIDAsIC8vIHNob3cgY29udHJvbCBVSVxuICAgICAgZGlzYWJsZWtiOiAgICAgIDAsIC8vIGVuYWJsZS9kaXNhYmxlIGtleWJvYXJkIGNvbnRyb2xcbiAgICAgIGVuYWJsZWpzYXBpOiAgICAxLFxuICAgICAgZnM6ICAgICAgICAgICAgIDAsIC8vIGRpc3BsYXkgZnVsbHNjcmVlbiBidXR0b25cbiAgICAgIGhsOiAgICAgICAgICAgICBudWxsLCAvLyBpbnRlcmZhY2UgbGFuZ3VhZ2VcbiAgICAgIGl2X2xvYWRfcG9saWN5OiAzLFxuICAgICAgbG9vcDogICAgICAgICAgIDEsIC8vIGxvb3AgdmlkZW8gZmxhZyAoZG9lc24ndCB3b3JrIHByb3Blcmx5KVxuICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsIC8vIHNob3cvaGlkZSB5b3V0dWJlIGxvZ29cbiAgICAgIHBsYXlzaW5saW5lOiAgICAwLFxuICAgICAgcmVsOiAgICAgICAgICAgIDAsIC8vIHNob3dzIHJlbGF0aXZlIHZpZGVvc1xuICAgICAgc2hvd2luZm86ICAgICAgIDAsXG4gICAgICBzdGFydDogICAgICAgICAgMCwgLy8gc2V0IGJlZ2lubmluZyBvZiB0aGUgdmlkZW9cbiAgICAgIGVuZDogICAgICAgICAgICAwLCAvLyBzZXQgZW5kIG9mIHRoZSB2aWRlb1xuICAgICAgcXVhbGl0eTogICAgICAgICdoZDcyMCcgLy8gc21hbGwsIG1lZGl1bSwgbGFyZ2UsIGhkNzIwLCBoZDEwODAsIGhpZ2hyZXMgb3IgZGVmYXVsdFxuICAgIH0sXG4gICAgY292ZXI6ICdyZ2JhKDAsMCwwLCAuNSknXG4gIH07XG5cbiAgLy8gZmxhZyBmb3IgWW91dHViZUFQSSByZWFkeVxuICBzdGF0aWMgYXBpUmVhZHkgPSBmYWxzZTtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XG5cbiAgICB0aGlzLl9faWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlKEJhY2tUdWJlLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHsgdmlkZW9JZCwgY292ZXIgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIGlmKCF2aWRlb0lkKSB7IHRocm93IG5ldyBFcnJvcihgdmlkZW9JZGApOyB9XG5cbiAgICB0aGlzLmFwcGVuZENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuYXBwZW5kWW91dHViZVNjcmlwdCgpO1xuICAgIHRoaXMuc2V0Q292ZXJDb2xvcihjb3Zlcik7XG5cbiAgICBpZiAoL2lPUy8udGVzdChwbGF0Zm9ybS5vcykpIHtcbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1nLnNyYyA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvSWR9L21heHJlc2RlZmF1bHQuanBnYDtcbiAgICAgIGltZy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIEFQSSBpcyByZWFkeSB0aGVuIGZpcmUgdXAgcGxheWVyXG4gICAgICBpZiAoQmFja1R1YmUuYXBpUmVhZHkpIHtcbiAgICAgICAgdGhpcy5vbllvdVR1YmVJRnJhbWVBUElSZWFkeSgpO1xuICAgICAgfSBlbHNlIGlmICghd2luLm9uWW91VHViZUlmcmFtZUFQSVJlYWR5KSB7XG4gICAgICAgIHdpbi5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IHRoaXMub25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkuYmluZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIHlvdXR1YmUgaWZyYW1lXG4gICAqL1xuICBhcHBlbmRDb250YWluZXIoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYmFja3R1YmUtY29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDowOyBsZWZ0OjA7IG92ZXJmbG93OmhpZGRlbjsgei1pbmRleDowXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2t0dWJlLWNvdmVyXCIgc3R5bGU9XCJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgcG9zaXRpb246YWJzb2x1dGU7IHotaW5kZXg6MTsgbGVmdDowOyB0b3A6MDtcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGlkPVwiYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gY29udGFpbmVyO1xuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LmZpcnN0Q2hpbGQsIHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2t0dWJlLWNvbnRhaW5lcicpO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgI2JhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLmNvdmVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja3R1YmUtY292ZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgWW91dHViZSBJZnJhbWUgQVBJXG4gICAqL1xuICBhcHBlbmRZb3V0dWJlU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93LllUKSB7XG4gICAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICAgIGNvbnN0IHRhZyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICBjb25zdCBmaXJzdFNjcmlwdFRhZyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWW91VHViZUlGcmFtZUFQSVJlYWR5IGhhbmRsZXJcbiAgICovXG4gIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5KCkge1xuICAgIC8vIHNldCByZWFkeSBmbGFnXG4gICAgQmFja1R1YmUuYXBpUmVhZHkgPSB0cnVlO1xuXG4gICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9JZCxcbiAgICAgICAgICAgIHBsYXllclNldHRpbmdzXG4gICAgICAgICAgICB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGBiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCwge1xuICAgICAgd2lkdGg6ICAgICAgMCwgLy8gd2lkdGggd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICBoZWlnaHQ6ICAgICAwLCAvLyBoZWlnaHQgd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICAgICAgICAgICAgICB2aWRlb0lkLFxuICAgICAgcGxheWVyVmFyczogcGxheWVyU2V0dGluZ3MsXG4gICAgICBldmVudHM6ICAgICB7XG4gICAgICAgIG9uUmVhZHk6ICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeS5iaW5kKHRoaXMpLFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgb25FcnJvcjogICAgICAgdGhpcy5vblBsYXllckVycm9yLmJpbmQodGhpcylcbiAgICAgIH1cbiAgICB9KVxuICAgIDtcblxuICAgIC8vIHBsYXllckVsZW1lbnQgcmVmZXJlbmNlIG11c3QgYmUgc2V0IGFmdGVyIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXllciByZWFkeSBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gW2VdXG4gICAqL1xuICBvblBsYXllclJlYWR5KGUpIHtcbiAgICBjb25zdCB7IHBsYXllclNldHRpbmdzOiB7c3RhcnQsIHF1YWxpdHksIHZvbHVtZX0gfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMucGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIHRoaXMucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShxdWFsaXR5KTtcbiAgICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXRlIGNoYW5nZSBldmVudCBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAgICovXG4gIG9uUGxheWVyU3RhdGVDaGFuZ2Uoc3RhdGUpIHtcbiAgICBjb25zdCB7cGxheWVyU2V0dGluZ3M6IHtzdGFydCwgbG9vcH19ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgY29uc29sZS5sb2coc3RhdGUuZGF0YSk7XG5cbiAgICAvLyBJZiBsb29wIHRoZW4gcGxheWVyIHdpbGwgc2VlayB0byBzdGFydCBwb3NpdGlvbiBhbmQgbG9vcFxuICAgIC8vIFN0YW5kYXJkIGxvb3Agb3B0aW9uIHdpbGwgbm90IHdvcmsgYXMgaW50ZW5kLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvcGxheWVyX3BhcmFtZXRlcnMjbG9vcFxuICAgIC8vaWYgKHN0YXRlLmRhdGEgPT09IDAgJiYgbG9vcCkge1xuICAgIC8vICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIC8vfVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYXllciBlcnJvciBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZVxuICAgKi9cbiAgb25QbGF5ZXJFcnJvcihlKSB7XG4gICAgaWYgKGUgJiYgZS5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHBsYXlpbmcgdmlkZW86ICR7ZS5kYXRhfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXNpemUgcGxheWVyXG4gICAqXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFtlXVxuICAgKi9cbiAgcmVzaXplKGUpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBnZXRTaXplKHRoaXMuZWxlbWVudCk7XG4gICAgY29uc3Qge2FzcGVjdFJhdGlvfSA9IHRoaXMub3B0aW9ucztcbiAgICBsZXQgdztcbiAgICBsZXQgaDtcblxuICAgIGlmICh3aWR0aCAvIGFzcGVjdFJhdGlvIDwgaGVpZ2h0KSB7XG4gICAgICB3ID0gTWF0aC5jZWlsKGhlaWdodCAqIGFzcGVjdFJhdGlvKTtcbiAgICAgIGggPSBoZWlnaHQ7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IGAkeyh3aWR0aCAtIHcpIC8gMn1weGA7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUudG9wID0gMDtcblxuICAgIH0gZWxzZSB7XG4gICAgICBoID0gTWF0aC5jZWlsKHdpZHRoIC8gYXNwZWN0UmF0aW8pO1xuICAgICAgdyA9IHdpZHRoO1xuXG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUudG9wID0gYCR7KGhlaWdodCAtIGgpIC8gMn1weGA7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSBwbGF5ZXIgc2l6ZVxuICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3d9cHhgO1xuICAgIHRoaXMucGxheWVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtofXB4YDtcbiAgICAvLyB1cGRhdGUgY29udGFpbmVyIHNpemVcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjb3ZlciBjb2xvclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgIGNzcyBjb2xvclxuICAgKi9cbiAgc2V0Q292ZXJDb2xvcihjb2xvcikge1xuICAgIHRoaXMuY292ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0JhY2tUdWJlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==