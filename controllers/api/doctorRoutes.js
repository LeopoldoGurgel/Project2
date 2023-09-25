const router = require('express').Router();
const {authDoc, authPat, authSpecPat} = require('./../../utils/auth');
const sendEmail = require('./../../utils/emailer');
const { Appointment, Patient } = require('./../../models');
// '/api/doctor'

// Patient Information (GET) TBD in patient routes

// check for authDoc

// Doctor search (GET): 
//     search by name, age, app, condition, clinic/zoom, 
//     [more info links to patient info page]
router.get('/')


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