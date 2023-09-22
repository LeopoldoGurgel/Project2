const router = require('express').Router();
const { Doctor, Patient, Record, Appointment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/doctor', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const doctorData = await Doctor.findAll();

    // Serialize data so the template can read it
    const doctors = doctorData.map((post) => doctor.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('doctors', { 
      doctors});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/doctor/:id', async (req, res) => {
  try {
    const doctorData = await Doctor.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('doctor', {...post});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// ------------------------------------------------
// web page basic routing
// homepage
// open route, no security
router.get('/', (req, res) => {
   try{
      res.render('homepage')
    }catch(err){
      res.status(500).json(err)
    }
});

// patient Info page
// accessable only by 1 patient and their doctor
router.get('/patientInfo', (req, res) => {
  // if the user is a doctor set true
  let isDoc = true;
  res.render('patientInfo', {
    isDoc,
  });
});

// dr search page
// accessable only by the doctor
// use middleware 'authDr'
router.get('/drSearch', (req, res) => {
  res.render('drSearch')
});

// add appointment
// accessable only by the doctor
router.get('/addappt', (req, res) => {
  res.render('addappt')
});




module.exports = router;