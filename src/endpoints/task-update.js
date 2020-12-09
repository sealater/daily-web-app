/** @module task-update.js
 * Updates a task
*/

// Database
const db = require('../db-interact.js');
const sanitizeHtml = require('sanitize-html');

/** @function serve
 * Serves the page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serve(req, res) {
  var id = parseInt(req.body.id, 10);
  var action = req.body.action;

  var properties = {}

  switch (action) {
    case 'archive': properties.archived = true; break;
    case 'unarchive': properties.archived = false; break;
    case 'remove': properties.removed = true; break;
    case 'restore': properties.removed = false; break;
    //
    case 'color': properties.colorPreset = parseInt(req.body.colorPreset, 10); break;
    //
    case 'save':
      properties.title = sanitizeHtml(req.body.title);
      properties.note = sanitizeHtml(req.body.note);
      break;
  }

  // Get user input data

  // ! Sanitize
  // TODO: Should check for success
  db.commit({type: 'task', action: 'update'},
            {id: id, properties: properties});

  // Return updated data
  // TODO: Should send error messages
  res.writeHead(200, {'Content-Type': 'application/json'}); 
  res.end(JSON.stringify(properties));
}

module.exports = serve;