// add event listener to more info button
// if clicked renders patient info page for patient

const apptEl = document.getElementById('appt-form');
const conditionEl = document.getElementById('sub-condition');
const dateEl = document.getElementById('sub-date');
const timeEl = document.getElementById('sub-apptTime');
const emailEl = document.getElementById('sub-email');

apptEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(dateEl.value)
    let response = await fetch('/api/doctor/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        appointmentDate: dateEl.value,
        concern: conditionEl.value,
        email: emailEl.value,
        appointmentTime: timeEl.value,
    })
    })

    if (response.ok) {
        console.log('email sent')
        window.location.reload();
    }
})