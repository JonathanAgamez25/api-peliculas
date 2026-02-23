const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query(
    `
        SELECT m.*, g.nombre AS genero, d.nombres AS director, 
               p.nombre AS productora, t.nombre AS tipo
        FROM media m
        JOIN genero g ON m.genero_id = g.id
        JOIN director d ON m.director_id = d.id
        JOIN productora p ON m.productora_id = p.id
        JOIN tipo t ON m.tipo_id = t.id
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
    SELECT m.*, g.nombre AS genero, d.nombres AS director, 
           p.nombre AS productora, t.nombre AS tipo
    FROM media m
    JOIN genero g ON m.genero_id = g.id
    JOIN director d ON m.director_id = d.id
    JOIN productora p ON m.productora_id = p.id
    JOIN tipo t ON m.tipo_id = t.id
    WHERE m.id = ?
  `,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ mensaje: "Media no encontrada" });
      res.json(results[0]);
    },
  );
};

exports.create = (req, res) => {
  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen_portada,
    anio_estreno,
    genero_id,
    director_id,
    productora_id,
    tipo_id,
  } = req.body;

  // Validar campos requeridos
  if (
    !serial ||
    !titulo ||
    !url ||
    !genero_id ||
    !director_id ||
    !productora_id ||
    !tipo_id
  )
    return res.status(400).json({
      mensaje:
        "Los campos serial, titulo, url, genero_id, director_id, productora_id y tipo_id son requeridos",
    });

  // Validar que el género esté activo
  db.query(
    "SELECT * FROM genero WHERE id = ? AND estado = 'activo'",
    [genero_id],
    (err, generos) => {
      if (err) return res.status(500).json({ error: err.message });
      if (generos.length === 0)
        return res
          .status(400)
          .json({ mensaje: "El género no existe o no está activo" });

      // Validar que el director esté activo
      db.query(
        "SELECT * FROM director WHERE id = ? AND estado = 'activo'",
        [director_id],
        (err, directores) => {
          if (err) return res.status(500).json({ error: err.message });
          if (directores.length === 0)
            return res
              .status(400)
              .json({ mensaje: "El director no existe o no está activo" });

          // Validar que la productora esté activa
          db.query(
            "SELECT * FROM productora WHERE id = ? AND estado = 'activo'",
            [productora_id],
            (err, productoras) => {
              if (err) return res.status(500).json({ error: err.message });
              if (productoras.length === 0)
                return res.status(400).json({
                  mensaje: "La productora no existe o no está activa",
                });

              // Insertar la película
              db.query(
                "INSERT INTO media (serial, titulo, sinopsis, url, imagen_portada, anio_estreno, genero_id, director_id, productora_id, tipo_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  serial,
                  titulo,
                  sinopsis,
                  url,
                  imagen_portada,
                  anio_estreno,
                  genero_id,
                  director_id,
                  productora_id,
                  tipo_id,
                ],
                (err, results) => {
                  if (err) return res.status(500).json({ error: err.message });
                  res
                    .status(201)
                    .json({ mensaje: "Media creada", id: results.insertId });
                },
              );
            },
          );
        },
      );
    },
  );
};

exports.update = (req, res) => {
  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen_portada,
    anio_estreno,
    genero_id,
    director_id,
    productora_id,
    tipo_id,
  } = req.body;

  if (
    !serial ||
    !titulo ||
    !url ||
    !genero_id ||
    !director_id ||
    !productora_id ||
    !tipo_id
  )
    return res.status(400).json({
      mensaje:
        "Los campos serial, titulo, url, genero_id, director_id, productora_id y tipo_id son requeridos",
    });

  db.query(
    "SELECT * FROM genero WHERE id = ? AND estado = 'activo'",
    [genero_id],
    (err, generos) => {
      if (err) return res.status(500).json({ error: err.message });
      if (generos.length === 0)
        return res
          .status(400)
          .json({ mensaje: "El género no existe o no está activo" });

      db.query(
        "SELECT * FROM director WHERE id = ? AND estado = 'activo'",
        [director_id],
        (err, directores) => {
          if (err) return res.status(500).json({ error: err.message });
          if (directores.length === 0)
            return res
              .status(400)
              .json({ mensaje: "El director no existe o no está activo" });

          db.query(
            "SELECT * FROM productora WHERE id = ? AND estado = 'activo'",
            [productora_id],
            (err, productoras) => {
              if (err) return res.status(500).json({ error: err.message });
              if (productoras.length === 0)
                return res.status(400).json({
                  mensaje: "La productora no existe o no está activa",
                });

              db.query(
                "UPDATE media SET serial=?, titulo=?, sinopsis=?, url=?, imagen_portada=?, anio_estreno=?, genero_id=?, director_id=?, productora_id=?, tipo_id=? WHERE id=?",
                [
                  serial,
                  titulo,
                  sinopsis,
                  url,
                  imagen_portada,
                  anio_estreno,
                  genero_id,
                  director_id,
                  productora_id,
                  tipo_id,
                  req.params.id,
                ],
                (err, results) => {
                  if (err) return res.status(500).json({ error: err.message });
                  if (results.affectedRows === 0)
                    return res
                      .status(404)
                      .json({ mensaje: "Media no encontrada" });
                  res.json({ mensaje: "Media actualizada" });
                },
              );
            },
          );
        },
      );
    },
  );
};

exports.delete = (req, res) => {
  db.query(
    "DELETE FROM media WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({ mensaje: "Media no encontrada" });
      res.json({ mensaje: "Media eliminada" });
    },
  );
};
