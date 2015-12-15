QUnit.test( "hello test", function( assert ) {
	assert.ok(kata.rover instanceof Object == true, 'Rover object exists');
  
	kata.rover.direction = 'n'
	assert.equal(kata.rover.direction, 0, 'direction "n" should equal 0');
	kata.rover.direction = 'e';
	assert.equal(kata.rover.direction, 1, 'direction "e" should equal 1');
	kata.rover.direction = 's';
	assert.equal(kata.rover.direction, 2, 'direction "s" should equal 2');
	kata.rover.direction = 'w';
	
	assert.equal(kata.rover.direction, 3, 'direction "w" should equal 3');
	assert.throws(function(){
					kata.rover.direction = 't';  
				  },
				  'Trying to set unknown direction provokes error');
				  
	kata.rover.direction = 'S';
	assert.equal(kata.rover.direction, 2, 'direction with upper case "S" should equal 2');
	
	kata.rover.direction = 'n';
	kata.rover.r();
	assert.equal(kata.rover.direction, 1, 'After facing north a turn to the right makes the rover face east (1)');
	
	kata.rover.l();
	kata.rover.l();
	assert.equal(kata.rover.direction, 3, 'Turning left two times makes it face west (3)');
	
	kata.rover.r();
	assert.equal(kata.rover.direction, 0, 'Turning right again makes it face north (0)');
});