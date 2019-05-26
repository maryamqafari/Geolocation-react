import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const google = window.google;


var x = document.getElementById("demo");
const __app_code = "5jLegdvPrJqNuM4uTozN9g";
const __app_id = "aEGh1zJ0shGezyfEAlsK";
const actionBtn = document.getElementById('searchProperties');
const mapArea = document.getElementById('map');

const $ = id => document.getElementById(id);

const locationsAvailable = document.getElementById('locationList');
let Gmap, Gmarker;

function displayLocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const latlng = {
      lat,
      lng
    };
    showMap(latlng, lat, lng);
    createMarker(latlng);
    mapArea.style.display = "block";
    getGeolocation(lat, lng);
  }; // Recreates the map
  

  
function getLocation() {
  if (navigator.geolocation) {
    displayLocation(navigator.geolocation.getCurrentPosition());
  } else {
    toast.info('Geolocation is not supported by this browser.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
  }
}

function getPlaces (position) {
  const latlong = position.coords.latitude + "," + position.coords.longitude;

  const __key = "app_id=" + __app_id + "&app_code=" + __app_code;

  fetch(`https://places.cit.api.here.com/places/v1/discover/around?${__key}&at=${latlong}`)
  .then(res => res.json()).then(data => populateCard(data.results.items));
};

function actionBtnn(e) {
  // hide the button 
  actionBtn.style.display = "none"; // call Materialize toast to update user 

  toast.info('Fetching your current location', {
    position: toast.POSITION.BOTTOM_CENTER
  });
  getLocation();
}; // displayLocation


function showMap(latlng, lat, lng) {
  let mapOptions = {
    center: latlng,
    zoom: 17
  };
  Gmap = new google.maps.Map(mapArea, mapOptions);
  Gmap.addListener('drag', function () {
    Gmarker.setPosition(this.getCenter()); // set marker position to map center
  });
  Gmap.addListener('dragend', function () {
    Gmarker.setPosition(this.getCenter()); // set marker position to map center
  });
  Gmap.addListener('idle', function () {
    Gmarker.setPosition(this.getCenter()); // set marker position to map center

    if (Gmarker.getPosition().lat() !== lat || Gmarker.getPosition().lng() !== lng) {
      setTimeout(() => {
        // console.log("I have to get new geocode here!")
        updatePosition(this.getCenter().lat(), this.getCenter().lng()); // update position display
      }, 2000);
    }
  });
}; // Creates marker on the screen


function createMarker(latlng) {
  let markerOptions = {
    position: latlng,
    map: Gmap,
    animation: google.maps.Animation.BOUNCE,
    clickable: true // draggable: true

  };
  Gmarker = new google.maps.Marker(markerOptions);
}; // updatePosition on 


function updatePosition(lat, lng){
  getGeolocation(lat, lng);
}; // Displays the different error messages


function showError (error){
  mapArea.style.display = "block";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapArea.innerHTML = "You denied the request for your location.";
      break;

    case error.POSITION_UNAVAILABLE:
      mapArea.innerHTML = "Your Location information is unavailable.";
      break;

    case error.TIMEOUT:
      mapArea.innerHTML = "Your request timed out. Please try again";
      break;

    case error.UNKNOWN_ERROR:
      mapArea.innerHTML = "An unknown error occurred please try again after some time.";
      break;
  }
};

const options = {
  enableHighAccuracy: true
};

function getGeolocation(lat, lng) {
  const __K = "AIzaSyBGCql0HlN4C_D7B2BcIIhtuFvjrdfvoew";
  const latlng = lat + "," + lng;
  debugger;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${__K}`)
  .then(res => res.json()).then(data => populateCard(data.results));
};

function removeAddressCards() {
  if (locationsAvailable.hasChildNodes()) {
    while (locationsAvailable.firstChild) {
      locationsAvailable.removeChild(locationsAvailable.firstChild);
    }
  }
}

function populateCard (geoResults) {
  // check if a the container has a child node to force re-render of dom
  removeAddressCards();
  geoResults.map(geoResult => {
    // first create the input div container
    const addressCard = document.createElement('div'); // then create the input and label elements

    const input = document.createElement('input');
    const label = document.createElement('label'); // then add materialize classes to the div and input

    addressCard.classList.add("card");
    input.classList.add("with-gap"); // add attributes to them

    label.setAttribute("for", geoResult.place_id);
    label.innerHTML = geoResult.formatted_address;
    input.setAttribute("name", "address");
    input.setAttribute("type", "radio");
    input.setAttribute("value", geoResult.formatted_address);
    input.setAttribute("id", geoResult.place_id); // input.addEventListener('click', e => console.log(123));

    input.addEventListener('click', () => inputClicked(geoResult)); // finalResult = input.value;

    let finalResult = geoResult.formatted_address;
    addressCard.appendChild(input);
    addressCard.appendChild(label); 
    // console.log(geoResult.formatted_address)

    return locationsAvailable.appendChild(addressCard);
  });
};

function inputClicked(result) {
  result.address_components.map(component => {
    const types = component.types;

    if (types.includes('postal_code')) {
      $('postal_code').value = component.long_name;
    }

    if (types.includes('locality')) {
      $('locality').value = component.long_name;
    }

    if (types.includes('administrative_area_level_2')) {
      $('city').value = component.long_name;
    }

    if (types.includes('administrative_area_level_1')) {
      $('state').value = component.long_name;
    }

    if (types.includes('point_of_interest')) {
      $('landmark').value = component.long_name;
    }
  });
  $('address').value = result.formatted_address; // to avoid labels overlapping prefilled contents

 // updateTextFields();
  removeAddressCards();
};