const router = require('express').Router();

router.post('/login', async (req, res) => {
    //look up the user  - using the id from the body
try {
  const doctorData = await doctor.findOne({
  where: {
    username: req.body.username
  }
})

if (!doctorData) {
  res.status(400).json({message: "Incorrect username or password. Please try again."})
}

const validPassword = await doctorData.checkPassword(req.body.password)

if (!validPassword) {
  res.status(400).json({message:"Incorrect username or password. Please try again." })
}

req.session.save(()=>{
  req.session.userid = userData.id
  req.session.isDoctor = true
  req.session.loggedIn = true
  res.json({user: doctorData, message: "You are now logged in"})
})

res.render("drSearch")
  
} catch (error) {
  res.status(400).json(error)
}
    //validate that the password is associated with that user

    //check what type of user this person is

    //// req.session.isDoctor = true 
      
    //render the dr search page (if dr)
    
    //render the patient info page
      
})
 module.exports = router   