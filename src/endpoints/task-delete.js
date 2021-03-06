/** @module task-delete.js
 * Permanently deletes a task
*/

const pug = require('pug');
const renderTemplate = require('../render-template')

// Cache page
const page = pug.compileFile('templates/template.html.pug');

/** @function serve
 * Serves the page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serve(req, res) {
  // Render
  var html = renderTemplate(page);
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serve;