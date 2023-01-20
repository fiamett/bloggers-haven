const signout = async (event) => {
    event.preventDefault();

    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/signout', {
        method: 'POST',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}

document
    .getElementById('signOut')
    .addEventListener('click',signout)