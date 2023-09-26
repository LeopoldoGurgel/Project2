const router = require('express').Router();
const { Doctor, Patient, User, Appointment } = require('../models');
const { authPat, authDoc } = require('../utils/auth');
// const userData = require('express').Router();


// router.get('/doctor', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const doctorData = await Doctor.findAll();

//     // Serialize data so the template can read it
//     const doctors = doctorData.map((doctor) => doctor.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     // in this case doctors will be an array.
//     res.render('docinfo', { 
//       doctors});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/doctor/:id', async (req, res) => {
//   try {
//     const doctorData = await Doctor.findByPk(req.params.id);

//     const doctor = doctorData.get({ plain: true });

//     res.render('doctorinfo', {...doctor});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
  try {
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err)
  }
});

// patient Info page
// accessable only by 1 patient and their doctor
router.get('/patientInfo', authPat, (req, res) => {

  res.render('patientInfo', {
    // isDoc,
    loggedIn: true,
    userData: req.session.userData
  });
});

//patient info page from dr search page

router.get('/drpatientInfo/:id', authPat, async (req, res) => {
  console.log("first line dr / patient info")
  const patientData = await Patient.findByPk (req.params.id)
  const safeData = {...patientData.get({plain:true}), password: ""}      
    if (!req.session.userData.isDoctor) {
      console.log("was not a doctor")
      res.status(404)
      return
    }
    console.log ("about to render")
  res.render('patientInfo', {
    isDoc: true,
    loggedIn: true,
    userData: safeData
  });
});

router.get('/drSearch', authDoc, async (req, res) => {
  res.render('drSearch', {
    // isDoc,
    loggedIn: true,
    userData: req.session.userData
    // userData
  })
});

// add appointment
// accessable only by the doctor
router.get('/addappt/:id', authDoc, async (req, res) => {
  const patientData = await Patient.findByPk (req.params.id)
  const safeData = {...patientData.get({plain:true}), password: ""}      
    if (!req.session.userData.isDoctor) {
      console.log("was not a doctor")
      res.status(404)
      return
    }
    console.log ("about to render")
  res.render('addappt', {
    isDoc: true,
    loggedIn: true,
    userData: safeData
  })
});

//global pages
// no security

router.get('/doctorInfo', async (req, res) => {
  res.render('doctorInfo')
});


router.get('/clinicInfo', (req, res) => {

  res.render('clinicInfo')
});

router.get('/newPatient', (req, res) => {

  res.render('newPatient')
});
module.exports = router;
