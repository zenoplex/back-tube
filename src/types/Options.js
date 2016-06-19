// @flow

export type PlayerSettings = {
  volume?: ?number,
  autohide?: 0 | 1 | 2,
  autoplay?: 0 | 1,
  color?: 'red' | 'white',
  controls?: 0 | 1 | 2,
  disablekb?: 0 | 1,
  enablejsapi?: 0 | 1,
  fs?: ?number,
  hl?: ?string,
  iv_load_policy?: 1 | 3,
  loop?: 0 | 1,
  modestbranding?: 1,
  playsinline?: 0 | 1,
  rel?: 0 | 1,
  showinfo?: 0 | 1,
  start?: number,
  end?: number,
  quality?: 'highres' | 'hd1080' | 'hd720' | 'large' | 'medium' | 'small' | 'default'
};

export interface DefaultOptions {
  aspectRatio?: number,
  cover?: string,
  playerSettings?: PlayerSettings,
}

export interface Options extends DefaultOptions {
  videoId: string,
}
