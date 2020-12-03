const fs = require('fs');
const db = require('../database');
const pug = require('pug');
const renderTemplate = require('../render-template')

// Cache page
const page = pug.compileFile('templates/topic-list.html.pug');

// Query paths
const GET_ALL_FORUM_TOPICS = 'queries/get-all-forum-topics.sql';

/** @function serveTopicPostList
 * Serves page to view list of topics
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveTopicList(req, res) {
  // Get all post topics in the database
  var topicResults = db.prepare(fs.readFileSync(GET_ALL_FORUM_TOPICS, 'utf8')).all();
  
  //console.log(topicResults[0]);
  
  // Render
  var html = renderTemplate(page, {topics: topicResults, topicId: getTopicIdFromSubject, user: req.session && req.session.user});
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

/** @function getTopicIdFromSubject
 * Helper function to get a topic id from a topics subject
 * @param {string} subject - the name of the topic subject
 */
function getTopicIdFromSubject(subject) {
  var topicId = db.prepare("SELECT id FROM forum_topics WHERE subject = ?").get(subject);
  
  //console.log("Topic Id: " + topicId.id);
  
  if (!topicId) return null;
  
  return topicId.id;
}

module.exports = serveTopicList;

//

/** @module task-create.js
 * Creates a task
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