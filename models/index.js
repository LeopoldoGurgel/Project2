
// create reations and models
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');
const User = require('./User');

Patient.hasMany(Appointment, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT'
});

Appointment.belongsTo(Patient, {
  foreignKey: 'user_id'
});

Doctor.hasMany(Appointment, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT'
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'user_id'
});

User.hasMany(Patient, {
  foreignKey: 'id',
  onDelete: "RESTRICT"
});

Patient.belongsTo(User, {
  foreignKey: 'id'
});

User.hasMany(Doctor, {
  foreignKey: 'id',
  onDelete: "RESTRICT"
});

Doctor.belongsTo(User, {
  foreignKey: 'id'
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

