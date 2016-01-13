/**
 * Rover object -
 * Created by vinhta on 12/01/2016.
 */
var errors = require('./../Errors');
var _ = require('lodash');

var directions = ['N', 'E', 'S', 'W'];

function Rover(plateau) {
    this.plateau = plateau;
    this.x;
    this.y;
    this.direction;
}

/**
 * return the plateau the rover is on
 *
 * @returns {*}
 */
Rover.prototype.getPlateau = function() {
    return this.plateau;
};

/**
 * set the position for the rover
 *
 * @param position
 */
Rover.prototype.setPosition = function(position) {
    var cmds = position.split(' ');
    this.x = parseInt(cmds[0]);
    this.y = parseInt(cmds[1]);
    if (!this.plateau.isValidPosition(this.x, this.y)) {
        throw new errors.InvalidRoverPosition('Rover position is invalid on this plateau');
    }
    this.direction = cmds[2];
};

/**
 * return this Rover's x coordinate
 * @returns {*}
 */
Rover.prototype.getX = function() {
    return this.x;
};

/**
 * return this Rover's y coordinate
 * @returns {*}
 */
Rover.prototype.getY = function() {
    return this.y;
};

/**
 * return Rover's direction
 * @returns {*}
 */
Rover.prototype.getDirection = function() {
    return this.direction;
};

/**
 * turn the Rover left
 */
Rover.prototype.turnLeft = function() {
    this.direction = calculateNewDirection(this.direction, 'L');
    return this;
};

Rover.prototype.turnRight = function() {
    this.direction = calculateNewDirection(this.direction, 'R');
    return this;
};

/**
 * function to calculate the new direction the Rover is facing after a turn
 * @param currentDirection current direction the Rover is facing
 * @param turnDirection L for left and R for right
 * @returns {string}
 */
function calculateNewDirection(currentDirection, turnDirection) {
    var indexCurrentDirection = _.findIndex(directions, function(o) {
        return o === currentDirection;
    });
    if (turnDirection === 'L') {
        if (indexCurrentDirection - 1 < 0) { // if direction - 1 less than the first item which is 'N'
            indexCurrentDirection = directions.length -1; // then we set it to the max index item which should be 'E'
        } else {
            indexCurrentDirection -= 1;
        }
    } else if (turnDirection === 'R') {
        if (indexCurrentDirection + 1 > directions.length -1) { // if direction + 1 is more than the length of the array
            indexCurrentDirection = 0; // set to 0
        } else {
            indexCurrentDirection += 1;
        }
    }
    return directions[indexCurrentDirection];
}

/**
 * Move the rover forward
 */
Rover.prototype.moveForward = function() {
    if (this.direction === 'N') {
        if (this.y + 1 > this.plateau.getMaxY()) {
            throw new errors.BoundaryHitError();
        }
        this.y += 1;
    } else if (this.direction === 'S') {
        if (this.y - 1 < this.plateau.getMinY()) {
            throw new errors.BoundaryHitError();
        }
        this.y -= 1;
    } else if (this.direction === 'E') {
        if (this.x + 1 > this.plateau.getMaxX()) {
            throw new errors.BoundaryHitError();
        }
        this.x += 1;
    } else if (this.direction === 'W') {
        if (this.x - 1 < this.plateau.getMinX()) {
            throw new errors.BoundaryHitError();
        }
        this.x -= 1;
    }
    return this;
};

Rover.prototype.toString = function() {
    return this.x + ' ' + this.y + ' ' + this.direction;
};

Rover.prototype.toJson = function() {
    return {
        x : this.x,
        y : this.y,
        direction : this.direction
    };
};

module.exports = Rover;