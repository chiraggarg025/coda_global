const express = require('express');
// router configuration
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/',homeController.home );

// routes for user
router.use('/user',require('./user'))

module.exports = router;