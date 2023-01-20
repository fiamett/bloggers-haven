
const signin = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#nameIn').value.trim();
    const password = document.querySelector('#passIn').value.trim();

    if (name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
}

const signup = async (event) =>{
    event.preventDefault();

    const name = document.querySelector('#nameUp').value.trim();
    const password = document.querySelector('#passUp').value.trim();

    if (name&&password) {
        const response = await fetch('/api/users/signup',{
            method: 'post',
            body: JSON.stringify({name,password}),
            headers: {'content-type':'application/json'},
        });

        if(response.ok){
            document.location.replace('/');
        } else {
          if(response.status == 402){
            alert("name in use")
          }
          else{
            alert(response.statusText);
          }
        }
        return
    }
}

document
  .querySelector('.signinForm')
  .addEventListener('submit', signin);

document
    .querySelector('.signupForm')
    .addEventListener('submit',signup)