const express = require("express");
const router = express.Router();
const productoraController = require("../controllers/productoraController");

router.get("/", productoraController.getAll);
router.get("/:id", productoraController.getById);
router.post("/", productoraController.create);
router.put("/:id", productoraController.update);
router.delete("/:id", productoraController.delete);

module.exports = router;
