const db = require("../config/db");

// Obtener todos los géneros
exports.getAll = (req, res) => {
  db.query("SELECT * FROM genero", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener un género por ID
exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM genero WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ mensaje: "Género no encontrado" });
      res.json(results[0]);
    },
  );
};

// Crear un género
exports.create = (req, res) => {
  const { nombre, estado, descripcion } = req.body;
  if (!nombre)
    return res.status(400).json({ mensaje: "El nombre es requerido" });
  db.query(
    "INSERT INTO genero (nombre, estado, descripcion) VALUES (?, ?, ?)",
    [nombre, estado || "activo", descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: "Género creado", id: results.insertId });
    },
  );
};

// Actualizar un género
exports.update = (req, res) => {
  const { nombre, estado, descripcion } = req.body;
  db.query(
    "UPDATE genero SET nombre = ?, estado = ?, descripcion = ? WHERE id = ?",
    [nombre, estado, descripcion, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Género no encontrado" });
      res.json({ mensaje: "Género actualizado" });
    },
  );
};

// Eliminar un género
exports.delete = (req, res) => {
  db.query(
    "DELETE FROM genero WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Género no encontrado" });
      res.json({ mensaje: "Género eliminado" });
    },
  );
};
