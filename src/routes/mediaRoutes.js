const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");

router.get("/", mediaController.getAll);
router.get("/:id", mediaController.getById);
router.post("/", mediaController.create);
router.put("/:id", mediaController.update);
router.delete("/:id", mediaController.delete);

module.exports = router;
