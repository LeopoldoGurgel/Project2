const elements = [
    document.getElementById('/'),
    document.getElementById('/doctorInfo'),
    document.getElementById('/clinicInfo'),
    document.getElementById('/newPatient'),
    document.getElementById('/drSearch'),
    document.getElementById('/addappt'),
    document.getElementById('/patientInfo'),

]

document.addEventListener('click', async (event) => {
    event.preventDefault()
    if (elements.includes(event.target)) {
      document.location.replace(event.target.id);
    };
});