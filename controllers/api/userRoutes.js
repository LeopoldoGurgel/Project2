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
    })
    console.log(doctorData);


    let patientData;
    if (doctorData == null) {

      patientData = await Patient.findOne({
        where: { username: req.body.username }
      })

      if (patientData == null) { 
        console.log("TESTING 123 ----------------------------")
        return res.status(400).json({ message: "Incorrect username or password. Please try again." }) }
    }

    let userData;
    let validPassword;
    if (doctorData) {
      validPassword = await doctorData.checkPassword(req.body.password)
      userData = doctorData;
    } else {
      validPassword = await patientData.checkPassword(req.body.password);
      userData = patientData;
    }
    console.log(userData);

    if (!validPassword) {
      console.log("TESTING 456 ----------------------------")
      return res.status(400).json({ message: "Incorrect username or password. Please try again." })
    }
//this should be moved to front end

    // if (doctorData) {
    //   console.log("TESTING 789 ----------------------------")
    //   res.render("drSearch")
    // } else {
    //   console.log("TESTING AAAAAAAA ----------------------------")
    //   res.render("patientInfo")
    // };

    req.session.save(() => {
      req.session.userid = userData.id;
      req.session.isDoctor = userData.isDoctor;
      req.session.loggedIn = true;
      res.json({ user: userData, postLoginURL: "/drSearch", message: "You are now logged in" });
      res.status(200);
    });

  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
  //validate that the password is associated with that user

  //check what type of user this person is

  //// req.session.isDoctor = true 


})
module.exports = router   