/** @module db-interact
 * Facilitates interaction between server and database
 */

 //passport

 const db = require('./db');

 /** @function commit
 * Commits request to database
 * req {obj}
 *  type: {task, journal}
 *  action: {create, update, delete}
 * params {...} - parameters of request
 */

 function commit(req, params) {
    if (req.type == 'task') {
        switch(req.action) {
            case 'create':
                return db.createTask(params.title, params.note, params.completeBy, params.colorPreset);
            case 'update':
                return db.updateTask(params.id, params.properties);
            case 'delete':
                return db.deleteTask(params.id);
        }
    }
    else if (req.type == 'journal') {
        switch(req.action) {
            case 'create':
                return db.createJournalEntry(params.title, params.content, params.colorPreset);
            case 'update':
                return db.updateJournalEntry(params.id, params.properties);
            case 'delete':
                return db.deleteJournalEntry(params.id);
        }
    }

    return null;
 }

 /** @function get
 * Gets data from database
 * req {obj}
 *  type: {task, journal}
 *  action: {single, all}
 * params {...} - parameters of request
 */

 function get(req, params) {
    if (req.type == 'task') {
        switch(req.action) {
            case 'single':
                return db.getTask(params.id);
            case 'all':
                return db.getTasks();
        }
    }
    else if (req.type == 'journal') {
        switch(req.action) {
            case 'single':
                return db.getJournalEntry(params.id);
            case 'all':
                return db.getJournalEntries();
        }
    }

    return null;
 }

 module.exports = {
    commit: commit,
    get: get
 }