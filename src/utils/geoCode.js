const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamFtZXNudW5vbyIsImEiOiJja2FocTJ1dTEwaXEzMzFveWFqZXZkZWU5In0.FAeQwcMHIzI3-1S3kgiMwg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Servers", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the location you entered, Please try again",
        undefined
      );
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        loc: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
