const express = require("express");
const router = express.Router();
const authenticaton = require('./authentication.router');

// authentication section
router.use("/auth", authenticaton);

module.exports = router;