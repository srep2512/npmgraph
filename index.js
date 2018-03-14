"use strict"

var d3 = require('d3')

class GraphBuilder{
    constructor(container){
        this.container = container
        this.paper;
    }
}

GraphBuilder.prototype.JsontoGraphSVG = function(string){
    var res = "Alles richtig";
    //convert string to Object
    var jsonObject = JSON.parse(string);
    //validate correct usage
    if(((typeof jsonObject.graph)||(typeof jsonObject.verts)||(typeof jsonObject.edges))==='undefined'){
        res =  "Please ensure correct usage"
    }else{
        if(!jsonObject.verts.length){
           res = "No Verts detected, please ensure correct usage"
        }
    }    
    return res;
}

GraphBuilder.prototype.drawOnContainer = function(){
    var example = d3.select("#element"),
        width = d3.select('body').node().getBoundingClientRect().width,
        height = Math.min(500, width),
        radius = 20,
        area = Math.PI*radius*radius,
        margin = 2*radius,
        text = '';
   example.select('.paper').remove()
   var paper = example.append('svg')
    .classed('paper', true)
    .style('stroke', '#333')
    .attr('width', width).attr('height', height);   

   //Container #auslagern
   paper.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 960)
            .attr('height', height)
            .style("stroke-width", 0)
            .style('fill', '#333')
            .style('fill-opacity', 0.1)

            var shapes = ['Circle', 'Cross', 'Diamond', 'Square', 'Star', 'Triangle', 'Wye'],
            color = d3.scaleSequential(d3.interpolateViridis),
            N = 20,
            points = d3.range(N).map(function(i) {
            return {
                type: shapes[Math.floor(Math.random()*shapes.length)],
                color: color((i+1)/N),
                x: Math.round(Math.random() * (width - 2*margin) + margin),
                y: Math.round(Math.random() * (height - 2*margin) + margin)
            };
    });            

    var marks = d3.symbol().type(function (d) {return d3['symbol' + d.type];}).size(function (d) {return area;});

    paper
    .selectAll("path")
    .data(points)
    .enter()
    .append("path")
    .attr("transform", translate)
    .attr("d", marks)
    .style("fill", function (d) {return d.color;})
    .style("stroke-width", 0)
    .on("mouseenter.hover", mouseenter)
    .on("mouseleave.hover", end)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", mouseenter));

    var coord = paper.append('text')
        .text(text)
        .classed('coord', true)
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .attr("transform", translate({x: width-100, y: 20}));

    function mouseover () {
        text = d3.event.offsetX + ', ' + d3.event.offsetY;
        coord.text(text);
    }

    function mouseenter () {
        d3.select(this).style('stroke-width', '1px').style("fill", '#fff').style('cursor', 'move');
    }

    function dragstarted () {
        d3.select(this).raise().style('stroke-width', '2px');
    }

    function dragged(d) {
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this).attr("transform", translate(d));
    }

    function end() {
        var el = d3.select(this),
            d = el.datum();
        el.style("stroke-width", 0).style("fill", d.color).style('cursor', 'default');
    }

    function translate (d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
}

//define components for BPMN
//return as
GraphBuilder.prototype.addExample = function(svg){
    //unique Id for each element in the svg diagram
    var id = (function(){var a = 0; return function(){return "color["+a+++"]"}})();
    var container = d3.select(this.container)
    container
    .html(svg)
    .selectAll("rect")
    .attr("style","stroke:#33322E")
    .attr("::fill",id)    
}

GraphBuilder.prototype.getDiagramString = function(){
    var res = d3.select(this.container)
    return res;
}

GraphBuilder.prototype.getName = function(){
    return this.container;
}

GraphBuilder.prototype.getVorwärtsDiagram = function(){
    
    d3.select(this.container).append("<p>HALLO</p>")
    return this.container;
}

module.exports = GraphBuilder;



