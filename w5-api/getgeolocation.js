const myElement = document.getElementById("demo");
const myMap = document.getElementById("map").querySelector("iframe");


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    myElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  myElement.innerHTML = "Latitude: " + position.coords.latitude +
   "<br>Longitude: " + position.coords.longitude;

   // const mapUrl = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
   const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude - 0.005},${position.coords.latitude - 0.005},${position.coords.longitude + 0.005},${position.coords.latitude + 0.005}&layer=mapnik&marker=${position.coords.latitude},${position.coords.longitude}`; 
   myMap.src = mapUrl;
}
