// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  d3.csv("assets/data/data.csv").then(function(Data)
   {
    // console.log(error);
  

/******************************************** */

// Parse Data/Cast as numbers
    // ==============================

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    Data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.obesity = +data.obesity;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(Data, d => d.obesity)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(Data, d => d.poverty)])
      .range([height, 0])

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    // .append("text")
    // .text(function(d){
    //   return d.abbr
    // })
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".75");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Obesity: ${d.obesity}<br>Poverty: ${d.poverty}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Obesity");
  });
 



// function rowConverter(row) {
//   row.obesity = +row.obesity;
//   row.smokes = +row.smokes;
//   row.poverty = +row.poverty;
//   row.abbr = row.abbr;
//   return row;
// }
// function createChart(data) {
//     console.table(data, [
//       "obesity",
//       "smokes",
//       "poverty",
//       "abbr",
//     ]);
//     //we store the current chart information into activeInfo Object
//     let activeInfo = {
//       data: data,
//       currentX: "obesity",
//       currentY: "poverty",
//     };
//     console.log(activeInfo)

// // Create scale functions
//     // ==============================
// activeInfo.xScale = d3
// .scaleLinear()
// .domain(getXDomain(activeInfo))
// .range([0, chartWidth]);

// activeInfo.yScale = d3
// .scaleLinear()
// .domain(getYDomain(activeInfo))
// .range([chartHeight, 0]);

// // Create axis functions
//     // ==============================

// activeInfo.xAxis = d3.axisBottom(activeInfo.xScale);
// activeInfo.yAxis = d3.axisLeft(activeInfo.yScale);

// createAxis(activeInfo);



//   createCircles(activeInfo);

//   createToolTip(activeInfo);

//   createLables();

//   d3.selectAll(".aText").on("click", function (event) {
//     console.log(event);
//     handleClick(d3.select(this), activeInfo);
//   });
// }

// function handleClick(label, activeInfo) {
//   let axis = label.attr("data-axis");
//   let name = label.attr("data-name");

//   if (label.classed("active")) {
//     //no need to do anything if clicked on active axis
//     return;
//   }
//   updateLabel(label, axis);

//   if (axis === "x") {
//     activeInfo.currentX = name;
//     activeInfo.xScale.domain(getXDomain(activeInfo));
//     renderXAxes(activeInfo);
//     renderHorizontal(activeInfo);
//   } //add logic to handle y axis click
//   else {
//     activeInfo.currentY = name;
//     activeInfo.yScale.domain(getYDomain(activeInfo));
//     renderYAxes(activeInfo);
//     renderVertical(activeInfo);
//   }
// }

// function createLables() {
//   let xlabelsGroup = chartGroup
//     .append("g")
//     .attr("class", "xText")
//     .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

//   xlabelsGroup
//     .append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("data-name", "hair_length")
//     .attr("data-axis", "x")
//     .attr("class", "aText active x")
//     .text("Obesity");

//   xlabelsGroup
//     .append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("data-name", "num_albums")
//     .attr("data-axis", "x")
//     .attr("class", "aText inactive x")
//     .text("Smokes");

//   let ylabelsGroup = chartGroup
//     .append("g")
//     .attr("class", "yText")
//     .attr("transform", `translate(-60 , ${chartHeight / 2}) rotate(-90)`);

//   ylabelsGroup
//     .append("text")
//     // .attr("y", -60)
//     // .attr("x", -chartHeight / 2)
//     .attr("dy", "1em")
//     .attr("data-name", "Obesity")
//     .attr("data-axis", "y")
//     .attr("class", "aText active y")
//     .text("Poverty");
// }

// function createCircles(activeInfo) {
//   let currentX = activeInfo.currentX;
//   let currentY = activeInfo.currentY;
//   let xScale = activeInfo.xScale;
//   let yScale = activeInfo.yScale;

//   chartGroup
//     .selectAll("circle")
//     .data(activeInfo.data)
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => xScale(d[currentX]))
//     .attr("cy", (d) => yScale(d[currentY]))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");
// }

// function createAxis(activeInfo) {
//   chartGroup.append("g").call(activeInfo.yAxis).attr("class", "y-axis");

//   chartGroup
//     .append("g")
//     .call(activeInfo.xAxis)
//     .attr("class", "x-axis")
//     .attr("transform", `translate(0, ${chartHeight})`);
// }

// function renderXAxes(activeInfo) {
//   chartGroup
//     .select(".x-axis")
//     .transition()
//     .duration(axisDelay)
//     .call(activeInfo.xAxis);
// }

// function renderYAxes() {
//   chartGroup
//     .select(".y-axis")
//     .transition()
//     .duration(axisDelay)
//     .call(activeInfo.yAxis);
// }

// function getXDomain(activeInfo) {
//   let min = d3.min(activeInfo.data, (d) => d[activeInfo.currentX]);
//   let max = d3.max(activeInfo.data, (d) => d[activeInfo.currentX]);
//   return [min * 0.8, max * 1.2];
// }

// function getYDomain(activeInfo) {
//   let min = 0; //d3.min(activeInfo.data, d => d[activeInfo.currentY])
//   let max = d3.max(activeInfo.data, (d) => d[activeInfo.currentY]);
//   return [min, max];
// }

// function renderHorizontal(activeInfo) {
//   d3.selectAll("circle").each(adjustCircles);

//   function adjustCircles() {
//     d3.select(this)
//       .transition()
//       .attr("cx", (d) => activeInfo.xScale(d[activeInfo.currentX]))
//       .duration(circleDely);
//   }
// }

// function renderVertical(activeInfo) {
//   d3.selectAll("circle").each(function () {
//     d3.select(this)
//       .transition()
//       .attr("cy", (d) => activeInfo.yScale(d[activeInfo.currentY]))
//       .duration(circleDely);
//   });
// }

// function updateLabel(label, axis) {
//   d3.selectAll(".aText")
//     .filter("." + axis)
//     .filter(".active")
//     .classed("active", false)
//     .classed("inactive", true);

//   label.classed("inactive", false).classed("active", true);
// }

// // function createToolTip(activeInfo) {
// //   let label = "Obesity:";

// //   if (activeInfo.currentX === "obesity") {
// //     label = "Obesity:";
// //   } else {
// //     label = "Smokes:";
// //   }

// //   let toolTip = d3
// //     .tip()
// //     .attr("class", "tooltip")
// //     .offset([80, -60])
// //     .html(function (event, d) {
// //       let html =
// //         d.rockband +
// //         "<br> " +
// //         label +
// //         d[activeInfo.currentX] +
// //         "<br> Number of Hits: " +
// //         d[activeInfo.currentY];
// //       return html;
// //     });

// //   chartGroup.call(toolTip);

// //   let circles = d3.selectAll("circle");

// //   circles.on("mouseover", toolTip.show);

// //   circles.on("mouseout", toolTip.hide);
// // }