const express = require('express');
const BeaconsController = require('../controllers/beacons.controller');
const router = express.Router();

router.get('/buses', BeaconsController.getBusesData);
router.post('/verify', BeaconsController.verifyBeacon);

module.exports = router;