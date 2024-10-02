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
export function getParam(param) {
  const queryString = window.location.search;           // produces the URL string after "?"
  const urlParams = new URLSearchParams(queryString);   // parse the string parameters
  const product = urlParams.get(param)                  // looks for "value" associated to the provided "key"
  // returns the value (if any)
  if (product) {
    return product;
  } else {
    console.log(param, "is not a valid parameter");
    return null;
  }
}

export function renderListWithTemplate(templateFN, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFN);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(url) {
  const html = await fetch(url);
  const htmlText = await html.text();
  // const template = document.createElement("template");
  // template.innerHTML = htmlText;
  return htmlText;
}

export async function loadHeaderFooter() {
  const headerTemp = await loadTemplate("../partials/header.html");
  const footerTemp = await loadTemplate("../partials/footer.html");
  const docHeader = document.getElementById("main-header");
  const docFooter = document.getElementById("main-footer");
  renderWithTemplate(headerTemp, docHeader);
  renderWithTemplate(footerTemp, docFooter);
}
