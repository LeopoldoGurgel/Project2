
// create reations and models
const Patient = require('./Patient');
const Record = require('./Record');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment')

Patient.hasOne(Record, {
  foreignKey: 'patient_id',
  onDelete: 'RESTRICT'
});

Record.belongsTo(Patient, {
  foreignKey: 'patient_id'
});

Record.hasMany(Appointment, {
    foreignKey: 'record_id',
    onDelete: 'RESTRICT'
});

Appointment.belongsTo(Record, {
    foreignKey: 'record_id'
});

Doctor.hasMany(Patient, {
    foreignKey: 'doctor_id',
    onDelete: 'SET NULL'
});

Patient.belongsTo(Doctor, {
    foreignKey: 'doctor_id'
});

module.exports = { Patient, Record, Doctor, Appointment };

