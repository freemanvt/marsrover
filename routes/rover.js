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

// retrieve a rover
router.get('/:id', function(req, res) {
    console.log('id', req.params.id);
    mcs.getRoverById(req.params.id, function(err, data) {
        if (err) {
            // TODO: handle error

        } else {
            console.dir(data);
            res.json(data);
        }
    });
});

// move a rover by creating a new movement for it
router.post('/:id/move', function(req, res) {
    console.log('id', req.params.id);
    mcs.moveRover(req.params.id, req.body.movement, function(err, data) {
        if (err) {
            // TODO: handle error

        } else {
            console.dir(data);
            res.json(data);
        }
    });
});

module.exports = router;