// index.js
const express = require("express");
const router = express.Router();

router.use("/products", require("./productRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/items", require("./itemRoutes"));
router.use("/loginReact", require("./loginReactRoutes"));
router.use("/register", require("./registerRoutes"));
router.use("/mp", require("./mercadoPagoRoutes"));

module.exports = router;
