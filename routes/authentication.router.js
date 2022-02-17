const express = require("express");
const authentication = require('../controller/authentication.controller');
const router = express.Router();

router.post('/login', authentication.login);
router.post('/signup', authentication.signup);
router.post('/', authentication.verify, (req, res) => {
    res.send('Hi');
});

module.exports = router;