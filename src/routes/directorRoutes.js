const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController");

router.get("/", directorController.getAll);
router.get("/:id", directorController.getById);
router.post("/", directorController.create);
router.put("/:id", directorController.update);
router.delete("/:id", directorController.delete);

module.exports = router;
