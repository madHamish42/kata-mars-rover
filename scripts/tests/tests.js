QUnit.test( "rover test", function( assert ) {
	var rover = kata.rover,
		grid = kata.grid;
		
	//Rover
	assert.ok(rover instanceof Object == true, 'Rover object exists');
  
	rover.direction = 'n'
	assert.equal(rover.direction, 0, 'direction "n" should equal 0');
	rover.direction = 'e';
	assert.equal(rover.direction, 1, 'direction "e" should equal 1');
	rover.direction = 's';
	assert.equal(rover.direction, 2, 'direction "s" should equal 2');
	rover.direction = 'w';
	
	assert.equal(rover.direction, 3, 'direction "w" should equal 3');
	assert.throws(function(){
					rover.direction = 't';  
				  },
				  'Trying to set unknown direction provokes error');
				  
	rover.direction = 'S';
	assert.equal(rover.direction, 2, 'direction with upper case "S" should equal 2');
	
	rover.direction = 'n';
	rover.r();
	assert.equal(rover.direction, 1, 'After facing north a turn to the right makes the rover face east (1)');
	
	rover.l();
	rover.l();
	assert.equal(rover.direction, 3, 'Turning left two times makes it face west (3)');
	
	rover.r();
	assert.equal(rover.direction, 0, 'Turning right again makes it face north (0)');
	
	//Grid
	assert.ok(grid instanceof Object == true, 'Grid object exists');
			  
	grid.positionMovable(rover, 42, 17);
	var coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 42, 'Correct x coordinate');
	assert.equal(coordinates.y, 17, 'Correct y coordinate');
	
	grid.positionMovable(rover, 85, 12);
	assert.equal(coordinates.x, 85, 'Correct x coordinate');
	assert.equal(coordinates.y, 12, 'Correct y coordinate');
	
	assert.equal(grid._movables.length, 1, 'After repositioning the rover the number of movables on the grid is the same');

	//test sanitize coordinates
	coordinates = {x: -200, y: -200};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 0, 'correct x coordinate');
	assert.equal(coordinates.y, 0, 'correct y coordinate');
	
	coordinates = {x: -357, y: -523};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 43, 'correct x coordinate');
	assert.equal(coordinates.y, 77, 'correct y coordinate');
	
	coordinates = {x: 100, y: 101};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 0, 'correct x coordinate');
	assert.equal(coordinates.y, 1, 'correct y coordinate');
	
	coordinates = {x: 99, y: 99};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 99, 'correct x coordinate');
	assert.equal(coordinates.y, 99, 'correct y coordinate');
	
	coordinates = {x: 357, y: 523};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 57, 'correct x coordinate');
	assert.equal(coordinates.y, 23, 'correct y coordinate');
	
	coordinates = {x: -1, y: -1};
	grid.sanitizeCoordinates(coordinates);
	assert.equal(coordinates.x, 99, 'correct x coordinate');
	assert.equal(coordinates.y, 99, 'correct y coordinate');
	
	//Test moving
	grid.positionMovable(rover, 0, 0);
	rover.f();
	coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 0, 'correct x coordinate');
	assert.equal(coordinates.y, 1, 'correct y coordinate');
	
	grid.positionMovable(rover, 0, 0);
	rover.f();
	coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 0, 'correct x coordinate');
	assert.equal(coordinates.y, 1, 'correct y coordinate');
	
	grid.positionMovable(rover, 0, 0);
	rover.l();
	rover.f();
	coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 99, 'correct x coordinate');
	assert.equal(coordinates.y, 0, 'correct y coordinate');

	rover.l();
	rover.f();
	coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 99, 'correct x coordinate');
	assert.equal(coordinates.y, 99, 'correct y coordinate');
	
	rover.b();
	coordinates = grid.getCoordinates(rover);
	assert.equal(coordinates.x, 99, 'correct x coordinate');
	assert.equal(coordinates.y, 0, 'correct y coordinate');
});