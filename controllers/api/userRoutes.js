const router = require('express').Router();
const { Doctor, Patient } = require('../../models');
const { truncate } = require('../../models/Patient');

router.post('/login', async (req, res) => {
  //look up the user  - using the id from the body

  console.log(req.body)

  try {
    const doctorData = await Doctor.findOne({
      where: {
        username: req.body.username
      }
    });
    console.log(doctorData);

    const patientData = await Patient.findOne({
      where: { username: req.body.username }
    });


    // By default, consider it a failed password
    let isValidPassword=false;
    let isDoctor=false;
    let postLoginURL = '/';
    if (doctorData) {
      isValidPassword = doctorData.checkPassword(req.body.password);
      safeData = {...doctorData.get({plain: true}), password: ""}      
      userData = safeData;
      console.log(safeData);
      isDoctor = true;
      postLoginURL= "/drSearch";



    } else if (patientData) {
      console.log("got into patientData")
      isValidPassword = patientData.checkPassword(req.body.password);
      safeData = {...patientData.get({plain:true}), password: ""}      
      userData = safeData;
      console.log(safeData);
      isDoctor = false;
      postLoginURL= "/patientInfo";
    }
 
    // checking that it is NOT valid, and sending an error
    if (!isValidPassword) {
      console.log("TESTING 456 ----------------------------")
      return res.status(401).json({ message: "Incorrect username or password. Please try again." });
    }

    //if we are here we have a valid password

    req.session.save(() => {
      req.session.userid =userData.id
      req.session.isDoctor = isDoctor;
      req.session.loggedIn = true;
      req.session.userData = userData;
      res.json({ user: userData, loggedIn: true, postLoginURL: postLoginURL, message: "You are now logged in" });
      res.status(200);
    });
  

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
});
router.post('/signup', async (req, res) => {
  try {
    // Check if a patient with the same email already exists
    console.log ( req.body.email)
    const existingPatient = await Patient.findOne({where:{ email: req.body.email }});
console.log("about to log existing patient")
    console.log(existingPatient)
    if (existingPatient) {
      return res.status(400).json({ error: 'Patient already exists' });
    }

    // If the patient does not exist, create a new one
    const patient = await Patient.create(req.body);
    res.status(200).json({ id: patient.id });
    console.log(patient.id);
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router   