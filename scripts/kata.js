//TODO: for later versions:
//use eg. require.js and put rover and grid in own module

!function(window, document, undefined){
	'use strict';
	
	var kata = {},
		rover,
		directions = ['n', 'e', 's', 'w'],
		grid;
	
	function createRover(){
		var direction = 0,
			Rover = {
				f : function(){
					
				},
				b : function(){
					
				},
				r : function(){
					direction += 1;
					if(direction >= directions.length){
						direction = 0;
					}
				},
				l : function(){
					direction -= 1;
					if(direction < 0){
						direction = directions.length - 1;
					}
				},
				set direction(newDir){
					newDir = newDir.toLowerCase();
					if(directions.indexOf(newDir) < 0){
						throw new Error('Direction does not exist: ' + newDir);
					}
					
					direction = directions.indexOf(newDir);
				},
				get direction(){
					return direction;
				}
			}
		
		return Object.create(Rover);
	}
	
	//kata.directions = directions;
	kata.rover = createRover()	;
	
	window.kata = kata;
}(window, document)