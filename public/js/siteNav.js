
const navEl = document.getElementById('main-nav');
const elements = [
    document.getElementById('/'),
    document.getElementById('/doctorInfo'),
    document.getElementById('/clinicInfo'),
    document.getElementById('/newPatient'),
    document.getElementById('/drSearch'),
    document.getElementById('/patientInfo'),

]

navEl.addEventListener('click', async (event) => {
    event.preventDefault();
    if (elements.includes(event.target)) {
      document.location.replace(event.target.id);
    };
});
