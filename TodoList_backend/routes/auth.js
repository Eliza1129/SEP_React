const { Router } = require("express");
const jwt = require('jsonwebtoken');
const { signToken } = require("../util/token");
const router = Router();
const connection = require('../db/config');
const bcrypt = require('bcrypt');
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.register);

module.exports = router;