
var React = window.React = require('react')
var ThreeSixtyControl = require('./ui/ThreeSixtyControl'), mountNode = document.getElementById("app");

React.render(<ThreeSixtyControl bodysprite="/images/cars/car1/bodies/body1/body.png" wheelsprite="/images/cars/car1/wheels/wheels1/wheels.png" />, mountNode);

