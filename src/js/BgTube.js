import {getSize} from './utils';
import merge from 'lodash.merge';

export default class BgTube {

  static defaults = {
    aspectRatio: 16 / 9,
    videoId:     'RrR90DqGD4I',

    playerSettings: {
      volume:         0, // 0 - 100
      autohide:       0, // autohide controls
      autoplay:       1, // autoplay on load
      color:          'red', // red, white
      controls:       0, // show control UI
      disablekb:      0, // enable/disable keyboard control
      enablejsapi:    1,
      fs:             0, // display fullscreen button
      hl:             null, // interface language
      iv_load_policy: 3,
      loop:           1, // loop video flag (doesn't work properly)
      modestbranding: 1, // show/hide youtube logo
      playsinline:    0,
      rel:            0, // shows relative videos
      showinfo:       0,
      start:          0, // set beginning of the video
      end:            0, // set end of the video
      quality:        'hd720' // small, medium, large, hd720, hd1080, highres or default
    }
  };

  // flag for YoutubeAPI ready
  static apiReady = false;

  /**
   * constructor
   *
   * @param element
   * @param options
   */
  constructor(element = document.body, options = {}) {
    const win = window;

    this.__id = Date.now();
    this.element = element;
    this.player = null;
    this.playerElement = null;
    this.container = null;
    this.options = merge(BgTube.defaults, options);

    this.appendContainer(this.element);
    this.appendYoutubeScript();

    // if API is ready then fire up player
    if (BgTube.apiReady) {
      this.onYouTubeIFrameAPIReady();
    } else if (!win.onYouTubeIframeAPIReady) {
      win.onYouTubeIframeAPIReady = this.onYouTubeIFrameAPIReady.bind(this);
    }

    // add window resize event
    win.addEventListener('resize', this.resize.bind(this));
  }

  /**
   * append youtube iframe
   */
  appendContainer(element) {
    const doc = document;
    const container = `<div
        class="tubular-container"
        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">
          <div class="tubular-shield" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>
          <div id="tubular-player-${this.__id}" style="position:absolute;"></div>
      </div>`;
    const div = doc.createElement('div');
    div.innerHTML = container;

    element.style.position = 'relative';
    element.insertBefore(div.firstChild, this.element.firstElementChild);

    this.container = element.querySelector('.tubular-container');
    this.playerElement = element.querySelector('.tubular-player');
  }

  /**
   * append Youtube Iframe API
   */
  appendYoutubeScript() {
    if (!window.YT) {
      const doc = document;
      const tag = doc.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = doc.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  /**
   * YouTubeIFrameAPIReady handler
   */
  onYouTubeIFrameAPIReady() {
    // set ready flag
    BgTube.apiReady = true;

    const {
            videoId,
            playerSettings
            } = this.options;

    this.player = new YT.Player(`tubular-player-${this.__id}`, {
                  width: 0, // width will auto fit to element
                  height: 0, // height will auto fit to element
                  videoId,
      playerVars: playerSettings,
      events:     {
        onReady:       this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
        onError:       this.onPlayerError.bind(this)
      }
    })
    ;

    // playerElement reference must be set after onYouTubeIFrameAPIReady
    this.playerElement = document.getElementById(`tubular-player-${this.__id}`);
    this.resize();
  }

  /**
   * Player ready handler
   *
   * @param {*} [e]
   */
  onPlayerReady(e) {
    const { playerSettings: {start, quality, volume} } = this.options;

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
  onPlayerStateChange(state) {
    const {playerSettings: {start, loop}} = this.options;

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
  onPlayerError(e) {
    if (e && e.data) {
      throw new Error(`Error playing video: ${e.data}`);
    }
  }

  /**
   * resize player
   *
   * @param {event} [e]
   */
  resize(e) {
    const {width, height} = getSize(this.element);
    const {aspectRatio} = this.options;
    let w;
    let h;

    if (width / aspectRatio < height) {
      w = Math.ceil(height * aspectRatio);
      h = height;
      this.playerElement.style.left = `${(width - w) / 2}px`;
      this.playerElement.style.top = 0;

    } else {
      h = Math.ceil(width / aspectRatio);
      w = width;

      this.playerElement.style.left = 0;
      this.playerElement.style.top = `${(height - h) / 2}px`;
    }
    // update player size
    this.player.setSize(w, h);
    // update container size
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }
}

