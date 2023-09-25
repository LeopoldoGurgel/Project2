const router = require('express').Router();
const {authDoc, authPat, authSpecPat} = require('./../../utils/auth');
const sendEmail = require('./../../utils/emailer');
const { Appointment, Patient } = require('./../../models');
// '/api/doctor'

// Patient Information (GET) TBD in patient routes

// check for authDoc

// Doctor search (GET): 
//     search by name, age, appointment date
router.get('/drSearch', (req, res) => {
  try {
    // search by name
    if (req.query.searchFor == '1') {
      Patient.findOne({
        where: {
          fullName: req.query.text,
        }})
        .then((data) => {
          res.json(data.dataValues);
        });
    }

  // search by age
  if (req.query.searchFor == '2') {
    Patient.findOne({
      where: {
        Age: req.query.text,
      }})
      .then((data) => {
        console.log(data)
        // res.json(data.dataValues);
      });
  }

  
  // search by appointment time
  if (req.query.searchFor == '3') {
    Appointment.findAll({
      where: {
        appointmentTime: req.query.text,
      }})
      .then((data) => {
        // data is from appointment
        // return patient data not appointment data
      Patient.findOne({
        where: {
          fullName: req.query.text,
        }})
        .then((data) => {
          res.json(data.dataValues);
        });
      });
  }


} catch (err) {
  res.status(500).json(err);
}
});


// Add appointment (POST)
router.post('/appointment', authDoc, async (req, res) => {
  try {
    const appt = await Appointment.create(req.body)
      .then((data) => {
        // send an email that an appointment was created
        // get email of patient using patient id
        Patient.findOne({
          where: {
            id: req.body.patient_id
          }
        }) .then ((patData) => {
          // format the email msg
          let msg = `You have an appointment schedueled for ${data.appointmentDate} at ${data.appointmentTime} for ${data.reason}.`;
          // send the email
          sendEmail(patData.email, 'Appointment', msg)
        })
        res.json(data);
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit patient info (PUT)
// auth to check for a specific patient?
router.put('/:id', (req, res) => {
  Patient.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
.then((data) => {
  res.json(data);
})
.catch((err) => {
  res.status(500).json(err);
})
});


module.exports = router;