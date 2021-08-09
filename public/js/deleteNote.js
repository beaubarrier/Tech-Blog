// delete function
var deleteBtn = $("#deleteBtn");
var noteBody = $("#noteBody");

async function deleteNoteHandler(event) {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')

        console.log(`/api/notes/${id}`)

        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace(`/api/notes`);
            alert('note deleted!');
        } else {
            alert(response.statusText + "womp womp");
        }

    }
}

document.querySelector('.col-md-4').addEventListener('click', deleteNoteHandler);