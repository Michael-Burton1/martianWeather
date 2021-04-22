export default class EarthApi {
  static getImage(latitude, longitude){
    let url = `http://api.nasa.gov/planetary/earth/imagery?api_key=${process.env.API_KEY}&lat=${latitude}&lon=${longitude}`;
    return fetch(url) //Earth API doesn't return a JSON so everything is broken don't look at this for example
      .then(function(response){
        if(!response.ok){
          console.log(response);
          throw Error(response.statusText);
        }
        return response.body;
      })
      .catch(function(error){
        return Error(error);
      });
  }
}