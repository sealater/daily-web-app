/** @module serve-journal-entry.js
 * Serves Journal Entry Page
*/

const pug = require('pug');
const renderTemplate = require('../render-template')

// Database
const db = require('../db.js');

// Cache page
const page = pug.compileFile('templates/journal-entry.html.pug');

/** @function serve
 * Serves the page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serve(req, res) {
  // Determine the topic ID
  const id = parseInt(req.params.id, 10);

  // Get Journal entry
  var entryResult = db.getJournalEntry(id);

  // Render
  var html = renderTemplate(page, {entry: entryResult});
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serve;
