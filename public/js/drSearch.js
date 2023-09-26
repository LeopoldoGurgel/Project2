
// add call for drSearch

let dropdownEl = document.getElementById('select-dropdown');
let txtEl = document.getElementById('select-text');
let subEl = document.getElementById('form-sub')
let resultsEl = document.getElementById('search-results');

subEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    // on 1 search name, 2 is age, 3 is appointment date
    const response = await fetch(`/api/doctor/drSearch?searchFor=${dropdownEl.value}&text=${txtEl.value}`)
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            //need seeds to work before proceeding

            // create new elements with patient data
            // make the more info button that links to patient info page
            // for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.textContent = `${data.fullName} - email ${data.email} - age ${data.age} - occupation ${data.occupation}`;
            let btn = document.createElement('button');
            btn.setAttribute('data-patientID', data.id);
            btn.textContent = 'More Info';
            btn.classList.add('btn-primary')
            btn.addEventListener('click', () => {
                console.log(data.id)
                console.log("more info button clicked")
                // render patient id page
                const patientURL = `/drpatientInfo/${data.id}`

                window.location.href = patientURL
            })
            li.append(btn)
            resultsEl.append(li)
            //resultsEl.lastChild.appendChild(btn);
            // }

        });

});

