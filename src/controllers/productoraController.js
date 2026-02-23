const db = require("../config/db");

// Obtener todos los productoras
exports.getAll = (req, res) => {
  db.query("SELECT * FROM productora", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM productora WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ mensaje: "Productora no encontrada" });
      res.json(results[0]);
    },
  );
};

// Crear un productora
exports.create = (req, res) => {
  const { nombre, estado, slogan, descripcion } = req.body;
  if (!nombre)
    return res.status(400).json({ mensaje: "El nombre es requerido" });
  db.query(
    "INSERT INTO productora (nombre, estado, slogan, descripcion) VALUES (?, ?, ?, ?)",
    [nombre, estado || "activo", slogan, descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ mensaje: "Productora creada", id: results.insertId });
    },
  );
};
// Actualizar un productora
exports.update = (req, res) => {
  const { nombre, estado, slogan, descripcion } = req.body;
  db.query(
    "UPDATE productora SET nombre = ?, estado = ?, slogan = ?, descripcion = ? WHERE id = ?",
    [nombre, estado, slogan, descripcion, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Productora no encontrada" });
      res.json({ mensaje: "Productora actualizada" });
    },
  );
};

// Eliminar un productora
exports.delete = (req, res) => {
  db.query(
    "DELETE FROM productora WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Productora no encontrada" });
      res.json({ mensaje: "Productora eliminada" });
    },
  );
};
