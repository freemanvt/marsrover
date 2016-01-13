/**
 * Created by vinhta on 12/01/2016.
 */
var assert = require('chai').assert;
var Rover = require('./../model/Rover');
var Plateau = require('./../model/Plateau');
var errors = require('./../Errors');

describe('Rover test suite', function() {

    /**
     * test creation of Rover and passing in a plateau
     */
    it('test Rover creation', function() {
        var plateau = new Plateau(5, 10);
        var rover = new Rover(plateau);
        assert.isNotNull(rover);
        assert.isNotNull(rover.getPlateau());
        assert.equal(rover.getPlateau().getMaxX(), 5, 'Rover\'s plateau should be max X 5');
        assert.equal(rover.getPlateau().getMaxY(), 10, 'Rover\'s plateau should be max y 10');

        plateau = new Plateau(6, 6);
        rover = new Rover(plateau);
        assert.isNotNull(rover);
        assert.isNotNull(rover.getPlateau());
        assert.equal(rover.getPlateau().getMaxX(), 6, 'Rover\'s plateau should be max X 6');
        assert.equal(rover.getPlateau().getMaxY(), 6, 'Rover\'s plateau should be max y 6')

    });

    it('test setting starting position for Rover', function() {
        var plateau = new Plateau(5, 5);
        var rover = new Rover(plateau);
        rover.setPosition('1 2 N');
        console.log(rover.toString());
        assert.equal(rover.getX(), 1, 'Rover should be at position X 1');
        assert.equal(rover.getY(), 2, 'Rover should be at position Y 2');
        assert.equal(rover.getDirection(), 'N', 'Rover should be facing N direction');

        plateau = new Plateau(6, 8);
        rover = new Rover(plateau);
        rover.setPosition('6 8 E');
        console.log(rover.toString());
        assert.equal(rover.getX(), 6, 'Rover should be at position X 6');
        assert.equal(rover.getY(), 8, 'Rover should be at position Y E');
        assert.equal(rover.getDirection(), 'E', 'Rover should be facing E direction');

        // test invalid position
        plateau = new Plateau(5, 5);
        rover = new Rover(plateau);
        assert.throw(
            function() {
                rover.setPosition('6 8 E');
            },
            errors.InvalidRoverPosition
        );
    });

    /**
     * test the rover turning
     */
    it('test turning Rover', function() {
        var plateau = new Plateau(5, 5);
        var rover = new Rover(plateau);
        rover.setPosition('1 2 N');
        rover.turnLeft();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'W', 'Rover facing N one turn L should now be facing W');
        // turn left again
        rover.turnLeft();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'S', 'Rover facing W one turn L should now be facing S');
        // turn right
        rover.turnRight();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'W', 'Rover facing S one turn L should now be facing W');
        // turn right 5 times, so that would be starting W -> 1(N), 2(E), 3(S), 4(W), 5(N)
        rover.turnRight().turnRight().turnRight().turnRight().turnRight();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'N', 'Rover facing W 5 turns L should now be facing N');

    });

    it('move the Rover', function() {
        var plateau = new Plateau(5, 5);
        var rover = new Rover(plateau);
        rover.setPosition('1 2 N');
        console.log(rover.toString());
        rover.moveForward();
        console.log(rover.toString());
        assert.equal(rover.getX(), 1, 'Rover facing N so moving one step doesn\'t effect X');
        assert.equal(rover.getY(), 3, 'Rover facing N so moving one step changes Y from 2 to 3');
        // rotate left (Facing W), move forward once (test moving west)
        rover.turnLeft();
        rover.moveForward();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'W', 'Rover facing N one turn L should now be facing W');
        assert.equal(rover.getX(), 0, 'Rover facing W so moving one step changes X from 1 to 0');
        assert.equal(rover.getY(), 3, 'Rover facing W so moving one step doesn\'t effect Y');

        // rotate left (Facing S), move forward once (test moving south)
        rover.turnLeft();
        rover.moveForward();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'S', 'Rover facing W one turn L should now be facing S');
        assert.equal(rover.getX(), 0, 'Rover facing S so moving one step doesn\'t effect X');
        assert.equal(rover.getY(), 2, 'Rover facing S so moving one step changes Y from 3 to 2');

        // rotate left (Facing E), move forward once (test moving east)
        rover.turnLeft();
        rover.moveForward();
        console.log(rover.toString());
        assert.equal(rover.getDirection(), 'E', 'Rover facing S one turn L should now be facing E');
        assert.equal(rover.getX(), 1, 'Rover facing W so moving one step changes X from 0 to 1');
        assert.equal(rover.getY(), 2, 'Rover facing W so moving one step doesn\'t effect Y');

        // test rover can't go pass min x boundary
        rover.setPosition('0 0 W');
        assert.throw(
            function() {
                rover.moveForward();
            },
            errors.BoundaryHitError
        );

        // test rover can't go pass max x boundary
        rover.setPosition('5 5 E');
        assert.throw(
            function() {
                rover.moveForward();
            },
            errors.BoundaryHitError
        );

        // test rover can't go pass min y boundary
        rover.setPosition('0 0 S');
        assert.throw(
            function() {
                rover.moveForward();
            },
            errors.BoundaryHitError
        );

        // test rover can't go pass max y boundary
        rover.setPosition('3 5 N');
        assert.throw(
            function() {
                rover.moveForward();
            },
            errors.BoundaryHitError
        );
    });

});
