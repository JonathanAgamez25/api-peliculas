const db = require("../config/db");

// Obtener todos los tipos
exports.getAll = (req, res) => {
  db.query("SELECT * FROM tipo", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM tipo WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Tipo no encontrado" });
      res.json(results[0]);
    },
  );
};
// Crear un tipo

exports.create = (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es requerido" });
  db.query(
    "INSERT INTO tipo (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, nombre, descripcion });
    },
  );
};

// Actualizar un tipo
exports.update = (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es requerido" });
  db.query(
    "UPDATE tipo SET nombre = ?, descripcion = ? WHERE id = ?",
    [nombre, descripcion, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ error: "Tipo no encontrado" });
      res.json({ id: req.params.id, nombre, descripcion });
    },
  );
};

// eliminar un tipo
exports.delete = (req, res) => {
  db.query("DELETE FROM tipo WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Tipo no encontrado" });
    res.json({ message: "Tipo eliminado" });
  });
};
