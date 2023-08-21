const express = require("express");
const router = express.Router();
const { getCities, addCities, updateCities, deleteCities } = require('../Controller/controller');

router.get("/getCities", getCities);
router.post("/addCities", addCities);
router.put("/updateCities", updateCities);
router.delete("/deleteCities", deleteCities);

module.exports = router;