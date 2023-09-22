
// create reations and models
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');


Patient.hasMany(Appointment, {
  foreignKey: 'patient_id',
  onDelete: 'RESTRICT'
});

Appointment.belongsTo(Patient, {
  foreignKey: 'patient_id'
});

Doctor.hasMany(Appointment, {
  foreignKey: 'doctor_id',
  onDelete: 'RESTRICT'
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'doctor_id'
});



// lines below throws errors when trying to run seed.js

// Doctor.belongsToMany(Patient, {
//   through: "appointment",
//   foreignKey: 'doctor_id'
// });

// Patient.belongsToMany(Doctor, {
//   through: 'appointment',
//   foreignKey: 'patient_id'
// })

module.exports = { Patient, Doctor, Appointment };

