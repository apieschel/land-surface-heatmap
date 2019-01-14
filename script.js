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
    const padding = 100;
    
    for(let i = 0; i < dataset.length; i++) {
      dates.push(dataset[i].year)
    }
    
    console.log(dates);
    let datesScale = dates.filter((d) => d % 10 === 0);
    //console.log(datesScale);
    
    const minX = d3.min(dates, (d) => d);
    const maxX = d3.max(dates, (d) => d);
    const xScale = d3.scaleBand()
                      .domain(dates)
                      .range([padding, w - padding])
                      .padding(0);
    const xAxis = d3.axisBottom(xScale)
                      .tickValues(datesScale)
                      .tickFormat(d3.format("Y"));
   
    
    const yScale = d3.scaleBand()
                      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                      .range([padding, h - padding])
    
    const yAxis = d3.axisLeft(yScale);
    yAxis.tickValues(yScale.domain())
         .tickFormat((d) => months[d - 1]);
    
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
      .attr("x", (d) => xScale(d.year) + 1)
      .attr("y", (d) => yScale(d.month))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => d.variance)
      .attr("fill", (d) => {
        if(d.variance < -2) {
          return "blue"
        } else if(d.variance > -1 && d.variance < 0) {
          return "skyblue"
        } else if(d.variance > 0 && d.variance < 1) {
          return "yellow"
        } else {
          return "red"
        }
      })
     .on("mouseover", function(d) {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0.85);
          tooltip
            .html("<p>" + d[4] + "</p><p><strong>Year:</strong> " + d[0] + "</p><p><strong>Time:</strong> " + d[3] + "</p><p>" + d[2] + "</p>")
            .style("left", d3.event.pageX + 15 + "px")
            .style("top", d3.event.pageY + 15 + "px");
          tooltip.attr("data-year", d[0]);
        })
        .on("mouseout", function(d) {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0);
        });
    
    const legend = svg.append("g")
                    .attr("id", "legend");
      
    legend.append("rect")
      .attr("x", padding)
      .attr("y", h - 10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blue")
      
    legend.append("text")
      .text("less than -0.2 variance")
      .attr("x", padding + 20)
      .attr("y", (h))
    
    legend.append("rect")
      .attr("x", padding)
      .attr("y", (h - 25))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "skyblue")
      
    legend.append("text")
      .text("between 0 and -0.1 variance")
      .attr("x", padding + 20)
      .attr("y", (h - 15))
    
    legend.append("rect")
      .attr("x", padding)
      .attr("y", (h - 40))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "yellow")
      
    legend.append("text")
      .text("between 0 and 0.1 variance")
      .attr("x", padding + 20)
      .attr("y", (h - 30))
    
    legend.append("rect")
      .attr("x", padding)
      .attr("y", (h - 55))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red")
      
    legend.append("text")
      .text("greater than 0.1 variance")
      .attr("x", padding + 20)
      .attr("y", (h - 45))
    
    
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