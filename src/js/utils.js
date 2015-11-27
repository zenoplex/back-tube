import get_size from 'get-size';

const win = window;
const doc = document;
const delem = doc.documentElement;
const body = document.body;

export const getSize = (elem) => {
  if (elem === win) {

    const width = win.innerWidth || delem.clientWidth || body.clientWidth;
    const height = win.innerHeight || delem.clientHeight || body.clientHeight;

    return {width, height}

  } else {
    return get_size(elem);
  }
};
