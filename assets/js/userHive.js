//base example hive courtesy Jane Pong 2019 http://bl.ocks.org/officeofjane/ad5204f200a830acc8dc

var width = 960,
    height = 500,
    innerRadius = 40,
    outerRadius = 240;

var angle = d3.scale.ordinal()
              .domain(d3.range(4))
              .rangePoints([0, 2 * Math.PI]),
    radius = d3.scale.linear()
              .range([innerRadius, outerRadius]),
    color = d3.scale.category10()
              .domain(d3.range(20));

var nodes = [
  {x: 0, y: .3},
  {x: 0, y: .9},
  {x: 1, y: .2},
  {x: 1, y: .3456},
  {x: 2, y: .945},
  {x: 2, y: .01}
];

var links = [
  {source: nodes[0], target: nodes[5]},
  {source: nodes[1], target: nodes[3]},
  {source: nodes[2], target: nodes[5]},
  {source: nodes[2], target: nodes[5]},
  {source: nodes[3], target: nodes[5]}
];

var svg = d3.select("#mainDisplay").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

svg.selectAll(".axis")
    .data(d3.range(3))
  .enter().append("line")
    .attr("class", "axis")
    .attr("transform", function(d) { return "rotate(" + degrees(angle(d)) + ")" })
    .attr("x1", radius.range()[0])
    .attr("x2", radius.range()[1]);

// draw links
svg.selectAll(".link")
    .data(links)
  .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.hive.link()
      .angle(function(d) { return angle(d.x); })
      .radius(function(d) { return radius(d.y); }))
    .style("stroke", function(d) { return color(d.source.x); })
    .on("mouseover", linkMouseover)
    .on("mouseout", mouseout);

// draw nodes
svg.selectAll(".node")
    .data(nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + degrees(angle(d.x)) + ")"; })
    .attr("cx", function(d) { return radius(d.y); })
    .attr("r", 5)
    .style("fill", function(d) { return color(d.x); })
    .on("mouseover", nodeMouseover)
    .on("mouseout", mouseout);

// highlight link and connected nodes on mouseover
function linkMouseover(d) {
  svg.selectAll(".link")
    .classed("turnedOn", function(dl) {
      return dl === d;
    })
    .classed("turnedOff", function(dl) {
      return !(dl === d);
    })
  svg.selectAll(".node")
    .classed("turnedOn", function(dl) {
      return dl === d.source || dl === d.target;
    })
}

// highlight node and connected links on mouseover
function nodeMouseover(d) {
  svg.selectAll(".link")
    .classed("turnedOn", function(dl) {
      return dl.source === d || dl.target === d;
    })
    .classed("turnedOff", function(dl) {
      return !(dl.source === d || dl.target === d)
    });
  d3.select(this)
    .classed("turnedOn", true);
}

// clear highlighted nodes or links
function mouseout() {
  svg.selectAll(".turnedOn").classed("turnedOn", false);
  svg.selectAll(".turnedOff").classed("turnedOff", false);
}

function degrees(radians) {
  return radians / Math.PI * 180 - 90;
}
