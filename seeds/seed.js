// seeds file

const sequelize = require('../config/connection');
const { Patient, Doctor, Appointment } = require('../models');

const appointmentSeedData = require('./appointmentSeedData.json');
const patientSeedData = require('./patientSeedData.json');
const doctorSeedData = require('./doctorSeedData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const patientData of patientSeedData) {

    const patient = await Patient.create({
      ...patientData
    });
  }

  for (const doctorData of doctorSeedData) {
    const doctor = await Doctor.create({
      ...doctorData     
    });
  }

  const appointment = await Appointment.bulkCreate(appointmentSeedData);

  process.exit(0);
};

seedDatabase();
