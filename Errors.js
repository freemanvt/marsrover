/**
 * Errors
 *
 * Created by vinhta on 13/01/2016.
 */

var util = require('util');

function InvalidPlateauSizeError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

util.inherits(InvalidPlateauSizeError, Error);

function InvalidRoverPosition(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

util.inherits(InvalidRoverPosition, Error);

function BoundaryHitError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

util.inherits(BoundaryHitError, Error);

function MissionInvalidCommandError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
}

util.inherits(MissionInvalidCommandError, Error);

module.exports = {
    InvalidPlateauSizeError : InvalidPlateauSizeError,
    InvalidRoverPosition : InvalidRoverPosition,
    BoundaryHitError : BoundaryHitError,
    MissionInvalidCommandError : MissionInvalidCommandError
};
