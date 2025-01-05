// Fonction pour récupérer et afficher les articles
async function fetchNews() {
  try {
    // Envoi de la requête pour récupérer les articles
    const response = await fetch("/api/news");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    // Traitement des données JSON retournées
    const data = await response.json();

    if (!data.posts || !Array.isArray(data.posts)) {
      throw new Error("Données inattendues reçues depuis l'API.");
    }

    // Affichage des articles
    displayArticles(data.posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    alert("Impossible de charger les articles. Veuillez réessayer plus tard.");
  }
}

// Fonction pour afficher les articles dans le conteneur
function displayArticles(articles) {
  const container = document.getElementById("articles-container");

  // Réinitialisation du conteneur avant d'ajouter les nouveaux articles
  container.innerHTML = "";

  if (articles.length === 0) {
    container.innerHTML = `<p class="text-muted">Aucun article disponible pour le moment.</p>`;
    return;
  }

  // Génération des cartes pour chaque article
  articles.forEach((article) => {
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${sanitizeHTML(article.title)}</h5>
            <p class="card-text">
              ${sanitizeHTML(article.body.substring(0, 100))}...
            </p>
            <a href="/news-details.html?id=${article.id}" class="btn btn-primary">Lire la suite</a>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}

// Fonction pour échapper les caractères HTML
function sanitizeHTML(text) {
  const element = document.createElement('div');
  if (text) {
    element.innerText = text;
    element.textContent = text;
  }
  return element.innerHTML;
}

// Appel de la fonction pour récupérer et afficher les articles dès que la page est chargée
document.addEventListener("DOMContentLoaded", fetchNews);
