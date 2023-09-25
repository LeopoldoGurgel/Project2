const authPat = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
  // check patient id?
};

// checks if user is a doctor
const authDoc = (req, res, next) => {
  if (!req.session.isDoctor) {
    res.redirect('/');
  }
  next();
};

// check for specific patient auth

const authSpecPat = (req, res, next) => {
  // check if session id is a patient
  // does req for 
}


module.exports = {authPat, authDoc, authSpecPat};
