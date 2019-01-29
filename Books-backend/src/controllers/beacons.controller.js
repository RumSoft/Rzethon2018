const BeaconsSchema = require('../models/beacons.model');
const ErrorHandler = require('../helpers/errors.helper');

/**
 * Verifies if user is in the bus
 * @api post
 * @param {JSON} req tagName - string
 * @param {*} res 
 * @param {*} next 
 */
const verifyBeacon = async (req, res, next) => {
    const beaconsTagName = req.body.tagName;
    try {
        const bus = await BeaconsSchema.findOne({ beaconsTagName });
        const { line, _id } = bus;

        res.status(200).send({
            success: true,
            busLine: line,
            id: _id,
            msg: 'You are approved for reading'
        });
    } catch (error) {
        console.error('[ERROR] Beacons: Error occured while verifing beacon');
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Beacons: Successfuly verified you in the bus');
}

/**
 * Returns data of all buses
 * @api get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getBusesData = async (req, res, next) => {
    try {
        const buses = await BeaconsSchema.find({});
        console.log(buses);
        res.status(200).send({
            success: true,
            data: buses
        });
    } catch (error) {
        console.error('[ERROR] Beacons: Error occured while getting data about buses');
        ErrorHandler.throwError(res, error);
    }
}

module.exports = { verifyBeacon, getBusesData };