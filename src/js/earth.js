export default class EarthApi {
  static getImage(latitude, longitude){
    let url = `https://api.nasa.gov/planetary/earth/imagery?api_key=${process.env.API_KEY}&lat=${latitude}&lon=${longitude}`;
    return fetch(url)
      .then(function(response){
        if(!response.ok){
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error){
        return error;
      });
  }
}