const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviewsController");

// INDEX

router.get("/", reviewsController.index);

// SHOW

router.get("/:id", reviewsController.show);

module.exports = router;
