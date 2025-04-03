const express = require("express");
const { debugCode } = require("../controllers/debugController");
const { getDebugHistory } = require("../controllers/debugHistoryController");
const router = express.Router();

router.post("/", debugCode);

router.get("/history", getDebugHistory);


module.exports = router;
