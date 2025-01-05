const DUMMY_JSON_URL = "https://dummyjson.com/posts";

// Fonction pour récupérer l'ID de l'article depuis l'URL
function getArticleIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Fonction pour afficher un message d'erreur ou de notification
function displayMessage(message, isError = false) {
  const container = document.getElementById("news-details-container");
  container.innerHTML = `
    <p style="color: ${isError ? 'red' : '#333'}; text-align: center; font-size: 1.2em;">
      ${message}
    </p>
  `;
}

// Fonction principale pour récupérer et afficher les détails de l'article
async function fetchNewsDetails() {
  const articleId = getArticleIdFromUrl();

  // Vérifier si l'ID de l'article est présent dans l'URL
  if (!articleId) {
    displayMessage("Aucun article sélectionné. Veuillez revenir à la liste.");
    return;
  }

  try {
    // Récupérer les données de l'article via l'API
    const response = await fetch(`${DUMMY_JSON_URL}/${articleId}`);

    // Vérifier si la réponse est valide
    if (!response.ok) {
      throw new Error("Impossible de trouver l'article.");
    }

    const article = await response.json();

    // Mettre à jour le contenu de la page avec les détails de l'article
    document.getElementById("news-title").textContent = article.title;
    document.getElementById("news-body").textContent = article.body;

    // Ajouter une image si disponible
    const imageElement = document.getElementById("news-image");
    if (article.image) {
      imageElement.src = article.image;
      imageElement.alt = article.title;
      imageElement.style.display = "block"; // S'assurer que l'image est visible
    } else {
      imageElement.style.display = "none"; // Cacher l'image si non disponible
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article :", error);
    displayMessage("Impossible de charger les détails de l'article.", true);
  }
}

// Appeler la fonction pour charger les détails de l'article
fetchNewsDetails();
