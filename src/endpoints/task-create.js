/** @module task-create.js
 * Creates a task
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
  //db.createTask("Created Task", "Task note...", new Date().toString(), 0);


  // Redirect
  res.writeHead(302, {"Location": `/tasks`});
  res.end();
}

module.exports = serve;