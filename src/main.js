import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import PicOfDay from "picOfDay.js"

$(document).ready(function () {
  $("#picBtn").click(function () {
    let inputtedDate = $("#inputtedDate").val();

    inputtedDate()
  })
})

