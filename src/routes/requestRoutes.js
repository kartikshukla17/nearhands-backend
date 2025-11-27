const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// Provider accepts a job
router.post('/:id/accept', verifyFirebaseToken, requestController.acceptRequest);

// Provider declines a job
router.post('/:id/decline', verifyFirebaseToken, requestController.declineRequest);

module.exports = router;
