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
	
	    if (!videoId) {}throw new Error('videoId');
	
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
	    quality: 'hd720' // small, medium, large, hd720, hd1080, highres or default
	  },
	  cover: 'rgba(0,0,0, .5)'
	};
	BackTube.apiReady = false;
	exports.default = BackTube;

/***/ }
])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFja1R1YmUuanM/ZjhiYyoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLFFBQVE7Ozs7Ozs7OztBQXNDM0IsWUF0Q21CLFFBQVEsR0FzQ3dCO1NBQXZDLE9BQU8seURBQUcsUUFBUSxDQUFDLElBQUk7U0FBRSxPQUFPLHlEQUFHLEVBQUU7OzJCQXRDOUIsUUFBUTs7QUF1Q3pCLFNBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFbkIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsU0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsU0FBSSxDQUFDLE9BQU8sR0FBRyxzQkFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztvQkFFdEIsSUFBSSxDQUFDLE9BQU87U0FBL0IsT0FBTyxZQUFQLE9BQU87U0FBRSxLQUFLLFlBQUwsS0FBSzs7QUFFdEIsU0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFJLE1BQU0sSUFBSSxLQUFLLFdBQVcsQ0FBQzs7QUFFNUMsU0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsU0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDM0IsU0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFMUIsU0FBSSxLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFTLEVBQUUsQ0FBQyxFQUFFO0FBQzNCLFdBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsVUFBRyxDQUFDLEdBQUcsbUNB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QUNuQixXQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO01BQzFDOzs7VUE1TmtCLFFBQVE7OztBQUFSLFNBQVEsQ0FFcEIsUUFBUSxHQUFHO0FBQ2hCLGNBQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQztBQUNuQixVQUFPLEVBQU0sSUFBSTs7QUFFakIsaUJBQWMsRUFBRTtBQUNkLFdBQU0sRUFBVSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLFVBQUssRUFBVyxLQUFLO0FBQ3JCLGFBQVEsRUFBUSxDQUFDO0FBQ2pCLGNBQVMsRUFBTyxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixPQUFFLEVBQWMsQ0FBQztBQUNqQixPQUFFLEVBQWMsSUFBSTtBQUNwQixtQkFBYyxFQUFFLENBQUM7QUFDakIsU0FBSSxFQUFZLENBQUM7QUFDakIsbUJBQWMsRUFBRSxDQUFDO0FBQ2pCLGdCQUFXLEVBQUssQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixhQUFRLEVBQVEsQ0FBQztBQUNqQixVQUFLLEVBQVcsQ0FBQztBQUNqQixRQUFHLEVBQWEsQ0FBQztBQUNqQixZQUFPLEVBQVMsT0FBTztBQUFBLElBQ3hCO0FBQ0QsUUFBSyxFQUFFLGlCQUFpQjtFQUN6QjtBQTNCa0IsU0FBUSxDQThCcEIsUUFBUSxHQUFHLEtBQUs7bUJBOUJKLFFBQVEsQyIsImZpbGUiOiIwLmQyYzU1MmVkNjBlZmIzZjU2ZWY0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFNpemV9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrVHViZSB7XG5cbiAgc3RhdGljIGRlZmF1bHRzID0ge1xuICAgIGFzcGVjdFJhdGlvOiAxNiAvIDksXG4gICAgdmlkZW9JZDogICAgIG51bGwsXG5cbiAgICBwbGF5ZXJTZXR0aW5nczoge1xuICAgICAgdm9sdW1lOiAgICAgICAgIDAsIC8vIDAgLSAxMDBcbiAgICAgIGF1dG9oaWRlOiAgICAgICAwLCAvLyBhdXRvaGlkZSBjb250cm9sc1xuICAgICAgYXV0b3BsYXk6ICAgICAgIDEsIC8vIGF1dG9wbGF5IG9uIGxvYWRcbiAgICAgIGNvbG9yOiAgICAgICAgICAncmVkJywgLy8gcmVkLCB3aGl0ZVxuICAgICAgY29udHJvbHM6ICAgICAgIDAsIC8vIHNob3cgY29udHJvbCBVSVxuICAgICAgZGlzYWJsZWtiOiAgICAgIDAsIC8vIGVuYWJsZS9kaXNhYmxlIGtleWJvYXJkIGNvbnRyb2xcbiAgICAgIGVuYWJsZWpzYXBpOiAgICAxLFxuICAgICAgZnM6ICAgICAgICAgICAgIDAsIC8vIGRpc3BsYXkgZnVsbHNjcmVlbiBidXR0b25cbiAgICAgIGhsOiAgICAgICAgICAgICBudWxsLCAvLyBpbnRlcmZhY2UgbGFuZ3VhZ2VcbiAgICAgIGl2X2xvYWRfcG9saWN5OiAzLFxuICAgICAgbG9vcDogICAgICAgICAgIDEsIC8vIGxvb3AgdmlkZW8gZmxhZyAoZG9lc24ndCB3b3JrIHByb3Blcmx5KVxuICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsIC8vIHNob3cvaGlkZSB5b3V0dWJlIGxvZ29cbiAgICAgIHBsYXlzaW5saW5lOiAgICAwLFxuICAgICAgcmVsOiAgICAgICAgICAgIDAsIC8vIHNob3dzIHJlbGF0aXZlIHZpZGVvc1xuICAgICAgc2hvd2luZm86ICAgICAgIDAsXG4gICAgICBzdGFydDogICAgICAgICAgMCwgLy8gc2V0IGJlZ2lubmluZyBvZiB0aGUgdmlkZW9cbiAgICAgIGVuZDogICAgICAgICAgICAwLCAvLyBzZXQgZW5kIG9mIHRoZSB2aWRlb1xuICAgICAgcXVhbGl0eTogICAgICAgICdoZDcyMCcgLy8gc21hbGwsIG1lZGl1bSwgbGFyZ2UsIGhkNzIwLCBoZDEwODAsIGhpZ2hyZXMgb3IgZGVmYXVsdFxuICAgIH0sXG4gICAgY292ZXI6ICdyZ2JhKDAsMCwwLCAuNSknXG4gIH07XG5cbiAgLy8gZmxhZyBmb3IgWW91dHViZUFQSSByZWFkeVxuICBzdGF0aWMgYXBpUmVhZHkgPSBmYWxzZTtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5LCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB3aW4gPSB3aW5kb3c7XG5cbiAgICB0aGlzLl9faWQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlKEJhY2tUdWJlLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHsgdmlkZW9JZCwgY292ZXIgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIGlmKCF2aWRlb0lkKSB7IH0gdGhyb3cgbmV3IEVycm9yKGB2aWRlb0lkYCk7XG5cbiAgICB0aGlzLmFwcGVuZENvbnRhaW5lcih0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuYXBwZW5kWW91dHViZVNjcmlwdCgpO1xuICAgIHRoaXMuc2V0Q292ZXJDb2xvcihjb3Zlcik7XG5cbiAgICBpZiAoL2lPUy8udGVzdChwbGF0Zm9ybS5vcykpIHtcbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgaW1nLnNyYyA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvSWR9L21heHJlc2RlZmF1bHQuanBnYDtcbiAgICAgIGltZy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICB0aGlzLnBsYXllckVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIEFQSSBpcyByZWFkeSB0aGVuIGZpcmUgdXAgcGxheWVyXG4gICAgICBpZiAoQmFja1R1YmUuYXBpUmVhZHkpIHtcbiAgICAgICAgdGhpcy5vbllvdVR1YmVJRnJhbWVBUElSZWFkeSgpO1xuICAgICAgfSBlbHNlIGlmICghd2luLm9uWW91VHViZUlmcmFtZUFQSVJlYWR5KSB7XG4gICAgICAgIHdpbi5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IHRoaXMub25Zb3VUdWJlSUZyYW1lQVBJUmVhZHkuYmluZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIHdpbmRvdyByZXNpemUgZXZlbnRcbiAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogYXBwZW5kIHlvdXR1YmUgaWZyYW1lXG4gICAqL1xuICBhcHBlbmRDb250YWluZXIoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGA8ZGl2XG4gICAgICAgIGNsYXNzPVwiYmFja3R1YmUtY29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDowOyBsZWZ0OjA7IG92ZXJmbG93OmhpZGRlbjsgei1pbmRleDowXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2t0dWJlLWNvdmVyXCIgc3R5bGU9XCJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgcG9zaXRpb246YWJzb2x1dGU7IHotaW5kZXg6MTsgbGVmdDowOyB0b3A6MDtcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGlkPVwiYmFja3R1YmUtcGxheWVyLSR7dGhpcy5fX2lkfVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gY29udGFpbmVyO1xuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LmZpcnN0Q2hpbGQsIHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2t0dWJlLWNvbnRhaW5lcicpO1xuICAgIHRoaXMucGxheWVyRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgI2JhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLmNvdmVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja3R1YmUtY292ZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBlbmQgWW91dHViZSBJZnJhbWUgQVBJXG4gICAqL1xuICBhcHBlbmRZb3V0dWJlU2NyaXB0KCkge1xuICAgIGlmICghd2luZG93LllUKSB7XG4gICAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICAgIGNvbnN0IHRhZyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICBjb25zdCBmaXJzdFNjcmlwdFRhZyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWW91VHViZUlGcmFtZUFQSVJlYWR5IGhhbmRsZXJcbiAgICovXG4gIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5KCkge1xuICAgIC8vIHNldCByZWFkeSBmbGFnXG4gICAgQmFja1R1YmUuYXBpUmVhZHkgPSB0cnVlO1xuXG4gICAgY29uc3Qge1xuICAgICAgICAgICAgdmlkZW9JZCxcbiAgICAgICAgICAgIHBsYXllclNldHRpbmdzXG4gICAgICAgICAgICB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgWVQuUGxheWVyKGBiYWNrdHViZS1wbGF5ZXItJHt0aGlzLl9faWR9YCwge1xuICAgICAgd2lkdGg6ICAgICAgMCwgLy8gd2lkdGggd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICBoZWlnaHQ6ICAgICAwLCAvLyBoZWlnaHQgd2lsbCBhdXRvIGZpdCB0byBlbGVtZW50XG4gICAgICAgICAgICAgICAgICB2aWRlb0lkLFxuICAgICAgcGxheWVyVmFyczogcGxheWVyU2V0dGluZ3MsXG4gICAgICBldmVudHM6ICAgICB7XG4gICAgICAgIG9uUmVhZHk6ICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeS5iaW5kKHRoaXMpLFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiB0aGlzLm9uUGxheWVyU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgb25FcnJvcjogICAgICAgdGhpcy5vblBsYXllckVycm9yLmJpbmQodGhpcylcbiAgICAgIH1cbiAgICB9KVxuICAgIDtcblxuICAgIC8vIHBsYXllckVsZW1lbnQgcmVmZXJlbmNlIG11c3QgYmUgc2V0IGFmdGVyIG9uWW91VHViZUlGcmFtZUFQSVJlYWR5XG4gICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGJhY2t0dWJlLXBsYXllci0ke3RoaXMuX19pZH1gKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXllciByZWFkeSBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gW2VdXG4gICAqL1xuICBvblBsYXllclJlYWR5KGUpIHtcbiAgICBjb25zdCB7IHBsYXllclNldHRpbmdzOiB7c3RhcnQsIHF1YWxpdHksIHZvbHVtZX0gfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHRoaXMucGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIHRoaXMucGxheWVyLnNldFBsYXliYWNrUXVhbGl0eShxdWFsaXR5KTtcbiAgICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIHRoaXMucGxheWVyLnBsYXlWaWRlbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXRlIGNoYW5nZSBldmVudCBoYW5kbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdGVcbiAgICovXG4gIG9uUGxheWVyU3RhdGVDaGFuZ2Uoc3RhdGUpIHtcbiAgICBjb25zdCB7cGxheWVyU2V0dGluZ3M6IHtzdGFydCwgbG9vcH19ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgLy8gSWYgbG9vcCB0aGVuIHBsYXllciB3aWxsIHNlZWsgdG8gc3RhcnQgcG9zaXRpb24gYW5kIGxvb3BcbiAgICAvLyBTdGFuZGFyZCBsb29wIG9wdGlvbiB3aWxsIG5vdCB3b3JrIGFzIGludGVuZC5cbiAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL3BsYXllcl9wYXJhbWV0ZXJzI2xvb3BcbiAgICBpZiAoc3RhdGUuZGF0YSA9PT0gMCAmJiBsb29wKSB7XG4gICAgICB0aGlzLnBsYXllci5zZWVrVG8oc3RhcnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5ZXIgZXJyb3IgaGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0geyp9IGVcbiAgICovXG4gIG9uUGxheWVyRXJyb3IoZSkge1xuICAgIGlmIChlICYmIGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwbGF5aW5nIHZpZGVvOiAke2UuZGF0YX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVzaXplIHBsYXllclxuICAgKlxuICAgKiBAcGFyYW0ge2V2ZW50fSBbZV1cbiAgICovXG4gIHJlc2l6ZShlKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gZ2V0U2l6ZSh0aGlzLmVsZW1lbnQpO1xuICAgIGNvbnN0IHthc3BlY3RSYXRpb30gPSB0aGlzLm9wdGlvbnM7XG4gICAgbGV0IHc7XG4gICAgbGV0IGg7XG5cbiAgICBpZiAod2lkdGggLyBhc3BlY3RSYXRpbyA8IGhlaWdodCkge1xuICAgICAgdyA9IE1hdGguY2VpbChoZWlnaHQgKiBhc3BlY3RSYXRpbyk7XG4gICAgICBoID0gaGVpZ2h0O1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHsod2lkdGggLSB3KSAvIDJ9cHhgO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaCA9IE1hdGguY2VpbCh3aWR0aCAvIGFzcGVjdFJhdGlvKTtcbiAgICAgIHcgPSB3aWR0aDtcblxuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50LnN0eWxlLnRvcCA9IGAkeyhoZWlnaHQgLSBoKSAvIDJ9cHhgO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgcGxheWVyIHNpemVcbiAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3fXB4YDtcbiAgICB0aGlzLnBsYXllckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aH1weGA7XG4gICAgLy8gdXBkYXRlIGNvbnRhaW5lciBzaXplXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY292ZXIgY29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yICBjc3MgY29sb3JcbiAgICovXG4gIHNldENvdmVyQ29sb3IoY29sb3IpIHtcbiAgICB0aGlzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9CYWNrVHViZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=