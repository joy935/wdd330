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

export function renderWithTemplate(template, parent, data={}, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
 
  // Update cart icon if data is provided
  if (data.countCart !== undefined) {
    const cartCountElement = document.querySelector('#cart-item-count');
    cartCountElement.textContent = data.countCart > 0 ? data.countCart : '';
    cartCountElement.style.display = data.countCart > 0 ? 'inline' : 'none';
  }

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

  const storageItems= getLocalStorage("so-cart");

  // render header.html
  if (storageItems) {
    const countCart = storageItems.length; // count number of items in carts
    renderWithTemplate(headerTemp, docHeader,{ countCart });
  } else {
    renderWithTemplate(headerTemp, docHeader);
  }
  // render footer.html
  renderWithTemplate(footerTemp, docFooter);
}

// handling the unhappy path (form validation)
export function alertMessage(message, scroll=true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  // set the contents of the alert
  alert.innerHTML = `<p>${message}</p>
    <button class="close-alert">X</button>`;
  alert.style.display = "block";

  // add the alert to the page
  // document.body.appendChild(alert);

  // add an event listener to the close button
  alert.querySelector(".close-alert").addEventListener("click", () => {
    alert.remove();
  });

  // add the alert to the page
  const main = document.querySelector("main");
  main.prepend(alert);

  // scroll to the top of the page
  if (scroll) {
    window.scrollTo(0, 0);
  }
}