/** @module journal-entry-create.js
 * Creates a journal entry
*/

// Database
//const db = require('../db.js');

/** @function serve
 * Serves the page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serve(req, res) {
  //var subject = req.body.subject;
  // Get user input data

  // ! Sanitize title, note, completeBy, colorPreset
  //db.createJournalEntry("Created Entry", "Content of journal...", 0);


  // Redirect
  res.writeHead(302, {"Location": `/journal`});
  res.end();
}

module.exports = serve;