!function(window, document, undefined){
	'use strict';
	
	var kata = {},
		rover,
		directions = ['n', 'e', 's', 'w'],
		grid;
		
	rover = {
		direction : 0,
		f : function(){
			
		},
		b : function(){
			
		},
		r : function(){
			this.direction += 1;
			if(this.direction >= directions.length){
				this.direction = 0;
			}
		},
		l : function(){
			this.direction -= 1;
			if(this.direction < 0){
				this.direction = directions.length - 1;
			}
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