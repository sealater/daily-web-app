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

function getJournalEntry(id) {
    for (var entry of database.journalEntries) {
        if (entry.id === id) {
            return entry;
        }
    }

    return null;
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

    console.log(`Commit [Entry <${id}>]:`, JSON.parse(JSON.stringify(properties)));

    for (var entry of database.journalEntries) {
        if (entry.id === id) {
            for (var property in properties) {
                if (property.toString() !== "id") {
                    if (entry.property !== null) {
                        entry[property] = properties[property];
                        requiresUpdate = true;
                    }
                    else 
                        console.error(`Error: Property \'${property}\' is ${properties[property]}`);
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

/*
database = JSON.parse("{\n\"jId\": 0, \"journalEntries\":[],\n\"tId\": 0, \"tasks\":[]\n}");

for (var i = 0; i < 3; i++) {
    //createJournalEntry("Test Entry " + i, "This is a test entry...", i);
    createTask("Test Task " + i, "This is a test task...", new Date().toString(), i);
}

var mockEntries=[{"title":"Ante ipsum primis in","content":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.","date":"2020-11-12T00:34:37Z","colorPreset":9},{"title":"Id turpis integer","content":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","date":"2020-01-10T06:49:04Z","colorPreset":3},{"title":"Et tempus","content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.","date":"2020-04-24T12:12:12Z","colorPreset":1},{"title":"Semper rutrum nulla nunc","content":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","date":"2020-03-10T20:33:00Z","colorPreset":10},{"title":"Quam","content":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","date":"2020-02-01T17:11:30Z","colorPreset":10},{"title":"Non pretium","content":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.","date":"2019-12-25T11:44:57Z","colorPreset":5},{"title":"Mi","content":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","date":"2020-07-15T08:00:07Z","colorPreset":12},{"title":"Aliquam quis turpis eget","content":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.","date":"2020-04-08T12:42:54Z","colorPreset":3},{"title":"Tortor","content":"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","date":"2020-08-30T02:24:18Z","colorPreset":10},{"title":"Felis","content":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.","date":"2020-07-14T06:36:41Z","colorPreset":8}];

for (var entry of mockEntries) {
    createJournalEntry(
        entry["title"],
        entry["content"],
        entry["colorPreset"]);
}
*/

//deleteJournalEntry(2);

module.exports = {
    getJournalEntries,
    getJournalEntry,
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
