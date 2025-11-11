import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "clave-secreta";

app.use(express.json());

// Middleware de autenticación
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
  next();
});

// Ruta raíz para verificar que el servidor está activo
app.get("/", (req, res) => {
  res.send("🚀 Maestro Constructor API funcionando correctamente desde Render.");
});

// Endpoint de prueba
app.get("/listarArchivos", (req, res) => {
  res.json({
    archivos: [
      { nombre: "plano1.pdf", tipo: "pdf" },
      { nombre: "presupuesto.xlsx", tipo: "excel" }
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
