const express = require("express");
const router = express.Router();
const tipoController = require("../controllers/tipoController");

router.get("/", tipoController.getAll);
router.get("/:id", tipoController.getById);
router.post("/", tipoController.create);
router.put("/:id", tipoController.update);
router.delete("/:id", tipoController.delete);

module.exports = router;
