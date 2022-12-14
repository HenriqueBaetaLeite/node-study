const express = require("express");
const { engine, create } = require("express-handlebars");

const multiparty = require("multiparty");

const cookieParser = require("cookie-parser");

const expressSession = require("express-session");

const morgan = require("morgan");
const fs = require("fs");

const weatherMiddleware = require("./libs/middleware/weather");

const flashMiddleware = require("./libs/middleware/flash");

const handlers = require("./libs/handlers");

const { credentials } = require("./config");


const app = express();

app.use(express.json());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);

app.use(cookieParser(credentials.cookieSecret));

app.use(flashMiddleware);

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
      section: function (name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

// Ativa o cache de views, pois por padrão, é desativado no modo de desenvolvimento e ativado
// no modo de produção:
app.set("view cache", true);

app.use(express.static(__dirname + "/public"));

app.disable("x-powered-by"); // desativa o cabeçalho X-Powered-By padrão do Express

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

app.get("/foo", handlers.foo);

app.get("/section-tests", handlers.test);

app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.get("/contest/vacation-photo", handlers.vacationPhotoContestProcess);
app.post(
  "/api/vacation-photo-contest",
  handlers.api.vacationPhotoContest,
  (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).send({ error: err.message });
      handlers.vacationPhotoContestProcess(req, res, fields, files);
    });
  }
);

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

switch (app.get("env")) {
  case "development":
    app.use(morgan("dev"));
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", {
      flags: "a",
    });
    app.use(morgan("combined", { stream }));
    break;
}

if (require.main === module) {
  app.listen(
    port,
    () => console.log("Running on port ", port),
    // `${app.get("env")} mode at http://localhost:${port}`,
    // `; press CTRL-C to terminate`
  );
} else {
  module.exports = app;
}
