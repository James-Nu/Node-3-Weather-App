const path = require("path");
const express = require("express");
const request = require("request");
const app = express();
const hbs = require("hbs");
const geoCode = require("./src/utils/geoCode");
const forecast = require("./src/utils/forecast");

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//setup handlebars and view engines
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "James Nunoo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us ",
    description: "Kaadan tech is new and getting on its feet",
    name: "James Nunoo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need help ?",
    description: "How can we help you ?",
    name: "James Nunoo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geoCode(req.query.address, (error, { lat, long, loc } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        loc,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You mush provide a search value",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "James Nunoo",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 ",
    name: "James Nunoo",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
