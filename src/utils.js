type Size = {
  width: number,
  height: number,
}

export function getSize(element: HTMLElement): Size {
  const win = window;
  const doc: Document = document;
  const delem: HTMLElement = doc.documentElement;
  const body: HTMLBodyElement = document.body;
  let width: number;
  let height: number;

  if (element === win) {
    width = Math.max(win.innerWidth, delem.clientWidth, body.clientWidth);
    height = Math.max(win.innerHeight, delem.clientHeight, body.clientHeight);
  } else {
    width = element.offsetWidth;
    height = element.offsetHeight;
  }

  return { width, height };
}
