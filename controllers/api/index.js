

const router = require('express').Router();

const patientRoutes = require('./patientRoutes.js');
const userRoutes = require('./userRoutes.js');
const doctorRoutes = require('./doctorRoutes.js');

router.use('/user', userRoutes);
router.use('/patient', patientRoutes);
router.use('/doctor', doctorRoutes)

module.exports = router;

