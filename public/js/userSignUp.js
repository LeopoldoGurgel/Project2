


const signUpFormHandler = async (event) => {
    console.log("hitting signup code")
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const username = document.querySelector('#signup-user').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    console.log (username)
    if (username && password && email) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password, email}),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json()
      console.log(result)

      if(response.ok) {
      
      alert("You are now signedup! Please log in.")
    }else {
alert("An error has occured please contact the clinic")
    }
    }
  };
  console.log("setting up sign up handler")
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpFormHandler);