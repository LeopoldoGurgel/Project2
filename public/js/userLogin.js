


const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const username = document.querySelector('#login-user').value.trim();
    const password = document.querySelector('#login-password').value.trim();
  
    if (username && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if(response.ok) {
        const result = await response.json()
      console.log(result)
      window.location.href = result.postLoginURL;
      } else {

        //handles situations in which there are errors on the response. Wrong usernames and passwords, mainly.
        const errorData = await response.json();
        const errorMessage = errorData.message;
        const errorMessageContainer = document.querySelector('#error-message');
        errorMessageContainer.textContent = errorMessage;
        errorMessageContainer.style.display ='block';
      }
    
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  