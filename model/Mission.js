/**
 * Created by vinhta on 13/01/2016.
 */
var Rover = require('./Rover');
var errors = require('./../Errors');
var Plateau = require('./Plateau');

function Mission() {
    this.plateau;
    this.rovers = [];
}

Mission.prototype.sendCommand = function(cmd) {
    // if this is the first command, we should be creating a plateau
    if (!this.plateau) {
        // check if we have the right value
        var cmdArg = cmd.split(' ');
        if (cmdArg.length != 2) {
            throw new errors.MissionInvalidCommandError('Invalid command, please pass upper-right coordinates for plateau');
        } else {
            var x = parseInt(cmdArg[0]);
            var y = parseInt(cmdArg[1]);
            this.plateau = new Plateau(x, y);
        }
    } else {
        if (Array.isArray(cmd) && cmd.length === 2) {
            var position = cmd[0];
            var movement = cmd[1];
            var rover = new Rover(this.plateau);
            rover.setPosition(position);
            this.moveRover(rover, movement);
            this.rovers.push(rover);
        } else {
            throw new errors.MissionInvalidCommandError('Invalid command, Rover command should be an array e.g. [\'\',\'\']');
        }
    }
}

Mission.prototype.moveRover = function(rover, movement) {
    movement.split('').forEach(function(m) {
        if (m === 'L') {
            rover.turnLeft();
        } else if (m === 'R') {
            rover.turnRight();
        } else if (m === 'M') {
            rover.moveForward();
        } else {
            throw new errors.MissionInvalidCommandError('Invalid command, please check your movement command [' + movement + ']');
        }
    });
}

/**
 * execute a list of command for this mission
 *
 * @param input a list of command with each command on a separate line
 */
Mission.prototype.sendCommands = function(input) {
    var output ='';
    var cmd = input.split('\n');
    var roverCmdIndex = 0;
    if (!this.plateau) {
        // first command
        var plateauCmd = cmd[0];
        roverCmdIndex = 1;
        this.sendCommand(plateauCmd);
    }
    // execute rovers command
    var roverCmds = cmd.slice(roverCmdIndex);
    for (var i = 0, j = 1; j < roverCmds.length;) {
        this.sendCommand(roverCmds.slice(i, j+1));
        i += 2;
        j += 2;
    }
    // create output
    this.rovers.forEach(function(value, index, arr) {
        output += value.toString();
        if (index < arr.length -1) {
            output += '\n'
        }
    });
    return output;
}

Mission.prototype.getPlateau = function() {
    return this.plateau;
}

Mission.prototype.getRovers = function() {
    return this.rovers;
}

module.exports = Mission;