// seeds file

const sequelize = require('../config/connection');
const { Patient, Doctor, Appointment, User } = require('../models');

const appointmentSeedData = require('./appointmentSeedData.json');
const patientSeedData = require('./patientSeedData.json');
const doctorSeedData = require('./doctorSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for(i=0; i<patientSeedData; i++){
    const user = await User.create();
  }
  const patient = await Patient.bulkCreate(patientSeedData);

  for(i=0; i< doctorSeedData; i++){
    const user = await User.create();
  }
  const doctor = await Doctor.bulkCreate(doctorSeedData);

  const appointment = await Appointment.bulkCreate(appointmentSeedData); 

  process.exit(0);
};

seedDatabase();
