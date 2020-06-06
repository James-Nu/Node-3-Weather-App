const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c4f3bc3528e6c826a44d24bcd5537a29&query=" +
    lat +
    "," +
    long +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Servers", undefined);
    } else if (body.error) {
      callback("Unable to find the location you entered", undefined);
    } else {
      callback(undefined, {
        currentWeather:
          "The weather is currently " +
          body.current.temperature +
          "°C" +
          " And the forecast is " +
          body.current.weather_descriptions,
      });
    }
  });
};

module.exports = forecast;
