/* globals d3 */
let dataset = [];
const xhr = new XMLHttpRequest();
const callback = function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    let dataset = data.monthlyVariance;
    let dates = [];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(dataset); 
    const w = 1200
    const h = 750;
    const padding = 60;
    
    for(let i = 0; i < dataset.length; i++) {
      dates.push(dataset[i].year)
    }
    
    //console.log(dates);
    let datesScale = dates.filter((d) => d % 10 === 0);
    //console.log(datesScale);
    
    const minX = d3.min(dates, (d) => d);
    const maxX = d3.max(dates, (d) => d);
    const xScale = d3.scaleBand()
                      .domain(datesScale)
                      .range([padding, w - padding]);
    const xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d3.format("d"));
   
    
    const yScale = d3.scaleBand()
                      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                      .range([padding, h - padding])
    
    const yAxis = d3.axisLeft(yScale);
    
    const svg = d3.select(".container")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
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
    
    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .attr("id", "x-axis")
        .call(xAxis);
    
    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .attr("id", "y-axis")
        .call(yAxis);
    
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", (d, i) => xScale(d.year))
      .attr("y", (d) => yScale(d.month))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("data-date", (d) => d)
      .attr("data-gdp", (d) => d)
      .attr("fill", "purple")
    
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