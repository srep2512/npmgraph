
/*
{
	"graph": "MeinGraph",
	"verts": ["Ma1", "Ma2", "Ma3"],
	"edges": ["Ma1toMa2", "Ma1toMa3"]
}
*/
var _svg = require('./svgTemplate');

exports.JsontoGraphSVG = function(string){
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
    _svg.getSVG(jsonObject);
    

    return res;
}
