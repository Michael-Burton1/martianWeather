export default class PicOfDay {
  static getPic(date) {
    return new Promise(function (resolve, reject) {
      const apiKey = process.env.API_KEY;
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

      request.onload = function () { //onload is lowercase @.@
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true); // "GET" is type of request, url api call, true determines if its async
      request.send();
    });
  }
}