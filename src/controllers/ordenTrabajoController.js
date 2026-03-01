const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query(
    `
    SELECT o.*, c.nombre AS cliente, s.nombre AS servicio
    FROM orden_trabajo o
    JOIN cliente c ON c.id = o.cliente_id
    JOIN servicio s ON s.id = o.servicio_id
    ORDER BY o.id DESC
    `,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    },
  );
};

exports.getById = (req, res) => {
  db.query(
    `
    SELECT o.*, c.nombre AS cliente, s.nombre AS servicio
    FROM orden_trabajo o
    JOIN cliente c ON c.id = o.cliente_id
    JOIN servicio s ON s.id = o.servicio_id
    WHERE o.id = ?
    `,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ mensaje: "Orden de trabajo no encontrada" });
      res.json(results[0]);
    },
  );
};

exports.create = (req, res) => {
  const { cliente_id, servicio_id, fecha_programada, estado, observaciones } = req.body;

  if (!cliente_id || !servicio_id || !fecha_programada)
    return res.status(400).json({
      mensaje: "cliente_id, servicio_id y fecha_programada son requeridos",
    });

  db.query("SELECT id FROM cliente WHERE id = ?", [cliente_id], (err, clientes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (clientes.length === 0)
      return res.status(400).json({ mensaje: "El cliente no existe" });

    db.query("SELECT id FROM servicio WHERE id = ?", [servicio_id], (err, servicios) => {
      if (err) return res.status(500).json({ error: err.message });
      if (servicios.length === 0)
        return res.status(400).json({ mensaje: "El servicio no existe" });

      db.query(
        "INSERT INTO orden_trabajo (cliente_id, servicio_id, fecha_programada, estado, observaciones) VALUES (?, ?, ?, ?, ?)",
        [
          cliente_id,
          servicio_id,
          fecha_programada,
          estado || "pendiente",
          observaciones,
        ],
        (insertErr, results) => {
          if (insertErr) return res.status(500).json({ error: insertErr.message });
          res
            .status(201)
            .json({ mensaje: "Orden de trabajo creada", id: results.insertId });
        },
      );
    });
  });
};

exports.update = (req, res) => {
  const { cliente_id, servicio_id, fecha_programada, estado, observaciones } = req.body;

  if (!cliente_id || !servicio_id || !fecha_programada || !estado)
    return res.status(400).json({
      mensaje: "cliente_id, servicio_id, fecha_programada y estado son requeridos",
    });

  db.query(
    "UPDATE orden_trabajo SET cliente_id = ?, servicio_id = ?, fecha_programada = ?, estado = ?, observaciones = ? WHERE id = ?",
    [
      cliente_id,
      servicio_id,
      fecha_programada,
      estado,
      observaciones,
      req.params.id,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Orden de trabajo no encontrada" });
      res.json({ mensaje: "Orden de trabajo actualizada" });
    },
  );
};

exports.delete = (req, res) => {
  db.query("DELETE FROM orden_trabajo WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ mensaje: "Orden de trabajo no encontrada" });
    res.json({ mensaje: "Orden de trabajo eliminada" });
  });
};
