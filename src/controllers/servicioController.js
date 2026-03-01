const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM servicio ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query("SELECT * FROM servicio WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { nombre, tipo, costo_base, descripcion } = req.body;
  if (!nombre || !tipo)
    return res.status(400).json({ mensaje: "nombre y tipo son campos requeridos" });

  db.query(
    "INSERT INTO servicio (nombre, tipo, costo_base, descripcion) VALUES (?, ?, ?, ?)",
    [nombre, tipo, costo_base || 0, descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: "Servicio creado", id: results.insertId });
    },
  );
};

exports.update = (req, res) => {
  const { nombre, tipo, costo_base, descripcion } = req.body;
  if (!nombre || !tipo)
    return res.status(400).json({ mensaje: "nombre y tipo son campos requeridos" });

  db.query(
    "UPDATE servicio SET nombre = ?, tipo = ?, costo_base = ?, descripcion = ? WHERE id = ?",
    [nombre, tipo, costo_base || 0, descripcion, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Servicio no encontrado" });
      res.json({ mensaje: "Servicio actualizado" });
    },
  );
};

exports.delete = (req, res) => {
  db.query("DELETE FROM servicio WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    res.json({ mensaje: "Servicio eliminado" });
  });
};
