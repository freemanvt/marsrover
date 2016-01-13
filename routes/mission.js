/**
 * Created by vinhta on 13/01/2016.
 */
var express = require('express');
var router = express.Router();
var mcs = require('./../services/MissionControlService').getInstance();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// get
router.get('/:id', function(req, res) {
    res.send('get mission with ' + req.params.id);
});

// post
router.post('/:id/rover', function(req, res) {
    console.log("body [" + JSON.stringify(req.body) + "]") ;
    mcs.createRoverForMission(req.params.id, req.body.position, req.body.movement, function (err, data) {
        if (err) {
            // TODO: handle error

        } else {
            console.dir(data);
            res.json(data);
        }
    })
});

// create a new mission, with the given plateau coordinates
router.post('/', function(req, res) {
    console.log("body [" + JSON.stringify(req.body) + "]") ;
    var size = req.body.plateauSize;
    mcs.createMission(size, function(err,data) {
        if (err) {
            // TODO: handle error

        } else {
            res.json(data);
        }
    });

});

module.exports = router;