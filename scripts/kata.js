!function(window, document, undefined){
	'use strict';
	
	var kata = {},
		rover,
		directions = ['n', 'e', 's', 'w'],
		grid;
		
	rover = {
		direction : 0,
		forward : function(){
			
		},
		backward : function(){
			
		},
		setDirection : function(direction){
			if(directions.indexOf(direction) < 0){
				throw new Error('Direction does not exist: ' + direction);
			}
			this.direction = directions.indexOf(direction);
		}
	}
	
	kata.directions = directions;
	kata.rover = rover;
	
	window.kata = kata;
}(window, document)