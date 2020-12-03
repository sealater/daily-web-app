/** @module db
 * Provides a pseudo database
 */

const fs = require('fs');
const sanitizeHTML = require('sanitize-html');

const DATABASE_PATH = 'db/pseudo_database.json';

var database = JSON.parse(fs.readFileSync(DATABASE_PATH, 'utf8'));

function refreshDatabase() {
    database = JSON.parse(fs.readFileSync(DATABASE_PATH, 'utf8'));
}

function writeDatabase(database) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(database), 'utf8', (err) => {
        if (err) { return console.error(err); }
    });
}

function getJournalEntries() {
    return database.journalEntries;
}

function getTasks() {
    return database.tasks;
}

// [ Journal Manipulation ] //

function createJournalEntry(title, content, colorPreset) {
    var id = database.jId + 1;
    database.jId++;

    var journalEntry = {
        id: id,
        title: title,
        content: content,
        created: new Date().toString(),
        colorPreset: colorPreset,
        archived: false,
        removed: false
    }

    database.journalEntries.push(journalEntry);
    writeDatabase(database);
}

function updateJournalEntry(id, properties) {
    var requiresUpdate = false;

    for (var entry of database.journalEntries) {
        if (entry.id === id) {
            for (var property in properties) {
                if (property.toString() !== "id") {
                    if (entry[property]) {
                        entry[property] = properties[property];
                        requiresUpdate = true;
                    }
                }
            }
        }
    }

    if (requiresUpdate)
        writeDatabase(database);
}

function deleteJournalEntry(id) {
    database.journalEntries = database.journalEntries.filter(function(x){ 
        return x.id !== id; 
    });
}

// [Task Manipulation] //
function createTask(title, note, completeBy, colorPreset) {
    var id = database.tId + 1;
    database.tId++;

    var task = {
        id: id,
        title: title,
        note: note,
        completeBy: completeBy,
        colorPreset: colorPreset,
        archived: false,
        removed: false
    }

    database.tasks.push(task);
    writeDatabase(database);
}

function updateTask(id, properties) {
    var requiresUpdate = false;

    for (var task of database.tasks) {
        if (task.id === id) {
            for (var property in properties) {
                if (property.toString() !== "id") {
                    if (task[property]) {
                        task[property] = properties[property];
                        requiresUpdate = true;
                    }
                }
            }
        }
    }

    if (requiresUpdate)
        writeDatabase(database);
}

function deleteTask(id) {
    database.tasks = database.tasks.filter(function(x){ 
        return x.id !== id; 
    });
}

// DEBUG
/*
database = JSON.parse("{\n\"jId\": 0, \"journalEntries\":[],\n\"tId\": 0, \"tasks\":[]\n}");

for (var i = 0; i < 3; i++) {
    createJournalEntry("Test Entry " + i, "This is a test entry...", i);
    createTask("Test Task " + i, "This is a test task...", new Date().toString(), i);
}

updateJournalEntry(3, {content: "Poop!"});
updateTask(2, {id: "Poop!"});
updateTask(2, {note: "Note updated...", removed: true});
*/

//deleteJournalEntry(2);

module.exports = {
    getJournalEntries,
    getTasks,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    createTask,
    updateTask,
    deleteTask
};

/*

{
"jId": 0, "journalEntries":[],
"tId": 0, "tasks":[]
}

*/
