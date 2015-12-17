//TODO: for later versions:
//use eg. require.js and put rover and grid in own module

!function(window, document, undefined){
	'use strict';
	
	var kata = {},
		rover,
		directions = ['n', 'e', 's', 'w'],
		grid,
		roverProto = {
			f: function(){
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
		this._width = width || 100;
		this._height = height || 100;
		this._movables = [];
	}
	Grid.prototype = gridProto;
	
	/*Object.defineProperty(roverProto, 'direction', {
		set: function(newDir){
							newDir = newDir.toLowerCase();
					if(directions.indexOf(newDir) < 0){
						throw new Error('Direction does not exist: ' + newDir);
					}
					
					this.dir = directions.indexOf(newDir);	
		},
		get: function(){
			return this.dir;
		}
	});*/
	
	/*Rover.prototype.r = function(){
							this.direction += 1;
							if(this.direction >= directions.length){
								this.direction = 0;
							}
						};
	Rover.prototype.l = function(){
							this.direction -= 1;
							if(this.direction < 0){
								this.direction = directions.length - 1;
							}
						}*/
	
	
	
	function createRover(){
		/*var direction = 0,
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
			*/
		/*var //direction = 0,
			props = {
				direction: {
					get: function(){
						return this.direction;
					},
					set: function(newDir){
						newDir = newDir.toLowerCase();
						if(directions.indexOf(newDir) < 0){
							throw new Error('Direction does not exist: ' + newDir);
						}
						
						this.direction = directions.indexOf(newDir);
					}
				}
			};*/
		var obj = Object.create(Rover);
		obj.direction = 'n';
		
		return obj;
	}
	
	//kata.directions = directions;
	//kata.rover = createRover()	;
	//kata.rover = Object.create(Rover);
	kata.rover = new Rover();
	kata.grid = new Grid();
	
	window.kata = kata;
}(window, document)