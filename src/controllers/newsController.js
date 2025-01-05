const axios = require("axios");
const DUMMY_JSON_URL = "https://dummyjson.com/posts"; // Vérifiez que cette URL est correcte pour l'API

const newsController = {
  // Récupérer tous les articles
  async getAllNews(req, res) {
    try {
      const response = await axios.get(DUMMY_JSON_URL); // Méthode GET pour récupérer les articles
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  // Récupérer un article par ID
  async getNewsById(req, res) {
    const { id } = req.params;
    try {
      const response = await axios.get(`${DUMMY_JSON_URL}/${id}`); // Méthode GET pour un article spécifique
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article ${id}:`, error.response ? error.response.data : error.message);
      res.status(404).json({ message: "Article non trouvé." });
    }
  },

  // Créer un nouvel article
  async createNews(req, res) {
    const { title, body, link } = req.body;
    try {
      // Assurez-vous que la méthode POST est bien supportée et que l'URL est correcte
      const response = await axios.post(DUMMY_JSON_URL, { title, body, link });
      res.status(201).json(response.data); // Réponse avec le nouvel article
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  // Mettre à jour un article
  async updateNews(req, res) {
    const { id } = req.params;
    const { title, body, link } = req.body;
    try {
      const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, { title, body, link }); // Méthode PUT pour la mise à jour
      res.status(200).json(response.data); // Réponse avec l'article mis à jour
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'article ${id}:`, error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  // Supprimer un article
  async deleteNews(req, res) {
    const { id } = req.params;
    try {
      await axios.delete(`${DUMMY_JSON_URL}/${id}`); // Méthode DELETE pour supprimer l'article
      res.status(200).json({ message: "Article supprimé." });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'article ${id}:`, error.response ? error.response.data : error.message);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },
};

module.exports = newsController;
