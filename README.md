# Usage
define container  
<div id="container"></div>

import * as graph from 'graphbuilder'
var graphbuilder = new graph("#container");

methods:
- initContainer();
- addFormsToContainer();

#initDia(length);
parameter: int
return: color array
generate color array with the given length. default values are "green"

#forw(color,actualState);
parameters: array, int
return: color array
this function push a red color to the actualState into the colorarray

#back(color, actualState)
parameters: array, int
return: color array
this function push a red color to the position befor actualState
