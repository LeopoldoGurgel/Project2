const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

// checks if user is a doctor
const authDr = (req, res, next) => {
  if (!req.session.isDoc) {
    res.redirect('/');
  }
  next();
};

// check for specific patient auth


module.exports = {withAuth, authDr};
