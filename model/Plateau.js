/**
 * Plateau Object -
 *
 * Created by vinhta on 12/01/2016.
 */
var errors = require('./../Errors');

function Plateau(x, y) {
    if (x < 0 || y < 0) {
        throw new errors.InvalidPlateauSizeError('Invalid Plateau size x=' + x + ', y=' + y);
    }
    this.minX = 0;
    this.minY = 0;
    this.maxX = x;
    this.maxY = y;
}

/**
 * return maximum x coordinate
 * @returns {*}
 */
Plateau.prototype.getMaxX = function () {
    return this.maxX;
}

/**
 * return maximum y coordinate
 * @returns {*}
 */
Plateau.prototype.getMaxY = function () {
    return this.maxY;
}

/**
 * return minimum x coordinate
 * @returns {*}
 */
Plateau.prototype.getMinX = function () {
    return this.minX;
}

/**
 * return minimum y coordinate
 * @returns {*}
 */
Plateau.prototype.getMinY = function () {
    return this.minY;
}

/**
 * check if the position is valid on the plateau
 * @param x
 * @param y
 */
Plateau.prototype.isValidPosition = function(x, y) {
    if (x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY) {
        return true;
    }
    return false;
}

module.exports = Plateau;
