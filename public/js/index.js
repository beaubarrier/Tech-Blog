let noteTitle = $("#exampleFormControlInput1");
let noteText = $("#exampleFormControlTextarea1");
let saveBtn = $("#save");

async function newNoteHandler(event) {
    event.preventDefault();

    const title = document.querySelector("#exampleFormControlInput1").value;
    const text = document.querySelector("#exampleFormControlTextarea1").value;

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