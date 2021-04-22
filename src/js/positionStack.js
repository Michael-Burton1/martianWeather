export default class Position {
  static getPosition(location) {
    return new Promise(function(resolve, reject){
      const apikey = process.env.LAT_LON_API_KEY;
      let request = new XMLHttpRequest();
      const url = `http://api.positionstack.com/v1/forward?access_key=${apikey}&query=${location}`;

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else { 
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

