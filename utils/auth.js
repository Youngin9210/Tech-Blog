const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  !req.session.logged_in ? res.redirect('/login') : next();
};

module.exports = withAuth;
