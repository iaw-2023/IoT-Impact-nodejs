// index.js
const express = require("express");
const router = express.Router();

router.use("/products", require("./productRoutes"));
router.use("/categories", require("./categoryRoutes"));

module.exports = router;
