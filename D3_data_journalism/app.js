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

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

var chart = svg.append("g");
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);
path = "data.csv";
d3.csv(path, function (err, data) {
    if (err) throw err;
    dataset = data
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([20, -30])
        .html(function (data) {
            var state = data.state;return state;
        });
    
    chart.call(toolTip);
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    function findMinAndMaxX(dataColumnX) {
        xMin = d3.min(dataset, function (d) { return d[dataColumnX] * 0.75 });
        xMax = d3.max(dataset, function (d) { return d[dataColumnX] * 1.25 });
    };
    function findMinAndMaxY(dataColumnY) {
        yMin = d3.min(dataset, function (d) { return d[dataColumnY] * 0.75 });
        yMax = d3.max(dataset, function (d) { return d[dataColumnY] * 1.25 });
    };

    var axis_x = "smokes"
    var axis_y = "obesity"

    findMinAndMaxX(axis_x)
    findMinAndMaxY(axis_y)

    xScale.domain([xMin, xMax]);
    yScale.domain([yMin, yMax]);

    chart.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("id", "marker")
        .attr("cx", function (d) {return xScale(d[axis_x]);
        })
        .attr("cy", function (d) {return yScale(d[axis_y]);
        })
        .attr("r", 12)

    chart.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {return d.abbr;
        })
        .attr("x", function (d) {return xScale(d[axis_x]);
        })
        .attr("y", function (d) {return yScale(d[axis_y]);
        })
        .attr("font-size", "10px")
        .attr("font-weight", "500")
        .attr("text-anchor", "middle")
        .attr("class","stateText")

        .on("mouseover", function (d) {
            toolTip.show(d);
        })
     
        .on("mouseout", function(d, i) {
            toolTip.hide(d);
        })

    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .attr("stroke-width", "thick")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y-axis")
        .attr("stroke-width", "thick")
        .call(yAxis)
        
    chart.append("text")
        .attr("transform", `translate(${width / 2},${height + 40})`)
        .attr("class", "axis-text-x active")
        .attr("data-axis-name", "poverty")
        .text("In Poverty (%)");

    chart.append("text")
        .attr("transform", `translate(-40,${height / 2})rotate(270)`)
        .attr("class", "axis-text-y active")
        .attr("data-axis-name", "healthcareLevel")
        .text("Lacks Healthcare (%)");

    d3.selectAll(".axis-text-x"), function () {
        
            d3.selectAll("circle")
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
                .on("start", function () {
                    d3.select(this)
                        .attr("r", 18);
                })
                .attr("cx", function (d) {return xScale(d[axis_label_x]);
                })

            d3.selectAll(".stateText")
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
                .attr("x", function (d) {return xScale(d[axis_label_x]);
                })

            labelChangeX(clickedSelection);
        };

    d3.selectAll(".axis-text-y"), function () {
           
            d3.selectAll("circle")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .on("start", function () {
                    d3.select(this)
                        .attr("r", 18);
                })
                .attr("cy", function (data) {return yScale(data[axis_label_y]);
                })

            d3.selectAll(".stateText")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("y", function (d) {return yScale(d[axis_label_y]);
                })

            labelChangeY(clickedSelection);
        };
});