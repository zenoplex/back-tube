export const getSize = (elem) => {
  const win = window;
  const doc = document;
  const delem = doc.documentElement;
  const body = document.body;
  let width;
  let height;

  if (elem === win) {
    width = Math.max(win.innerWidth, delem.clientWidth, body.clientWidth);
    height = Math.max(win.innerHeight, delem.clientHeight, body.clientHeight);
  } else {
    width = elem.offsetWidth;
    height = elem.offsetHeight;
  }

  return { width, height };
};
