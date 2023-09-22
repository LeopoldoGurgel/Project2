
// create reations and models
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');
const User = require('./User');

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

User.hasMany(Patient, {
  foreignKey: 'user_id',
  onDelete: "RESTRICT"
});

Patient.belongsTo('User', {
  foreignKey: 'user_id'
});

User.hasMany(Doctor, {
  foreignKey: 'user_id',
  onDelete: "RESTRICT"
});

Doctor.belongsTo('User', {
  foreignKey: 'user_id'
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

module.exports = { Patient, Doctor, Appointment, User };

