/* app.js
 * Handles serving content and routing
*/

const express = require('express');

// [ Endpoints ] //

// | Dashboard | //
const serveDashboard = require('./endpoints/serve-dashboard.js');

// | Tasks | //
// Content
const serveTasks = require('./endpoints/serve-tasks.js');
// Requests
const taskCreate = require('./endpoints/task-create.js');
const taskUpdate = require('./endpoints/task-update.js');
const taskDelete = require('./endpoints/task-delete.js');

// | Journal | //
// Content
const serveJournal = require('./endpoints/serve-journal.js');
const serveJournalEntry = require('./endpoints/serve-journal-entry.js');
// Requests
const journalEntryCreate = require('./endpoints/journal-entry-create.js');
const journalEntryUpdate = require('./endpoints/journal-entry-update.js');
const journalEntryDelete = require('./endpoints/journal-entry-delete.js');

// Middleware
//const authOnly = require('./middleware/auth-only');
const loadBody = require('./middleware/load-body');
//const loadSession = require('./middleware/load-session');

/** @module app 
 * Express application site
 */
var app = express();

function logBody(req, res, next) {
    console.log("Body:", JSON.parse(JSON.stringify(req.body)));
    next();
};

// Serve Dashboard page...
app.get('/$|/dashboard', serveDashboard);

// Serve Tasks page...
app.get('/tasks', serveTasks);

app.post('/tasks', loadBody, logBody, taskUpdate);
//app.put('/tasks', taskUpdate);
//app.delete('/tasks', taskDelete);

// Serve Journal page...
app.get('/journal', serveJournal);
app.post('/journal', loadBody, logBody, journalEntryUpdate);
//app.put('/journal', (req, res, next) => res.send('Put...'), journalEntryUpdate);
//app.delete('/journal', journalEntryDelete);

// Serve Journal entry page
app.get('/journal/:id', serveJournalEntry);

// Include static files from public/
app.use(express.static('public'));

module.exports = app;

