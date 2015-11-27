import {getSize} from './utils';

export default class tubular {
  static defaults = {
    ratio:          16 / 9,
    videoId:        'ZCAnLxRvNNc',
    autohide:       0,
    autoplay:       1,
    color:          'white',
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
    playlist:       [],
    playsinline:    0,
    // shows relative videos
    rel:            0,
    showinfo:       0,
    start:          0,

    //mute:             true,
    //repeat:           true,
    //width:            500,
    //wrapperZIndex:    99,
    //playButtonClass:  'tubular-play',
    //pauseButtonClass: 'tubular-pause',
    //muteButtonClass:  'tubular-mute',
    //volumeUpClass:    'tubular-volume-up',
    //volumeDownClass:  'tubular-volume-down',
    //increaseVolumeBy: 10,
    //start:            0,

  }

  constructor(node, options = {}) {
    const win = window;

    this.player = null;
    this.playerElement = null;
    this.options = {...tubular.defaults, ...options};

    this.appendContainer();
    this.appendYoutubeScript();

    win.onYouTubeIframeAPIReady = this.onYouTubeIFrameAPIReady.bind(this);
    win.addEventListener('resize', this.resize.bind(this));
  }


  appendContainer() {
    const doc = document;
    const container = `
      <div
        id="tubular-container"
        style="overflow: hidden; position: fixed; z-index: 1; width: 100%; height: 100%">
          <div id="tubular-player" style="position: absolute"></div>
      </div>
      <div id="tubular-shield" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>
      `;
    const div = doc.createElement('div');
    div.innerHTML = container;

    const body = doc.body;
    body.insertBefore(div.firstElementChild, body.firstElementChild);

    // keep player reference
    //this.playerElement = doc.getElementById('tubular-player');
  }

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
            ratio,
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
            playlist,
            playsinline,
            rel,
            showinfo,
            start
            } = this.options;


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
        end,
        fs,
        hl,
        iv_load_policy,
        loop,
        modestbranding,
        playlist,
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

    //
    this.playerElement = document.getElementById('tubular-player');
  }

  onPlayerReady(e) {
    this.resize();
    this.player.playVideo();
  }

  onPlayerStateChange(e) {

  }

  resize(e) {
    const {width, height} = getSize(window);
    const {ratio} = this.options;
    let w;
    let h;

    //this.playerElement = document.getElementById('tubular-player');

    console.log(width, ratio, height);

    if (width / ratio < height) {
      w = Math.ceil(height * ratio);
      console.log(this.playerElement);
      this.playerElement.style.width = `${w}px`;
      this.playerElement.style.height = `${height}px`;
      this.playerElement.style.left = `${(width - w) / 2}px`;
      this.playerElement.style.top = 0;
    } else {
      h = Math.ceil(width / ratio);
      this.playerElement.style.width = `${width}px`;
      this.playerElement.style.height = `${h}px`;
      this.playerElement.style.left = 0;
      this.playerElement.style.top = `${(height - h) / 2}px`;
    }
  }
}

