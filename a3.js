// set your margins and chart width/height


// create your scales 
// these map your data -> width + height of your webpage


// load in CSV data
	// then do stuff in here

d3.select("body").append("h1").text("INFO 474 Assignment 3");

var margin = {top: 20, right:15, bottom: 60, left: 60}
	, width = 960 - margin.left - margin.right
	, height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.linear()
			.range([0, width])		
			//.domain()

var yScale = d3.scale.linear()
			.range([height, 0])
			//.domain()

d3.select("body").append("svg")
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

d3.csv("titanic.csv", type, function(error, dataset) {

	console.log(dataset)
	xScale.domain([0, d3.max(dataset, function (d){
		return d.age
	})])

	yScale.domain([0, d3.max(dataset, function (d){
		return d.fare
	})])

	d3.select(".chart").selectAll(".circle")
		.data(dataset)
		.enter().append("circle")
		.attr("class", ".circle")
		.attr("r", 3)
		.attr("cx", function(d) {
			return xScale(d.age)
		})
		.attr("cy", function(d) {
			return yScale(d.fare)
		})
		.attr("fill", "blue")

	/*var brush = d3.svg.brush()
 		.x(x)
 		.on("brush", brushmove)
 		.on("brushend", brushend);*/

	svg.append("g")
 		.attr("class", "brush")
 		.call(brush)
		.selectAll('rect')
		.attr('height', height);
});

function type(d) {
	d.age = +d.age;
	d.fare = +d.fare;
	return d
}