/** @module server.js
 * Creates the server
*/

const http = require('http');

const port = 3000;

// Create the server
const app = require('./src/app');

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
