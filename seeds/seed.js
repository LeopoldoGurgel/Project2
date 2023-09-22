// seeds file

const sequelize = require('../config/connection');
const { Patient, Doctor, Appointment, User } = require('../models');

const appointmentSeedData = require('./appointmentSeedData.json');
const patientSeedData = require('./patientSeedData.json');
const doctorSeedData = require('./doctorSeedData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const patientData of patientSeedData) {
    const user = await User.create({
      isDoctor: false // For patients, set isDoctor to false
    });
    const patient = await Patient.create({
      ...patientData,
      user_id: user.id
    });
  }

  for (const doctorData of doctorSeedData) {
    const user = await User.create({
      isDoctor: true // For doctors, set isDoctor to true
    });
    const doctor = await Doctor.create({
      ...doctorData,
      user_id: user.id
    });
  }

  const appointment = await Appointment.bulkCreate(appointmentSeedData);

  process.exit(0);
};

seedDatabase();
