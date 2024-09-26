// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// search the URL for the "key" (product) parameter, return the "value" (Prod_ID)
export function getParams(param) {

  // produces the URL string after "?"
  const queryString = window.location.search;

  // parse the string parameters
  const urlParams = new URLSearchParams(queryString);

  // looks for "value" associated to the provided "key"
  const product = urlParams.get(param)

  // returns the value (if any)
  if (product) {
    return product;
  } else {
    console.log(param, "is not a valid field");
    return null;
  }
}