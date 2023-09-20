// seeds file

const sequelize = require('../config/connection');
const { Patient, Doctor, Appointment } = require('../models');

const patientSeedData = require('./patientSeedData.json');
const doctorSeedData = require('./doctorSeedData.json');
const appointmentSeedData = require('./appointmentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const patient = await Patient.bulkCreate(patientSeedData);

  const doctor = await Doctor.bulkCreate(doctorSeedData);

  const appointment = await Appointment.bulkCreate(appointmentSeedData); 


  process.exit(0);
};

seedDatabase();
