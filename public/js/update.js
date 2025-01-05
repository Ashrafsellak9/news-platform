const DUMMY_JSON_URL = "https://dummyjson.com/posts";

// Récupérer l'ID de l'article depuis l'URL
function getArticleIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Pré-remplir le formulaire avec les données existantes
async function fetchArticleDetails() {
  const articleId = getArticleIdFromUrl();
  if (!articleId) return;

  try {
    const response = await fetch(`${DUMMY_JSON_URL}/${articleId}`);
    const article = await response.json();

    document.getElementById("title").value = article.title;
    document.getElementById("body").value = article.body;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'article :", error);
  }
}

// Envoyer les modifications au serveur
async function updateArticle(event) {
  event.preventDefault();

  const articleId = getArticleIdFromUrl();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  try {
    const response = await fetch(`${DUMMY_JSON_URL}/${articleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      alert("Article modifié avec succès !");
      window.location.href = "index.html";
    } else {
      throw new Error("Erreur lors de la modification de l'article.");
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue.");
  }
}

// Initialiser la page
document.getElementById("update-form").addEventListener("submit", updateArticle);
fetchArticleDetails();
