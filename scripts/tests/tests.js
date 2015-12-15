QUnit.test( "hello test", function( assert ) {
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
	
	assert.throws(function(){
				grid.addMovable(rover, 100, 0); 
			  },
			  'Trying to add movable to non existing grid position provokes error');
			  
	grid.addMovable(rover, 42, 17);
	var movable = grid.getMovable(rover);
	assert.ok(movable.movable == rover, 'Movable has reference to correct rover object');
	assert.ok(movable.x == 42, 'Movable has correct x coordinate');
	assert.ok(movable.y == 17, 'Movable has correct y coordinate');
	assert.ok(movable.movable.grid == grid, 'Movable has reference to correct grid');
	
});