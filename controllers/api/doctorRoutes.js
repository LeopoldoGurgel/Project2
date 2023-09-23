const router = require('express').Router();
const {authDoc, authPat, authSpecPat} = require('./../../utils/auth');
const sendEmail = require('./../../utils/emailer');;
const { Appointment, Patient } = require('./../../models');
// '/api/doctor'

// Patient Information (GET) TBD in patient routes


// check for authDoc

// get retrieves
// post adds
// put updates
// delete deletes



// Doctor search (GET): 
//     search by name, age, app, condition, clinic/zoom, 
//     [more info links to patient info page]


// Add appointment (POST)
const exampleAppointment = {
  "appointmentDate": "2023-11-15",
  "appointmentTime": "3pm",
  "doctor_id": 1,
  "patient_id": 1,
  "reason": "backpain",
  "anamnesis": "Patient complains about persistent backpain started about a year ago. It is primarily located on lombar region and it gets works after long and hard days of work as a carpenter. The patient deescribes it as very intense (8 out of 10. There is no history of recent trauma.",
  "physical_exam": "Nothing to keep note about vital signs, cardiorrespiratory, digestive or endocrine systems. Lasegue test is positive on the right.",
  "initial_diagnosis": "lumbar hernia",
  "tests_needed": "MRI",
  "prescription": "Ibuprofen 400mg twice a day for 5 days.",
  "orientation": "10 days of rest from work. Avoid lifting heavy weights.",
  "next_appointment": "2023-12-15"
};
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



module.exports = router;