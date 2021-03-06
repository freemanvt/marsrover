/**
 * Created by vinhta on 13/01/2016.
 */
var app = require('./../app');
var assert = require('chai').assert;
var request = require('supertest');
var appConfig = require('./../appConfig');

var baseUrl = '/' + appConfig.apiVersion;

/**
 * test suite to test our API endpoints
 */
describe('Test our Mars mission rover api', function() {

    /**
     * testing that we can create a mission POST /mission
     */
    it('create a mission by post request that contains json payload for the plateau coordinates', function(done) {
        request(app) // pass in app server to request
            .post(baseUrl + '/missions')
            .type('json')
            .send('{"plateauSize" : "5 5"}')
            .expect(200)
            .expect(/missionId/, done);
    });

    /**
     * testing that we can retrieve a mission GET /mission/:id
     */
    it('get a mission', function(done) {
        var missionId;
        var agent = request(app); // pass in app server to request
        agent.post(baseUrl + '/missions')
            .type('json')
            .send('{"plateauSize" : "10 5"}')
            .end(function(err, res) {
                // extract missionId
                var jsonObj = res.body;
                console.log(jsonObj.missionId);
                missionId = jsonObj.missionId;
                agent.post(baseUrl + '/missions/' + missionId + '/rovers')
                    .type('json')
                    .send('{"position" : "1 2 N", "movement" : "LMLMLMLMM"}')
                    .end(function (err, res) {
                        agent.get(baseUrl + '/missions/' + missionId)
                            .expect(200)
                            .expect(/missionId/, done);

                    });
            });
    });

    /**
     * testing we can create a rover for a mission and set its starting position POST /mission/:missionId/rover
     */
    it('for a mission create a rover by post request that contains json payload of its starting position', function(done) {
        var missionId;
        var agent = request(app); // pass in app server to request
        agent.post(baseUrl + '/missions')
            .type('json')
            .send('{"plateauSize" : "5 5"}')
            .end(function(err, res) {
                // extract missionId
                var jsonObj = res.body;
                console.log(jsonObj.missionId);
                missionId = jsonObj.missionId;
                agent.post(baseUrl + '/missions/' + missionId + '/rovers')
                    .type('json')
                    .send('{"position" : "1 2 N", "movement" : "LMLMLMLMM"}')
                    .expect(200)
                    .expect(/roverId/, done);
            });

    });


    /**
     * testing we can can /rover/:id and get back a rover after
     */
    it('get rover based on id', function(done) {
        var missionId;
        var agent = request(app); // pass in app server to request
        agent.post(baseUrl + '/missions') // create our mission
            .type('json')
            .send('{"plateauSize" : "5 5"}')
            .end(function(err, res) {
                // extract missionId
                var jsonObj = res.body;
                console.log(jsonObj.missionId);
                missionId = jsonObj.missionId;
                agent.post(baseUrl + '/missions/' + missionId + '/rovers') // create our rover
                    .type('json')
                    .send('{"position" : "1 2 N", "movement" : "LMLMLMLMM"}')
                    .end(function(err, res) {
                        // extract roverID
                        var roverObj = res.body;
                        agent.get(baseUrl + '/rovers/' + roverObj.roverId)
                            .expect(200)
                            .expect(/{"x":1,"y":3,"direction":"N"}/, done);

                    });
            });

    });

    /**
     * test we can send new movement command to our rover POST /rover/:id/move
     */
    it('start sending movement command to rover', function(done) {
        var missionId;
        var agent = request(app); // pass in app server to request
        agent.post(baseUrl + '/missions') // create our mission
            .type('json')
            .send('{"plateauSize" : "5 5"}')
            .end(function(err, res) {
                // extract missionId
                var jsonObj = res.body;
                console.log(jsonObj.missionId);
                missionId = jsonObj.missionId;
                agent.post(baseUrl + '/missions/' + missionId + '/rovers') // create our rover
                    .type('json')
                    .send('{"position" : "1 2 N", "movement" : "LMLMLMLMM"}')
                    .end(function(err, res) {
                        // extract roverID
                        var roverObj = res.body;
                        agent.post(baseUrl + '/rovers/' + roverObj.roverId + '/moves')
                            .type('json')
                            .send('{"movement" : "RMRM"}')
                            .expect(200)
                            .expect(/{"x":2,"y":2,"direction":"S"}/, done); // after creating a movement of RMRM, the end position for the rover will be 2 2 S

                    });
            });
    });



});
