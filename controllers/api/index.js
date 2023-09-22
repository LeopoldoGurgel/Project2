
const router = require('express').Router();

const patientRoutes = require('./patientRoutes.js')
const userRoutes = require('./userRoutes.js')

router.use('/user', userRoutes);
router.use('/patient', patientRoutes);

module.exports = router;

