# back-tube

[![wercker status](https://app.wercker.com/status/92bebf2e6ea7c5965e1dadcd9206e759/s "wercker status")](https://app.wercker.com/project/bykey/92bebf2e6ea7c5965e1dadcd9206e759)

Based from Sean McCambridge's [jQuery tubular](http://seanmccambridge.com/tubular/) plugin.
This plugin does not rely on jQuery.

Checkout the [DEMO](https://zenoplex.github.io/back-tube/)

## Project Setup

`npm i`

### Requirements

`node >=4.x.x`

## Development

`npm run watch`

## Deployment

`npm run build`

## Testing

_TBD_

## Usage

_Basic Usage_

```js
var BackTube = require('back-tube');

new BackTube(document.querySelector('#about'), {
  videoId: 'sGbxmsDFVnE'
});
```

_Advanced options_

See [YouTube IFRAME Player API](https://developers.google.com/youtube/player_parameters) for details.

```js
var BackTube = require('back-tube');

new BackTube(document.querySelector('#about'), {
  videoId: 'sGbxmsDFVnE',
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
    quality:        'hd720'
  }
});
```

## License

MIT
