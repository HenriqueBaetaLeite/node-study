const getWeatherData = () =>
  Promise.resolve([
    {
      location: {
        name: "Portland",
        coordinates: { lat: 45.5154586, lng: -122.6783461 },
      },
      forecastUrl: "https://api.weather.gov/gridpoints/PQR/112,103/forecast",
      iconUrl: "",
      weather: "Chance Showers And ThunderStorms",
      temp: "59 F",
    },
    {
      location: {
        name: "Bend",
        coordinates: { lat: 44.0581728, lng: -21.3153096 },
      },
      forecastUrl: "https://api.weather.gov/gridpoints/PQR/112,103/forecast",
      iconUrl: "",
      weather: "Scattered Showers and Thunderstorms",
      temp: "51 F",
    },
  ]);

  const weatherMiddleware = async (req, res, next) => {
    if (!res.locals.partials) {
      res.locals.partials = {};
    }
    res.locals.partials.weatherContext = await getWeatherData();
    next();
  };

  module.exports = weatherMiddleware;
