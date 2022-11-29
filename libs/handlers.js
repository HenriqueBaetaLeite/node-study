const fortune = require('./fortune').getFortune();
const tours = require('./tours');

exports.home = (_req, res) => res.render('home');

exports.about = (_req, res) => res.render('about', { fortune });

exports.notFound = (_req, res) => res.render('404');

exports.serverError = (_err, _req, res, _next) => res.render('500');

exports.tours = (_req, res) => res.render('tours', { tours });
