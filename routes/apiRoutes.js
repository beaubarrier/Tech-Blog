// Required modules
const fs = require('fs'); // File System. Used for reading and writing to files.
const path = require('path');// Path is used to set absolute path.
const uniqid = require('uniqid'); // Uniqid Module is used to assign id's to the individual notes.
const dbPath = path.join(__dirname, '../db/db.json'); // Specifies absolute path for the database.


module.exports = (app) => { // Sets up the returned data to be prepared for export under the variable 'app'.


    app.get('/api/notes', (req, res) => { // This is a GET request (request, response). It is used to return data.
        fs.readFile(dbPath, "utf8", (err, data) => { // Reads the data located at dbPath, use utf8 encoding, (error parameter, value parameter).
            if (err) { throw err; } // Throw error if it appears
            res.json(JSON.parse(data)); // Parses data passed from fs.readFile and stores under res.
        });
    });

    app.post('/api/notes', (req, res) => { // POST request is used to write data.
        fs.readFile(dbPath, "utf8", (err, data) => { // Reads the database
            if (err) { throw err; }
            var savedNotes = JSON.parse(data) // This variable is to store the changed and parsed database data.
            var note = req.body; // req.body is used to access the data from the client side. Variable 'note' now contains the data from 'req'.
            note.id = uniqid(); // Adds a new parameter 'id' to database enteries, the value will be given by  uniqid(). It  will assign a unique id to keep track of the note.
            savedNotes.push(note);// savedNotes contains the database data, push() will add the new note to the database data.
            res.json(true);
            fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), err => { // Writes changes to the database
                if (err) {
                    console.error(err)
                    return
                }
            })
        });
    });

    app.delete('/api/notes/:id', (req, res) => { // DELETE request. Path specifies to look in /api/notes/ and :id tells it to look for the parameter 'id'.
        const id = req.params.id; // Sets 'id' variable to the paramater 'id' stored in 'req'.
        const noteDelete = JSON.parse(fs.readFileSync(dbPath));// 'noteDelete' variable is assigned the value of the parsed database data.
        let noteFilter = noteDelete.filter(function (e) { // Searches through notes stored in 'notesDelete' 
            return e.id != id; // Returns the notes that do not share the specified id.
        });
        fs.writeFileSync("./db/db.json", JSON.stringify(noteFilter)); // Writes changes to the database.
        res.json("Note deleted!");
    })
}
