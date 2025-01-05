const DUMMY_JSON_URL = "https://dummyjson.com/posts";

// Récupérer l'ID de l'article depuis l'URL
function getArticleIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Supprimer l'article
async function deleteArticle() {
  const articleId = getArticleIdFromUrl();
  if (!articleId) return;

  try {
    const response = await fetch(`${DUMMY_JSON_URL}/${articleId}`, { method: "DELETE" });

    if (response.ok) {
      alert("Article supprimé avec succès !");
      window.location.href = "index.html";
    } else {
      throw new Error("Erreur lors de la suppression de l'article.");
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue.");
  }
}

// Ajouter un événement au bouton de confirmation
document.getElementById("confirm-delete").addEventListener("click", deleteArticle);
