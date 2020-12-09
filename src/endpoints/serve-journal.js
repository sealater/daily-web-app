/** @module serve-journal.js
 * Serves Journal Page
*/

const pug = require('pug');
const renderTemplate = require('../render-template')

// Database
const db = require('../db.js');

// Cache page
const page = pug.compileFile('templates/journal.html.pug');

/** @function serve
 * Serves the page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serve(req, res) {
  var entriesResults = db.getJournalEntries()

  // Render
  var html = renderTemplate(page, {entries: entriesResults});
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serve;

