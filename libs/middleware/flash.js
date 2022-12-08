module.exports = (req, res, next) => {
  console.log('o q tem aqui?', req.session);
  res.locals.flash = req.session;
  delete req.session.flash;
  next();
};
