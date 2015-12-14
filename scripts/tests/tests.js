QUnit.test( "hello test", function( assert ) {
	assert.ok( 1 == "1", "Passed!" );
  
	assert.ok(kata.rover instanceof Object == true, 'yay');
  
	kata.rover.setDirection('s');
	assert.equal(kata.rover.direction, 2, 'direction "s" should equal 2');
	assert.throws(function(){
			kata.rover.setDirection('t');  
		},
	'Trying to set unknown direction provokes error');
	
	kata.rover.setDirection('n');
	kata.rover.r();
	assert.equal(kata.rover.direction, 1, 'After facing north a turn to the right makes the rover face east (1)');
	
	kata.rover.l();
	kata.rover.l();
	assert.equal(kata.rover.direction, 3, 'Turning left two times makes it face west (3)');
	
	kata.rover.r();
	assert.equal(kata.rover.direction, 0, 'Turning right again makes it face north (0)');
});