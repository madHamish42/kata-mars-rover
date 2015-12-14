QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  
  assert.ok(kata.rover instanceof Object == true, 'yay');
  
  kata.rover.setDirection('s');
  assert.equal(kata.rover.direction, 2);
  assert.throws(function(){
		kata.rover.setDirection('t');  
	},
	'throws error');
});