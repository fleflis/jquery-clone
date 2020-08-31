
const makeNiceCollection = collection => {
  /**
   * Add css props to elements
   * @param  {...any} cssArgs CSS Arguments. Can be strings, or objects
   */
  collection.css = (...cssArgs) => {
    if (typeof cssArgs[0] === 'string') {
      const [property, value] = cssArgs;
      collection.forEach((element) => {
        element.style[property] = value;
      })
    } else if (typeof cssArgs[0] === 'object') {
      const cssProps = Object.entries(cssArgs[0]);
      collection.forEach((element) => {
        cssProps.forEach(([property, value]) => {
          element.style[property] = value;
        })
      })
    }
  }

  /**
   * Adds event listener to elements
   * @param {string} eventName The HTML event listener
   * @param {function} handler Handler function when the listener is triggered
   */
  collection.on = (eventName, handler) => {
    collection.forEach(element => {
      element.addEventListener(eventName, handler);
    })
  }

  /**
   * ForEach element handler
   * @param {function} handler ForEach handler function
   */
  collection.each = (handler) => {
    collection.forEach((element, i) => {
      const boundFn = handler.bind(element);
      boundFn(i, element);
    })
  };

  return collection;
}

const $ = (...args) => {
  if (typeof args[0] === 'function') {
    // Document.ready function
    const readyFn = args[0];
    document.addEventListener('DOMContentLoaded', readyFn);
  } else if (typeof args[0] === 'string') {
    // QuerySelector
    const query = args[0];

    const collection = makeNiceCollection(document.querySelectorAll(query));

    return collection

  } else if (args[0] instanceof HTMLElement) {
    const collection = makeNiceCollection([args[0]]);
    return collection;
  }
}