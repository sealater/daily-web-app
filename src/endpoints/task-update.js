/* task-update.js
 * Updates a task
*/

const db = require('../database');
const pug = require('pug');
const renderTemplate = require('../render-template')

// Cache page
const page = pug.compileFile('templates/topic-post-create.html.pug');

/** @function serveTopicPostCreate
 * Allows for creating posts under a topic
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */

function serveTopicPostCreate(req, res) {
  // Determine the topic ID
  const topicId = parseInt(req.params.topicid, 10);
  
  // Get topic subject
  var topicSubject = db.prepare("SELECT subject FROM forum_topics WHERE id = ?").get(topicId).subject

  // Render
  var html = renderTemplate(page, {topicId: topicId, topicSubject: topicSubject, user: req.session && req.session.user});
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveTopicPostCreate;
