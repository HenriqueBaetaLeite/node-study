const fortune = require("./fortune").getFortune();
const tours = require("./tours");

exports.home = (_req, res) => res.render("home");

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
  res.render("newsletter", { csrf: "CSRF goes here" });

exports.api = {
  newsletterSignup: (req, res) => {
    console.log("Form from query string: ", req.query.form);
    console.log("CSRF token: ", req.body._csrf);
    console.log("Name: ", req.body.name);
    console.log("Email: ", req.body.email);
    return res.send({ result: "success" });
  },
};

exports.vacationPhotoContestProcess = (_req, res, fields, files) => {
  console.log('field data: ', fields);
  console.log('files: ', files);
  res.redirect(303, '/contest/vacation-photo-thank-you');
}
