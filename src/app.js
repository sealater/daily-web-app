/* app.js
 * Handles serving content and routing
*/

const express = require('express');

// Endpoints
const serveIndex = require('./endpoints/serve-index.js');
const serveStandards = require('./endpoints/serve-standards.js');
const serveSignup = require('./endpoints/serve-signup.js');
const serveSignin = require('./endpoints/serve-signin.js');

const createUser = require('./endpoints/serve-signup-post');
const createSession = require('./endpoints/serve-signin-post');
const destroySession = require('./endpoints/serve-signout');

const topicList = require('./endpoints/serve-topic-list');
const topicPostList = require('./endpoints/serve-topic-post-list');

const topicCreate = require('./endpoints/serve-topic-create');
const topicCreatePost = require('./endpoints/serve-topic-list-post');

const topicPostCreate = require('./endpoints/serve-topic-post-create');
const topicPostCreatePost = require('./endpoints/serve-topic-post-list-post');

// Middleware
const authOnly = require('./middleware/auth-only');
const loadBody = require('./middleware/load-body');
const loadSession = require('./middleware/load-session');

/** @module app 
 * The express application for our site
 */
var app = express();

// Load session for each page...
app.use(loadSession);

// Serve index page...
app.get('/$|/index.html|/index', serveIndex);

// Serve standards page...
app.get('/standards.html|/standards', serveStandards);

// Topic serving...
//app.get('/forum/topics/new', topicCreate);

app.get('/forum/topics/:topicid/posts/create', authOnly, topicPostCreate);

app.get('/forum/topics/:topicid/posts', topicPostList);
app.post('/forum/topics/:topicid/posts', authOnly, loadBody, topicPostCreatePost);

app.get('/forum/topics/create', authOnly, topicCreate);
app.get('/forum|/forum/topics', topicList);
app.post('/forum/topics', authOnly, loadBody, topicCreatePost); // app.post('/posts', authorsOnly, loadBody, createPost);

// Access serving...
app.get('/signup.html|/signup', serveSignup);
app.post('/signup.html|/signup', loadBody, createUser);

app.get('/signin.html|/signin', serveSignin);
app.post('/signin.html|/signin', loadBody, createSession);

app.get('/signout.html|/signout', destroySession);

// Include static files from public/
app.use(express.static('public'));

module.exports = app;

