// @flow

import { getSize } from './utils';
import merge from 'lodash.merge';
import platform from 'platform';
import type { DefaultOptions, Options } from 'types/Options';

export default class BackTube {

  static defaults: DefaultOptions = {
    aspectRatio: 16 / 9,
    cover: 'rgba(0,0,0, .4)',

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
      quality: 'default', // small, medium, large, hd720, hd1080, highres or default
    },
  };

  // flag for YoutubeAPI ready
  static apiReady: boolean = false;

  __id: number = Date.now();
  element: HTMLElement;
  player: Object;
  playerElement: HTMLElement;
  container: HTMLElement;
  options: Options;
  cover: HTMLElement;

  constructor(element: HTMLElement = document.body, options: Options) {
    if (!options.videoId) { throw new Error('videoId must be specified'); }

    this.element = element;
    this.options = merge(BackTube.defaults, options);

    this.init();
  }

  init() {
    const win = window;
    const { videoId, cover } = this.options;

    this.appendContainer(this.element);
    this.appendYoutubeScript();
    if (cover) this.setCoverColor(cover);

    if (/iOS|Android/.test(platform.os.family)) {
      if (videoId) this.appendBackgroundImage(videoId);
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

  appendContainer(element: HTMLElement) {
    const container = `<div
        class="backtube-container"
        style="position: absolute; top:0; left:0; overflow:hidden; z-index:0">
          <div class="backtube-cover"
           style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>
          <div id="backtube-player-${this.__id}" style="position:absolute;"></div>
      </div>`;
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = container;

    element.style.position = 'relative'; // eslint-disable-line no-param-reassign
    if (div.firstChild) element.insertBefore(div.firstChild, this.element.firstElementChild);

    this.container = element.querySelector('.backtube-container');
    this.playerElement = element.querySelector(`#backtube-player-${this.__id}`);
    this.cover = element.querySelector('.backtube-cover');
  }

  appendBackgroundImage(videoId: string) {
    const img: HTMLImageElement = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    img.style.width = '100%';
    img.style.height = '100%';
    this.playerElement.appendChild(img);
    this.resize();
  }

  appendYoutubeScript() {
    if (!window.YT) {
      const tag: HTMLScriptElement = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag: HTMLScriptElement = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  onYouTubeIFrameAPIReady() {
    // set ready flag
    BackTube.apiReady = true;

    const {
      videoId,
      playerSettings,
    } = this.options;

    if (window.YT) {
      this.player = new window.YT.Player(`backtube-player-${this.__id}`, {
        width: 0, // width will auto fit to element
        height: 0, // height will auto fit to element
        videoId,
        playerVars: playerSettings,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onPlayerError.bind(this),
        },
      });
    }

    // playerElement reference must be set after onYouTubeIFrameAPIReady
    this.playerElement = document.getElementById(`backtube-player-${this.__id}`);
    this.resize();
  }

  onPlayerReady() {
    const { playerSettings } = this.options;
    if (playerSettings) {
      const { start, quality, volume } = playerSettings;

      if (volume != null) this.player.setVolume(volume);
      if (quality) this.player.setPlaybackQuality(quality);
      if (start != null) this.player.seekTo(start);
    }

    this.player.playVideo();
  }

  onPlayerStateChange(state: Object) {
    const { playerSettings } = this.options;
    if (playerSettings) {
      const { start = 0, loop } = playerSettings;
      // If loop then player will seek to start position and loop
      // Standard loop option will not work as intend.
      // https://developers.google.com/youtube/player_parameters#loop
      if (state.data === 0 && loop) {
        this.player.seekTo(start);
      }
    }
  }

  onPlayerError(e: Error) {
    if (e && e.data) {
      throw new Error(`Error playing video: ${e.data}`);
    }
  }

  resize() {
    const { width, height } = getSize(this.element);
    const { aspectRatio = 16 / 9 } = this.options;

    let w;
    let h;

    if (width / aspectRatio < height) {
      w = Math.ceil(height * aspectRatio);
      h = height;
      this.playerElement.style.left = `${(width - w) / 2}px`;
      this.playerElement.style.top = '0';
    } else {
      h = Math.ceil(width / aspectRatio);
      w = width;

      this.playerElement.style.left = '0';
      this.playerElement.style.top = `${(height - h) / 2}px`;
    }
    // update player size
    this.playerElement.style.width = `${w}px`;
    this.playerElement.style.height = `${h}px`;
    // update container size
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  setCoverColor(color: string) {
    this.cover.style.backgroundColor = color;
  }
}
