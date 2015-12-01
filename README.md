# BgTube

Based from Sean McCambridge's [jQuery tubular](http://seanmccambridge.com/tubular/) plugin.
This plugin does not rely on jQuery.


## Project Setup

`npm i`

### Requirements

`node >=4.x.x`

## Testing

_TBD_

## Development

`npm run watch`

## Deployment

`npm run build`

## Troubleshooting & Useful Tools


## Usage

Basic Usage

```js
var BgTube = require('bg-tube');

new BgTube(document.querySelector('#about'), {
  videoId: 'sGbxmsDFVnE'
});
```

Advanced options

```js
var BgTube = require('bg-tube');

new BgTube(document.querySelector('#about'), {
  videoId: 'sGbxmsDFVnE',
  playerSettings: {
    quality: 'highres'
  }
});
```

## License

MIT
