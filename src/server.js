require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());


app.use(express.json());


app.use(express.static("public"));


app.use("/api/news", newsRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);  // Log de l'erreur pour le suivi en développement
  res.status(err.status || 500).json({
    message: err.message || "Une erreur interne est survenue.",
    error: process.env.NODE_ENV === "development" ? err : {},  // Affiche l'erreur détaillée en mode développement
  });
});

// Route pour gérer les routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée." });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
