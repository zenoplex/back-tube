import {getSize} from './utils';

export default class tubular {
  static defaults = {
    ratio:          16 / 9,
    videoId:        'RrR90DqGD4I',
    volume:         0,
    autohide:       0,
    autoplay:       1,
    color:          'red',
    controls:       0,
    disablekb:      0,
    // set end of the video
    end:            0,
    // display fullscreen button
    fs:             0,
    // interface language
    hl:             null,
    iv_load_policy: 3,
    // loop video flag
    loop:           1,
    // show/hide youtube logo
    modestbranding: 1,
    playsinline:    0,
    // shows relative videos
    rel:            0,
    showinfo:       0,
    start:          0,
    // small, medium, large, hd720, hd1080, highres or default
    quality:        'hd720'
  }


  constructor(element = document.body, options = {}) {
    const win = window;

    this.element = element;
    this.player = null;
    this.playerElement = null;
    this.container = null;
    this.options = {...tubular.defaults, ...options};

    this.appendContainer(this.element);
    this.appendYoutubeScript();

    win.onYouTubeIframeAPIReady = this.onYouTubeIFrameAPIReady.bind(this);
    win.addEventListener('resize', this.resize.bind(this));
  }

  /**
   * append youtube iframe
   */
  appendContainer(element) {
    const doc = document;
    const container = `<div
        id="tubular-container"
        style="position: absolute; top:0; left:0; overflow:hidden; z-index: 0">
          <div id="tubular-shield" style="width:100%; height:100%; position:absolute; z-index:1; left:0; top:0;"></div>
          <div id="tubular-player" style="position: absolute"></div>
      </div>`;
    const div = doc.createElement('div');
    div.innerHTML = container;

    element.style.position = 'relative';
    element.insertBefore(div.firstChild, this.element.firstElementChild);

    this.container = doc.getElementById('tubular-container');
  }

  /**
   * append Youtube Iframe API
   */
  appendYoutubeScript() {
    if (!window.YT) {
      const doc = document;
      const tag = doc.createElement('script');
      tag.src = '//www.youtube.com/iframe_api';
      const firstScriptTag = doc.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }


  onYouTubeIFrameAPIReady() {
    const {
            width,
            height,
            videoId,
            autohide,
            autoplay,
            color,
            controls,
            disablekb,
            end,
            fs,
            hl,
            iv_load_policy,
            loop,
            modestbranding,
            playsinline,
            rel,
            showinfo,
            start
            } = this.options;

    const enablejsapi = 1;

    this.player = new YT.Player('tubular-player', {
                  width,
                  height,
                  videoId,
      playerVars: {
        autohide,
        autoplay,
        color,
        controls,
        disablekb,
        enablejsapi,
        end,
        fs,
        hl,
        iv_load_policy,
        loop,
        modestbranding,
        playsinline,
        rel,
        showinfo,
        start
      },
      events:     {
        'onReady':       this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });

    // playerElement reference must be set after onYouTubeIFrameAPIReady
    this.playerElement = document.getElementById('tubular-player');
    this.resize();
  }

  onPlayerReady(e) {
    const {start, quality, volume} = this.options;

    this.player.setVolume(volume);
    this.player.seekTo(start);
    this.player.playVideo();
    this.player.setPlaybackQuality(quality);
  }

  onPlayerStateChange(state) {
    if (state.data === 0 && this.options.loop) {
      this.player.seekTo(this.options.start);
    }
  }

  resize(e) {
    const {width, height} = getSize(this.element);
    const {ratio} = this.options;
    let w;
    let h;

    if (width / ratio < height) {
      w = Math.ceil(height * ratio);
      h = height;
      this.playerElement.style.left = `${(width - w) / 2}px`;
      this.playerElement.style.top = 0;

    } else {
      h = Math.ceil(width / ratio);
      w = width;

      this.playerElement.style.left = 0;
      this.playerElement.style.top = `${(height - h) / 2}px`;
    }
    this.player.setSize(w, h);
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;


  }
}

