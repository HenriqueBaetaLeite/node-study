const express = require("express");
const { engine, create } = require("express-handlebars");

const handlers = require("./libs/handlers");

const app = express();

const port = process.env.PORT || 3001;

// Aqui podemos utilizar diversos tipos de "configurações", observar documentação oficial
const hbs = create();
app.engine("handlebars", hbs.engine);

// app.engine(
//   "handlebars",
//   engine({
//     defaultLayout: "main",
//   })
// );

app.set("view engine", "handlebars");
// app.set('views', './views');

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

// app.get("/", (_req, res) => {
//   res.type("text/plain");
//   res.send("Meadowlark Travel");
// });

// app.get("/about", (_req, res) => {
//   res.type("text/plain");
//   res.send("About Meadowlark Travel");
// });

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => console.log("Running on port ", port));
} else {
  module.exports = app;
}
