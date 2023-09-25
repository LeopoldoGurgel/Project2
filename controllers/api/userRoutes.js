const router = require('express').Router();
const { Doctor, Patient } = require('../../models')

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
      isValidPassword = doctorData.checkPassword(req.body.password)
      userData = doctorData;
      isDoctor = true;
      postLoginURL= "/drSearch";

    } else if (patientData) {
      console.log("got into patientData")
      isValidPassword = patientData.checkPassword(req.body.password);
      userData = patientData;
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
      res.json({ user: userData, loggedIn: true, postLoginURL: postLoginURL, message: "You are now logged in" });
      res.status(200);
    });

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
});

router.post('/signup', async (req, res) => {
  console.log(req.body)

  const patient = await Patient.create(req.body);
res.status(200).json({id:patient.id})
console.log(patient.id);
})
module.exports = router   