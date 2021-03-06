/** @module render-template
 * Provides a function for rendering a cached template
 */

function renderTemplate(template, data) {
  //console.log("Data: " + data);
  return template(data);
}

module.exports = renderTemplate;
