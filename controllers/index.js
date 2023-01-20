const router = require("express").Router();
const apiRoutes = require("./api");
const baseRoutes = require("./baseRoutes");

router.use("/api", apiRoutes);
router.use("/", baseRoutes)

module.exports = router;
