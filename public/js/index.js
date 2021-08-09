// save note function
async function newNoteHandler(event) {
    event.preventDefault();

    const title = document.querySelector("#noteTitleInput").value;
    const text = document.querySelector("#noteTextInput").value;

    const response = await fetch(`/api/notes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            text
        }),
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

document.querySelector('.login-form').addEventListener('submit', newNoteHandler);
