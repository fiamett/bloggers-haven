const signout = async (event) => {
    event.preventDefault();

    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/signout', {
        method: 'POST',
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}

document
    .getElementById('.signOut')
    .addEventListener('submit',signup)