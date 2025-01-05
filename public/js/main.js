// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
  try {
    const response = await fetch("/api/news");

    // Vérification si la réponse est correcte
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    // Vérification des données reçues
    if (!data.posts || !Array.isArray(data.posts)) {
      throw new Error("Données inattendues reçues depuis l'API.");
    }

    displayNews(data.posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    alert("Impossible de charger les articles. Veuillez réessayer plus tard.");
  }
}

// Fonction pour afficher les articles dans le conteneur HTML
function displayNews(news) {
  const container = document.getElementById("news-container");

  // Réinitialiser le conteneur avant d'ajouter les nouveaux articles
  container.innerHTML = "";

  if (news.length === 0) {
    container.innerHTML = `<p class="text-muted">Aucun article disponible pour le moment.</p>`;
    return;
  }

  // Générer les cartes pour chaque article
  news.forEach((article) => {
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${sanitizeHTML(article.title)}</h5>
            <p class="card-text">
              ${sanitizeHTML(article.body.substring(0, 100))}...
            </p>
            <a href="/news-details.html?id=${article.id}" class="btn btn-primary">Voir plus</a>
            <button 
              class="btn btn-danger mt-2" 
              onclick="deleteArticle(${article.id})"
            >
              Supprimer
            </button>
            <button 
              class="btn btn-warning mt-2" 
              onclick="editArticle(${article.id})"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}

// Fonction pour supprimer un article
async function deleteArticle(id) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

  try {
    const response = await fetch(`/api/news/${id}`, { method: "DELETE" });

    // Vérification de la réponse
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    alert("Article supprimé avec succès.");
    fetchLatestNews();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    alert("Impossible de supprimer l'article. Veuillez réessayer plus tard.");
  }
}

// Fonction pour modifier un article
async function editArticle(id) {
  const newTitle = prompt("Entrez le nouveau titre de l'article :");
  const newBody = prompt("Entrez le nouveau contenu de l'article :");
  const newLink = prompt("Entrez le nouveau lien (optionnel) :");

  // Validation des entrées utilisateur
  if (!newTitle || !newBody) {
    alert("Le titre et le contenu sont obligatoires.");
    return;
  }

  const updatedArticle = {
    title: newTitle.trim(),
    body: newBody.trim(),
  };

  // Ajouter le lien uniquement s'il est renseigné
  if (newLink) {
    updatedArticle.link = newLink.trim();
  }

  try {
    const response = await fetch(`/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticle),
    });

    // Vérification de la réponse
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    alert("Article modifié avec succès.");
    fetchLatestNews();
  } catch (error) {
    console.error("Erreur lors de la modification de l'article :", error);
    alert("Impossible de modifier l'article. Veuillez réessayer plus tard.");
  }
}

// Fonction pour échapper les caractères spéciaux dans les chaînes HTML
function sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

async function loadMore() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/news?page=${currentPage}&limit=${limit}`
    );
    const data = await response.json();

    const newsContainer = document.getElementById("news-container");
    data.news.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.body.substring(0, 100)}...</p>
        <a href="news-details.html?id=${article.id}">Voir plus</a>
      `;
      newsContainer.appendChild(articleDiv);
    });

    currentPage++;

    if (currentPage > data.totalPages) {
      document.getElementById("load-more").style.display = "none";
    }
  } catch (error) {
    console.error("Erreur lors du chargement des articles :", error);
  }
}


// Charger les articles dès que la page est prête
document.addEventListener("DOMContentLoaded", fetchLatestNews);
