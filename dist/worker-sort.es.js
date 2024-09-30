function l(e, o) {
  const t = [];
  for (let r = 0; r < e.length; r += o)
    t.push(e.slice(r, r + o));
  return t;
}
function w(e, o) {
  return new Promise((t, r) => {
    const n = o.toString(), g = navigator.hardwareConcurrency || 4, u = Math.ceil(e.length / g), c = [];
    let m = 0;
    const i = l(e, u);
    i.forEach((k, h) => {
      const s = new Worker(new URL(
        /* @vite-ignore */
        "/assets/worker-RpyYxF_s.js",
        import.meta.url
      ));
      s.postMessage({ array: k, comparator: n }), s.onmessage = (a) => {
        c[h] = a.data, m++, s.terminate(), m === i.length && p(c, t, r);
      }, s.onerror = (a) => {
        s.terminate(), r(new Error(`Sorting Worker error: ${a.message}`));
      };
    });
  });
}
function p(e, o, t) {
  const r = new Worker(new URL(
    /* @vite-ignore */
    "/assets/mergeWorker-C12rgu0E.js",
    import.meta.url
  ));
  r.postMessage(e), r.onmessage = (n) => {
    o(n.data), r.terminate();
  }, r.onerror = (n) => {
    r.terminate(), t(new Error(`Merge Worker error: ${n.message}`));
  };
}
export {
  w as default
};
