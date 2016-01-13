/**
 * Stub mission control service
 *
 * real code work interact with some external storage
 *
 * Created by vinhta on 13/01/2016.
 */
var Mission = require('./../model/Mission');

// singleton DAO
var MissionControlService = (function() {

    var instance;

    function createInstance() {

        //private variable and function
        var counter = 0;

        /**
         * map of mission
         * @type {{}}
         */
        var missions = {};

        /**
         * map of rovers
         * @type {{}}
         */
        var rovers = {};

        /**
         * counter for keeping track of mission id to assign
         * @type {number}
         */
        var missionIdCounter = 10001;

        var roverIdCounter = 20001;


        // public method
        return {

            // Create a new mission
            createMission: function(size, callback) {
                var mission = new Mission();
                mission.sendCommand(size);
                var missionId = missionIdCounter++;
                missions[missionId] = mission;
                var response = {
                    missionId : missionId
                };
                callback(null, response);
            },

            // Create a new rover for this mission
            createRoverForMission : function(missionId, position, movement, callback) {
                var mission = missions[missionId];
                mission.sendCommand([position, movement]);
                var lrovers = mission.getRovers();
                var rover = lrovers[lrovers.length - 1]; // get the latest rover created
                var roverId = roverIdCounter++;
                var roverObj = {
                    rover : rover,
                    missionId : missionId
                }
                rovers[roverId] = roverObj; // store over rover object and link it to the missionId

                // create our response
                var response = {
                    roverId : roverId,
                    position : rover.toString()
                }
                callback(null, response);

            },

            // Get a rover by Id
            getRoverById : function(roverId, callback) {
                console.log('roverId', roverId)
                var roverObj = rovers[roverId];
                var response = {
                    roverId : roverId,
                    position : roverObj.rover.toString()
                }
                callback(null, response);
            },

            /**
             * move a rover
             * @param roverId
             * @param movement
             * @param callback
             */
            moveRover : function(roverId, movement, callback) {
                var roverObj = rovers[roverId];
                var mission = missions[roverObj.missionId];
                var rover = roverObj.rover;
                mission.moveRover(rover, movement);
                var response = {
                    roverId : roverId,
                    position : rover.toString()
                }
                callback(null, response);
            }

        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();    // immediate invoked function expression


module.exports = MissionControlService;
