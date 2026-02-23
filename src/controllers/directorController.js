const db = require("../config/db");

// Obtener todos los directores
exports.getAll = (req, res) => {
  db.query("SELECT * FROM director", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un director por ID
exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM director WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ mensaje: "Director no encontrado" });
      res.json(results[0]);
    },
  );
};

// Crear un director
exports.create = (req, res) => {
  const { nombres, estado } = req.body;
  if (!nombres)
    return res.status(400).json({ mensaje: "El nombre es requerido" });
  db.query(
    "INSERT INTO director (nombres, estado) VALUES (?, ?)",
    [nombres, estado || "activo"],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ mensaje: "Director creado", id: results.insertId });
    },
  );
};

// Actualizar un director
exports.update = (req, res) => {
  const { nombres, estado } = req.body;
  db.query(
    "UPDATE director SET nombres = ?, estado = ? WHERE id = ?",
    [nombres, estado, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Director no encontrado" });
      res.json({ mensaje: "Director actualizado" });
    },
  );
};

// Eliminar un director
exports.delete = (req, res) => {
  db.query(
    "DELETE FROM director WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Director no encontrado" });
      res.json({ mensaje: "Director eliminado" });
    },
  );
};
