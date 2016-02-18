// set your margins and chart width/height


// create your scales 
// these map your data -> width + height of your webpage


// load in CSV data
	// then do stuff in here

var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect") //append path?
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    //.on("click", clicked);

var g = svg.append("g");

d3.json("us-states.topo.json", function(error, us) {
  if (error) throw error;

  console.log(us.objects)

  // appends the USA path first
  svg.append("path")
        .datum(topojson.feature(us, us.objects.state))
        .attr("d", path)
        .attr("class", "usa");

  // appends each state svg and gives it a class of it's id
  svg.selectAll(".state")
    .data(topojson.feature(us, us.objects.state).features)
    .enter().append("path")
      .attr("class", function(d) { return "state state-border " + d.id; })
      .attr("d", path)
      .attr("id", "state-borders")

      // add mouseevents here 
      // .on("click", clicked), etc
      // your current clicked func won't do anything, though
      // you'll have to write something new probably

  /*g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked);

  g.append("path")
      .datum(topojson.mesh(us, us.objects))
      .attr("id", "state-borders")
      .attr("d", path);*/
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  } 

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}




var margin = {top: 20, right:15, bottom: 60, left: 60}
	, width = 960 - margin.left - margin.right
	, height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.linear()
			.range([0, width])		
			//.domain()

var yScale = d3.scale.linear()
			.range([height, 0])
			//.domain()

d3.select(".state").append("svg")
	.attr("class", ".state")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

d3.csv("baseball2.csv", type, function(error, dataset) {

	console.log(dataset)

	xScale.domain([0, d3.max(dataset, function (d){
		return d.year
	})])

	yScale.domain([0, d3.max(dataset, function (d){
		return d.salary
	})])

	/*d3.select(".state").selectAll(".circle")
		.data(dataset)
		.enter().append("circle")
		.attr("class", ".circle")
		.attr("r", 3)
		.attr("cx", function(d) {
			return xScale(d.year)
		})
		.attr("cy", function(d) {
			return yScale(d.salary)
		})
		.attr("fill", "blue")*/

	/*var brush = d3.svg.brush()
 		.x(x)
 		.on("brush", brushmove)
 		.on("brushend", brushend);*/

	svg.append("g")
 		.attr("class", ".state")
 		//.call(brush)
		.selectAll('rect')
		.attr('height', height);
});

function type(d) {
	d.latitude = +d.latitude;
  d.longitude = +d.longitude;
  d.team = d.team;
  d.year = +d.year;
	d.salary = +d.salary;
	return d
} 

