const express = require("express"); // Framework web
const cors = require("cors"); // Gestion CORS
const { Pool } = require("pg"); // Client PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000; // Port configurable

// Configuration de la base de données
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || "admin"}:${process.env.DB_PASSWORD || "secret"}@${process.env.DB_HOST || "db"}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "mydb"}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // SSL si Render
});

// Middleware CORS : autorise les requêtes cross-origin
app.use(
  cors({
    origin: [
      "https://tp-docker-cicd-lime.vercel.app", // frontend déployé sur Vercel
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ROUTE API PRINCIPALE
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true,
  });
});

// ROUTE DATABASE : récupérer les données de la base
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({
      message: "Data from Database",
      data: result.rows,
      timestamp: new Date().toISOString(),
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Database error",
      error: err.message,
      success: false,
    });
  }
});

// DÉMARRAGE SERVEUR
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint: ${process.env.DATABASE_URL ? `https://tp-backend-docker-cicd.onrender.com/api` : `http://localhost:${PORT}/api`}`);
  console.log(`DB endpoint: ${process.env.DATABASE_URL ? `https://tp-backend-docker-cicd.onrender.com/db` : `http://localhost:${PORT}/db`}`);
});

