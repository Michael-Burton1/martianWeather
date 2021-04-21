import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PicOfDay from "./picOfDay.js";

$(document).ready(function () {
  $("#picBtn").click(function () {
    let inputtedDate = $("#inputtedDate").val();

    $("#show").text(inputtedDate);

    let picPromise = PicOfDay.getPic(inputtedDate);
    picPromise.then(function (response) {
      const body = JSON.parse(response);
      $("#showPic").html(`<img src="${body.url}"/>`);
    }, function (error) {
      console.error("Request error: ", error);
    });

  });
});

