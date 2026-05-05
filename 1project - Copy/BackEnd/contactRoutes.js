const express = require("express");
const router = express.Router();
const contactController = require("./contactController");

router.post("/contact", contactController.sendContact);

module.exports = router;