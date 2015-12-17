//TODO: for later versions:
//- use eg. require.js and put rover and grid in own module
//- put rover's facing direction, turning of the rover and the directions array in grid
//  rover: does not need to know about directions, can defer turning to grid (analogue to f and b)
//  directions array: different grids may have different possible directions

!function(window, document, undefined){
	'use strict';
	
	var kata = {},
		rover,
		directions = ['n', 'e', 's', 'w'],
		grid,
		roverProto = {
			f: function(){
				//TODO: currently the grid ref gets set by the grid when positioning the rover
				//throw error: no grid?
				this.grid.move(this, 'f');
			},
			b: function(){
				this.grid.move(this, 'b');
			},
			r: function(){
				this._direction+= 1;
				if(this._direction>= directions.length){
					this._direction= 0;
				}
			},
			l: function(){
				this._direction-= 1;
				if(this._direction< 0){
					this._direction= directions.length - 1;
				}
			},
			set direction(newDir){
				newDir = newDir.toLowerCase();
				if(directions.indexOf(newDir) < 0){
					throw new Error('Direction does not exist: ' + newDir);
				}
				
				this._direction= directions.indexOf(newDir);
			},
			get direction(){
				return this._direction;
			},
			set grid(grid){
				this._grid = grid;
			},
			get grid(){
				return this._grid;
			}
		},
		gridProto = {
			positionMovable: function(movable, x, y){
				var coordinates = this.getCoordinates(movable);
				
				if(coordinates){
					//Reposition existing movable
					coordinates.x = x;
					coordinates.y = y;
				}else{
					//Add new movable
					//TODO: still needs to be tested
					coordinates = {x: x, y: y};
					movable.grid = this;
					this._movables.push({movable: movable,
										 coordinates: coordinates});
				}

				this.sanitizeCoordinates(coordinates);
			},
			getCoordinates: function(movable){
				var movables = this._movables;
				
				for(var i = 0; i < movables.length; i++){
					if(movables[i].movable == movable){
						return movables[i].coordinates;
					}
				}
			},
			sanitizeCoordinates: function(coordinates){
				coordinates.x = this.sanitizeCoordinate(coordinates.x, this._width);
				coordinates.y = this.sanitizeCoordinate(coordinates.y, this._height);
			},
			sanitizeCoordinate: function(coordinate, limit){
				var mod;
				
				if(coordinate < 0){
					mod = coordinate % limit;
					coordinate = (mod == 0) ? 0 : mod + limit; //mod -100 etc resolves to 0. Do not add limit
				}else{
					coordinate = coordinate % limit;
				}
				
				return coordinate;
			},
			move: function(movable, moveDirection){
				var coordinates = this.getCoordinates(movable),
					faceDirection = movable.direction,
					axis = (faceDirection == 0 || faceDirection == 2) ? 'y' : 'x', //north and south = y axis
					change = (faceDirection > 1) ? -1 : 1; //facing south or west equals negative movement
					
				if(moveDirection == 'b'){
					change = -change;
				}
				
				coordinates[axis] = coordinates[axis] + change;
				
				this.sanitizeCoordinates(coordinates);
			}
		};
			
	function Rover(){
		this._direction = 0;
		this._grid;
	}
	Rover.prototype = roverProto;
	
	function Grid(width, height){
		//TODO: Test grid with non default height and width
		this._width = width || 100;
		this._height = height || 100;
		this._movables = [];
	}
	Grid.prototype = gridProto;	

	kata.rover = new Rover();
	kata.grid = new Grid();
	
	window.kata = kata;
}(window, document)