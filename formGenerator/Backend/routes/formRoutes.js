const express = require("express");
const router = express.Router();
const { submitForm, getAllResponses } = require("../controller/formController");

router.post("/submit", submitForm);
router.get("/responses", getAllResponses);

module.exports = router;