const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM cliente ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query("SELECT * FROM cliente WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;
  if (!nombre)
    return res.status(400).json({ mensaje: "El nombre del cliente es obligatorio" });

  db.query(
    "INSERT INTO cliente (nombre, telefono, correo, direccion) VALUES (?, ?, ?, ?)",
    [nombre, telefono, correo, direccion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensaje: "Cliente creado", id: results.insertId });
    },
  );
};

exports.update = (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;
  if (!nombre)
    return res.status(400).json({ mensaje: "El nombre del cliente es obligatorio" });

  db.query(
    "UPDATE cliente SET nombre = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?",
    [nombre, telefono, correo, direccion, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Cliente no encontrado" });
      res.json({ mensaje: "Cliente actualizado" });
    },
  );
};

exports.delete = (req, res) => {
  db.query("DELETE FROM cliente WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    res.json({ mensaje: "Cliente eliminado" });
  });
};
