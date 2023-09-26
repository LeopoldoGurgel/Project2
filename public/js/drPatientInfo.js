console.log ("into the drPatientInfo")
const addAptBtn = document.getElementById("/addappt");
addAptBtn.addEventListener("click", () => {
    console.log("insdie the click")
   const patientId = addAptBtn.getAttribute('data-patientID');
    const patientURL = `/addappt/${patientId}`
console.log (patientId)
    window.location.href = patientURL  
});