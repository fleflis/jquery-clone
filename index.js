const $ = (...args) => {
  if (typeof args[0] === 'function') {
    // Document.ready function
    const readyFn = args[0];
    document.addEventListener('DOMContentLoaded', readyFn);

  }
}