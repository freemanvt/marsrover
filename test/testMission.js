/**
 * Created by vinhta on 13/01/2016.
 */
var assert = require('chai').assert;
var Mission = require('./../model/Mission');
var errors = require('./../Errors');

describe('Mission test suite', function() {


    it('Test creating Mission', function() {
        var mission;
        mission = new Mission();
        assert.isNotNull(mission);
    });

    /**
     * test that the first command should always be for the plateau upper right coordinate otherwise throw error
     */
    it('Test assigning a Plateau as the first command', function() {
        var mission;
        mission = new Mission();
        mission.sendCommand('5 5'); // if this is the first command for this mission, it should be creating the plateau
        var plateau = mission.getPlateau();
        assert.isNotNull(plateau);
        assert.equal(plateau.getMaxX(), 5, 'Plateau max x should be 5');
        assert.equal(plateau.getMaxY(), 5, 'Plateau max y should be 5');

        // throw error if the first command isn't matching 'number number'
        mission = new Mission();
        assert.throw(
            function() {
                mission.sendCommand('1 2 N'); // if this is the first command for this mission, it should be creating the plateau
            },
            errors.MissionInvalidCommandError
        );
    });

    /**
     * test rover commands, rover commands comes in 2 parts, first part is the position, second part is the movement
     */
    it('Test sending rover command', function() {
        var mission;
        mission = new Mission();
        mission.sendCommand('5 5'); // if this is the first command for this mission, it should be creating the plateau
        mission.sendCommand(['1 2 N','LMLMLMLMM']); // test sending a rover command
        var rovers = mission.getRovers(); // get back an array of rovers
        assert.equal(rovers[0].toString(), '1 3 N');
        // test sending another rover command
        mission.sendCommand(['3 3 E','MMRMMRMRRM']);
        rovers = mission.getRovers();
        assert.equal(rovers[0].toString(), '1 3 N');
        assert.equal(rovers[1].toString(), '5 1 E');

    });

    /**
     * test we can send a batch input of command and retreive the output
     */
    it('Test sending a list of rover commands', function() {
        var mission;
        mission = new Mission();
        var input = '5 5\n' + '1 2 N\n' + 'LMLMLMLMM\n' + '3 3 E\n' + 'MMRMMRMRRM';
        var expected = '1 3 N\n' + '5 1 E';
        console.log(input);
        var output = mission.sendCommands(input);
        assert.equal(output, expected);

    });

});
