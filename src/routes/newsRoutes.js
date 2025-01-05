const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Route pour récupérer tous les articles
router.get("/", newsController.getAllNews);

// Route pour récupérer un article par son ID
router.get("/:id", newsController.getNewsById);

// Route pour créer un article
router.post(
  "/",
  [
    body("title").not().isEmpty().withMessage("Le titre est requis"),
    body("body").not().isEmpty().withMessage("Le contenu est requis"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  newsController.createNews
);

// Route pour mettre à jour un article
router.put("/:id", newsController.updateNews);

// Route pour supprimer un article
router.delete("/:id", newsController.deleteNews);

module.exports = router;
