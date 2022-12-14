const fortune = require("./fortune").getFortune();
const tours = require("./tours");

exports.home = (req, res) => {
  console.log('Temos monster aqui? ', req.cookies.monster); // to recover a cookie
  req.session.username = 'Anonymous';
  const colorScheme = req.session.colorScheme || 'dark';
  res.cookie('monster', 'nom nom');
  res.cookie('signed_monster', 'nom nom', { signed: true });
  return res.render("home");
}

exports.about = (_req, res) => res.render("about", { fortune });

exports.notFound = (_req, res) => res.render("404");

exports.serverError = (_err, _req, res, _next) => res.render("500");

exports.tours = (_req, res) => res.render("tours", { tours });

exports.foo = (_req, res) => res.render("foo", { layout: "microsite" });

exports.test = (_req, res) => res.render("section-tests");

exports.newsletterSignup = (_req, res) =>
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });

exports.newsletterSignupProcess = (req, res) => {
  console.log("Form from query string: ", req.query.form);
  console.log("CSRF token: ", req.body._csrf);
  console.log("Name: ", req.body.name);
  console.log("Email: ", req.body.email);
  return res.redirect(303, "/newsletter-signup/thank-you");
};

exports.newsletterSignupThankYou = (_req, res) =>
  res.render("newsletter-signup-thank-you");

exports.newsletter = (_req, res) =>
  res.render("newsletter", { csrf: "CSRF TOKEN goes here ..." });

exports.api = {
  newsletterSignup: (req, res) => {
    console.log("Form from query string: ", req.query.form);
    console.log("CSRF token: ", req.body._csrf);
    console.log("Name: ", req.body.name);
    console.log("Email: ", req.body.email);
    return res.send({ result: "success" });
  },
  vacationPhotoContest: (req, res) => {
    // console.log('field data: ', fields);
    console.log(req.headers);
    return res.send({ result: "success" });
    // return res.redirect(303, "/contest/vacation-photo-thank-you");
  },
};

exports.vacationPhotoContestProcess = (_req, res) => {
  return res.render("contest/vacation-photo");
  // res.redirect(303, '/contest/vacation-photo-thank-you');
};

exports.vacationPhotoThankYou = (_req, res) =>
  res.render("contest/vacation-photo-thank-you");
