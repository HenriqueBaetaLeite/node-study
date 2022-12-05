const express = require("express");
const { engine, create } = require("express-handlebars");

const weatherMiddleware = require('./libs/middleware/weather');

const handlers = require("./libs/handlers");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

// Aqui podemos utilizar diversos tipos de "configurações", observar documentação oficial
// const hbs = create();
// app.engine("handlebars", hbs.engine);

// app.engine(
//   "handlebars",
//   engine({
//     defaultLayout: "main",
//   })
// );

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: {
      section: function(name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null
      },
    },
  })
);

app.set("view engine", "handlebars");
app.set('views', './views');

// Ativa o cache de views, pois por padrão, é desativado no modo de desenvolvimento e ativado
// no modo de produção:
app.set('view cache', true);

app.use(express.static(__dirname + "/public"));

app.disable('x-powered-by'); // desativa o cabeçalho X-Powered-By padrão do Express

app.get("/", weatherMiddleware, handlers.home);

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

app.get('/foo', handlers.foo);

app.get('/section-tests', handlers.test);

app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

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
