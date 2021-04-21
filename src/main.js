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
      if (body.media_type === "image") {
        $("#showPic").html(`<img src="${body.url}"/>`);
      } else if (body.media_type === "video") {
        $("#showPic").html(`<iframe src="${body.url}"></iframe>`);
      }
    }, function (error) {
      console.error("Request error: ", error);
    });

  });
});

