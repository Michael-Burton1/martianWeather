import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PicOfDay from "./js/picOfDay.js";
import InSightAPI from "./js/insight.js";
import Position from "./js/positionStack.js";
import EarthApi from "./js/earth.js";

$(document).ready(function () {
  $("#picBtn").click(function () {
    let inputtedDate = $("#inputtedDate").val();

    $("#show").text(inputtedDate);

    let picPromise = PicOfDay.getPic(inputtedDate);
    picPromise.then(function (response) {
      const body = JSON.parse(response);
      if (body.media_type === "image") {
        $("#showPic").html(`<img src="${body.url}"/>`);
      } else if (body.media_type === "video") {
        $("#showPic").html(`<iframe src="${body.url}"></iframe>`);
      }
    }, function (error) {
      console.error("Request error: ", error);
    });
  });

  $("#displayMarsWeatherButton").click(function () {
    let marsWeatherPromise = InSightAPI.getWeatherData();
    marsWeatherPromise.then(function (response) {
      displayWeatherData(response);
    });
  });
});

$("#locationBtn").click(function() {
  let inputtedLocation = $("#inputtedLocation").val();
  $("#show").text(inputtedLocation);

  let locationPromise = Position.getPosition(inputtedLocation);
  locationPromise.then(function (response) {
    const body = JSON.parse(response);
    $("#displayLocationInfo").html(`Latitude: ${body.data[0].latitude} Longitude: ${body.data[0].longitude}`);
    return body;
  }, function(error){
    throw Error(`Geocode API error: ${error}`);
  })
    .then(function(locationResponse){
      const lat = locationResponse.data[0].latitude;
      const lon = locationResponse.data[0].longitude;
      let earthImagePromise = EarthApi.getImage(lat, lon);
      return earthImagePromise;
    })
    .then(function(earthResponse){ //ignore everything dealing with Earth API for example
      if (earthResponse instanceof Error){ // dont let instanceof ruin your day. its all lowercase
        throw Error(`Earth API error: ${earthResponse.message}`);
      }
      $("#displayMap").html(`<img src="${earthResponse}"/>`);
    })
    .catch(function(error) {
      $("#displayLocationInfo").html(`<p>${error.message}</p>`);
    });
});

function displayWeatherData(inputResponse) {
  let solKeys = inputResponse.sol_keys;
  if (solKeys) {
    let htmlString = "";
    solKeys.forEach(function (element) {
      const sol = inputResponse[element];
      htmlString +=
        `<p>Day: ${sol.First_UTC}, 
        Season: ${sol.Season}, 
        Pressure: ${sol.PRE.av}<p>`;
    });
    $("#marsWeatherDisplay").html(htmlString);
  } else {
    $("#marsWeatherDisplay").html(`<p>There was an error: ${inputResponse.message}</p>`);
  }
}