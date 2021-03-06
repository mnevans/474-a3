$(document).ready(function()	{

	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);

       /* var x = d3.scale.ordinal()
            .domain(["Arizona Diamondbacks", "Atlanta Braves", "Baltimore Marylands", "Baltimore Orioles", "Boston Red Sox", "Cincinnati Reds", 
                    "Cleveland Indians", "Colorado Rockies", "Detroit Tigers", "Florida Marlins", "Houston Astros", "Los Angeles Angels of Anaheim",
                    "Los Angeles Dodgers", "Milwaukee Brewers", "Minnesota Twins", "New York Mets", "Oakland Athletics", "Philadelphia Phillies",
                    "Pittsburgh Pirates", "San Francisco Giants", "Seattle Mariners", "Texas Rangers", "Toronto Blue Jays"])
            .rangePoints([0, width]);*/
	
	var y = d3.scale.linear()
		.range([height, 0]);

	//var formatCurrency = d3.format(",");

	var div = d3.select("body")
		.append("div")
			.attr("id", "teaminfo")
			.style("opacity", 0);

	var color = d3.scale.ordinal()
		.domain([1, 2, 3])
		.range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

  d3.csv("data.csv", function(error, data) {

		x.domain([0, 23]).nice();
		y.domain([0, 7000000]).nice();

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
				.attr("fill", "black")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("Team ID");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
				.attr("fill", "black")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Average Salary ($)")

		//draw circles
        svg.selectAll(".dot")
			.data(data.sort(
				function(a, b) {
					return b.totalSalary - a.totalSalary;
				})) 
			.enter()
			.append("circle")
				.attr("class", "dot")
				.attr("r", 10)
				.attr("cx", 
					function(d) {
						return x(d.id);
					})
				.attr("cy", 
					function(d) {
						return y(d.y1985);
					})
				.style("fill", "dodgerblue")
        .on("mouseover", function(d) {
          d3.select(this)
            .style("fill", "white");
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html("Team: " + d["team"] + "<br/> " + "Year: " + $("#slider").val() + "<br/> " + "Avg. Salary: $" + salary(d))
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .style("fill", "dodgerblue");
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
				
		var running = false;
		var timer;
		
		$("button").on("click", function() {
		
			var duration = 1000,
				maxstep = 2011,
				minstep = 2000;
			
			if (running == true) {
			
				$("button").html("Play");
				running = false;
				clearInterval(timer);
				
			} else if (running == false) {
			
				$("button").html("Pause");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);
				running = true;
			}
		});
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
        var salary = function(d) {
      
          switch ($("#slider").val()) {
            case "1985":
              return d.y1985;
              break;
            case "1986":
              return d.y1986;
              break;
            case "1987":
              return d.y1987;
              break;
            case "1988":
              return d.y1988;
              break;
            case "1989":
              return d.y1989;
              break;
            case "1990":
              return d.y1990;
              break;
            case "1991":
              return d.y1991;
              break;
            case "1992":
              return d.y1992;
              break;
            case "1993":
              return d.y1993;
              break;
            case "1994":
              return d.y1994;
              break;
            case "1995":
              return d.y1995;
              break;
            case "1996":
              return d.y1996;
              break;
            case "1997":
              return d.y1997;
              break;
            case "1998":
              return d.y1998;
              break;
            case "1999":
              return d.y1999;
              break;
            case "2000":
              return d.y2000;
              break;
            case "2001":
              return d.y2001;
              break;
            case "2002":
              return d.y2002;
              break;
            case "2003":
              return d.y2003;
              break;
            case "2004":
              return d.y2004;
              break;
            case "2005":
              return d.y2005;
              break;
            case "2006":
              return d.y2006;
              break;
            case "2007":
              return d.y2007;
              break;
            case "2008":
              return d.y2008;
              break;
            case "2009":
              return d.y2009;
              break;
            case "2010":
              return d.y2010;
              break;
            case "2011":
              return d.y2011;
              break;
            case "2012":
              return d.y2012;
              break;
            case "2013":
              return d.y2013;
              break;
            case "2014":
              return d.y2014;
              break;
          }
        };

    update = function() {

			d3.selectAll(".dot")
				.transition()
				.duration(500)
				.attr("cy", function(d) {
			
					switch ($("#slider").val()) {
						case "1985":
              return y(d.y1985);
							break;
						case "1986":
							return y(d.y1986);
							break;
						case "1987":
							return y(d.y1987);
							break;
						case "1988":
							return y(d.y1988);
							break;
						case "1989":
							return y(d.y1989);
							break;
						case "1990":
							return y(d.y1990);
							break;
						case "1991":
							return y(d.y1991);
							break;
						case "1992":
							return y(d.y1992);
							break;
						case "1993":
							return y(d.y1993);
							break;
						case "1994":
							return y(d.y1994);
							break;
						case "1995":
							return y(d.y1995);
							break;
						case "1996":
							return y(d.y1996);
							break;
						case "1997":
							return y(d.y1997);
							break;
						case "1998":
							return y(d.y1998);
							break;
						case "1999":
							return y(d.y1999);
							break;
						case "2000":
							return y(d.y2000);
							break;
						case "2001":
							return y(d.y2001);
							break;
						case "2002":
							return y(d.y2002);
							break;
						case "2003":
							return y(d.y2003);
							break;
						case "2004":
							return y(d.y2004);
							break;
						case "2005":
							return y(d.y2005);
							break;
						case "2006":
							return y(d.y2006);
							break;
						case "2007":
							return y(d.y2007);
							break;
						case "2008":
							return y(d.y2008);
							break;
						case "2009":
							return y(d.y2009);
							break;
						case "2010":
							return y(d.y2010);
							break;
						case "2011":
							return y(d.y2011);
							break;
						case "2012":
							return y(d.y2012);
							break;
						case "2013":
							return y(d.y2013);
							break;
						case "2014":
							return y(d.y2014);
							break;
					}
				})
				.transition()
				.duration(500)
				.attr("cx", function(d) {
					switch ($("#slider").val()) {
						case "1985":
                            return x(d.id);
							break;
						case "1986":
                            return x(d.id);
							break;
						case "1987":
							return x(d.id);
							break;
						case "1988":
							return x(d.id);
							break;
						case "1989":
							return x(d.id);
							break;
						case "1990":
							return x(d.id);
							break;
						case "1991":
							return x(d.id);
							break;
						case "1992":
							return x(d.id);
							break;
						case "1993":
							return x(d.id);
							break;
						case "1994":
							return x(d.id);
							break;
						case "1995":
							return x(d.id);
							break;
						case "1996":
							return x(d.id);
							break;
						case "1997":
							return x(d.id);
							break;
						case "1998":
							return x(d.id);
							break;
						case "1999":
							return x(d.id);
							break;
						case "2000":
							return x(d.id);
							break;
						case "2001":
							return x(d.id);
							break;
						case "2002":
							return x(d.id);
							break;
						case "2003":
							return x(d.id);
							break;
						case "2004":
							return x(d.id);
							break;
						case "2005":
							return x(d.id);
							break;
						case "2006":
							return x(d.id);
							break;
						case "2007":
							return x(d.id);
							break;
						case "2008":
							return x(d.id);
							break;
						case "2009":
							return x(d.id);
							break;
						case "2010":
							return x(d.id);
							break;
						case "2011":
							return x(d.id);
							break;
						case "2012":
							return x(d.id);
							break;
						case "2013":
							return x(d.id);
							break;
						case "2014":
							return x(d.id);
							break;
					}
				});
		};
	});
});
