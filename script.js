/* globals d3 */
let dataset = [];
const xhr = new XMLHttpRequest();
const callback = function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log(data); 
    
    
     d3.select("body")
      .append("h1")
      .attr("id", "title")
      .text("Monthly Global Land-Surface Temperature");
    
    d3.select("body")
      .append("h2")
      .text("1753 - 2015: base temperature 8.66℃");
    
    d3.select("body")
      .append("div")
      .attr("id", "description")
      .text("1753 - 2015: base temperature 8.66℃");
    
  }
}
xhr.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
xhr.responseType = 'json';
xhr.onload = function() {
  var status = xhr.status;
  if (status === 200) {
    callback(null, xhr.response);
  } else {
    callback(status, xhr.response);
  }
};
xhr.send();