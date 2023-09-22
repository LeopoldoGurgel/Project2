const router = require('express').Router();

router.post('/login', async (req, res) => {
    try { console.log ("got to login")
    //   // Get all projects and JOIN with user data
    //   const doctorData = await Doctor.findAll();
  
    //   // Serialize data so the template can read it
    //   const doctors = doctorData.map((post) => doctor.get({ plain: true }));
  
    //   // Pass serialized data and session flag into template
    //   res.render('doctors', { 
    //     doctors});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;