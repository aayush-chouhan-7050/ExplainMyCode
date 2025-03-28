const express = require("express");
const { debugCode } = require("../controllers/debugController");
const router = express.Router();

router.post("/", debugCode);

module.exports = router;
