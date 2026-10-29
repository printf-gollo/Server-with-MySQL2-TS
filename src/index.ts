import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors()); // peticiones desde cualquier origen
app.use(express.json()); // leer json en las peticiones

// Ruta de prueba
app.get("/api/ping", (req, res) => {
  res.json({ mensaje: "Servidor de Préstamos funcionando correctamente 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
