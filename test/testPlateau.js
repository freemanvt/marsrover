/**
 * Created by vinhta on 12/01/2016.
 */
var assert = require('chai').assert;
var Plateau = require('./../model/Plateau');
var errors = require('./../Errors');

describe('plateau test suite', function() {

    /**
     * test we can create a new plateau with parameter for the size of the plateau
     */
    it('test creating a new plateau', function() {

        var marsplateau = new Plateau(5, 5);
        assert.isNotNull(marsplateau);
        assert.equal(marsplateau.getMaxX(), 5, 'max X cordinate should be 5');
        assert.equal(marsplateau.getMaxY(), 5), 'max Y cordinate should be 5';

        marsplateau = new Plateau(10, 5);
        assert.equal(marsplateau.getMaxX(), 10, 'max X cordinate should be 10');
        assert.equal(marsplateau.getMaxY(), 5), 'max Y cordinate should be 5';

        // test passing in negative plateau size throw errors
        var invalidmarsplateau = null;
        assert.throw(
            function() {
                invalidmarsplateau = new Plateau(-1, 5);
            },
            errors.InvalidPlateauSizeError,
            'InvalidPlateauSizeError: Invalid Plateau size x=-1, y=5',
            'Should throw InvalidPlateauSizeError with InvalidPlateauSizeError: Invalid Plateau size x=-1, y=5'
        );

        assert.isNull(invalidmarsplateau);

    });

    /**
     * test if we can access some coordinates on the plateau
     */
    it('test boundary', function() {
        var marsplateau = new Plateau(5, 5);

        assert.ok(marsplateau.isValidPosition(0,0), '0,0 valid position in plateau with max coordinates 5,5');
        assert.ok(marsplateau.isValidPosition(5,5), '5,5 valid position in plateau with max coordinates 5,5');
        assert.notOk(marsplateau.isValidPosition(6,5), '6,5 invalid position in plateau with max coordinates 5,5');
        assert.notOk(marsplateau.isValidPosition(5,7), '5,7 invalid position in plateau with max coordinates 5,5');

    });


});

