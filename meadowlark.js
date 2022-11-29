const express = require("express");
const { engine, create } = require("express-handlebars");
const expressHandlebars = require('express-handlebars');

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

// app.engine(
//   "handlebars",
//   expressHandlebars({
//     defaultLayout: "main",
//   })
// );

app.set("view engine", "handlebars");
// app.set('views', './views');

// Ativa o cache de views, pois por padrão, é desativado no modo de desenvolvimento e ativado
// no modo de produção:
app.set('view cache', true);

app.use(express.static(__dirname + "/public"));

app.disable('x-powered-by'); // desativa o cabeçalho X-Powered-By padrão do Express

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.get("/tours", handlers.tours);

app.get("/headers", (req, res) => {
  console.log(req.ip);
  res.type("text/plain");
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  return res.send(headers.join("/n"));
});

app.get('/foo', (_req, res) => res.render('foo', { layout: 'microsite' }));

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
