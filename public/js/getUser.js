// save note function
async function showUserHandler(event) {
    event.preventDefault();


    const response = await fetch(`/api/users`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.login-form').addEventListener('submit', showUserHandler);
