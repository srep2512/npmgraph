"use strict"

var d3 = require('d3')

class GraphBuilder{
    constructor(container){
        this.container = container
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
    var example = d3.select("#example"),
        width = d3.getSize(example.style('width')),
        height = Math.min(500, width),
        radius = 20,
        area = Math.PI*radius*radius,
        margin = 2*radius,
        text = '';  
        
    example.select('.paper').remove();
    var paper = example
            .append(type)
            .classed('paper', true)
            .style('stroke', '#333')
            .attr('width', width).attr('height', height).canvasResolution(r).canvas(true);

        var marks = d3.symbol().type(function (d) {return d3['symbol' + d.type];}).size(function (d) {return area;});

        paper.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .style("stroke-width", 0)
            .style('fill', '#333')
            .style('fill-opacity', 0.1)
            .on("mousemove.hover", mouseover);

}

GraphBuilder.prototype.getName = function(){
    return this.name;
}

module.exports = GraphBuilder;



