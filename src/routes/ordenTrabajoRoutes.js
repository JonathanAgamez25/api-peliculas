const express = require("express");
const router = express.Router();
const ordenTrabajoController = require("../controllers/ordenTrabajoController");

router.get("/", ordenTrabajoController.getAll);
router.get("/:id", ordenTrabajoController.getById);
router.post("/", ordenTrabajoController.create);
router.put("/:id", ordenTrabajoController.update);
router.delete("/:id", ordenTrabajoController.delete);

module.exports = router;
