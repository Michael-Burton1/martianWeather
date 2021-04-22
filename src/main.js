import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PicOfDay from "./js/picOfDay.js";
import InSightAPI from "./js/insight.js";
import Position from "./js/positionStack.js";

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
    return $("#displayLocationInfo").html(`Latitude: ${body.data[0].latitude} Longitude: ${body.data[0].longitude}`);
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