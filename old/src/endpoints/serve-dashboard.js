/** @module serve-dashboard.js
 * Serves Dashboard Page
*/

const pug = require('pug');
const renderTemplate = require('../render-template')

// Cache page
const page = pug.compileFile('templates/index.html.pug');

/** @function serveIndex
 * Serves the dashboard page
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serveIndex(req, res) {
  // Render
  var html = renderTemplate(page, {user: req.session && req.session.user});
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveIndex;