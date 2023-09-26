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
        age: req.query.text,
      }})
      .then((data) => {
        // console.log(data)
        res.json(data.dataValues);
      });
  }

  
  // search by appointment time
  if (req.query.searchFor == '3') {
    Appointment.findOne({
      where: {
        appointmentTime: req.query.text,
      }})
      .then((data) => {
        // data is from appointment
        // return patient data not appointment data
        console.log(data)
      Patient.findOne({
        where: {
          id: data.dataValues.patient_id,
        }})
        .then((response) => {
          res.json(response.dataValues);
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
    console.log(req.body)
    const appt = {
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      doctor_id: 1,
      patient_id: 1,
      reason: req.body.concern,
      anamnesis: "Patient complains about persistent backpain started about a year ago. It is primarily located on lombar region and it gets works after long and hard days of work as a carpenter. The patient deescribes it as very intense (8 out of 10. There is no history of recent trauma.",
      physical_exam: "Nothing to keep note about vital signs, cardiorrespiratory, digestive or endocrine systems. Lasegue test is positive on the right.",
      initial_diagnosis: "lumbar hernia",
      tests_needed: "MRI",
      prescription: "Ibuprofen 400mg twice a day for 5 days.",
      orientation: "10 days of rest from work. Avoid lifting heavy weights.",
      next_appointment: "2023-12-15"

    }
    console.log('in post route')
    await Appointment.create(appt)
      .then((data) => {
        //     // format the email msg
            let msg = `You have an appointment schedueled for ${req.body.appointmentDate} at ${req.body.appointmentTime} for ${req.body.concern}.`;
        //     // send the email
            sendEmail(req.body.email, 'Appointment', msg)
            res.json(data);
      });

      // for sending an email to the patient's email
      // .then((data) => {
      //   // send an email that an appointment was created
      //   // get email of patient using patient id
      //   Patient.findOne({
      //     where: {
      //       id: req.body.patient_id
      //     }
      //   }) .then ((patData) => {
      //     // format the email msg
      //     let msg = `You have an appointment schedueled for ${data.appointmentDate} at ${data.appointmentTime} for ${data.reason}.`;
      //     // send the email
      //     sendEmail(patData.email, 'Appointment', msg)
      //   })
      //   res.json(data);
      // })


  } catch (err) {
    console.log(err)
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