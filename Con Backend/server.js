const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 👇 ESTO ES LO QUE TE FALTABA
app.use(express.static("public"));

// base de datos en memoria
let baseDatos = {};

// obtener alumnos
app.get("/alumnos/:id", (req, res) => {
  const id = req.params.id;
  res.json(baseDatos[id] || []);
});

// guardar alumno
app.post("/alumnos/:id", (req, res) => {
  const id = req.params.id;

  if (!baseDatos[id]) {
    baseDatos[id] = [];
  }

  baseDatos[id].push(req.body);
  res.json({ ok: true });
});

// iniciar servidor
app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo en http://localhost:3000");
});