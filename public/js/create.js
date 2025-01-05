document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-article-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Validation personnalisée des champs
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Récupération des données du formulaire
    const title = document.getElementById("article-title").value.trim();
    const body = document.getElementById("article-body").value.trim();
    const link = document.getElementById("article-link").value.trim();

    const articleData = {
      title,
      body,
      link: link || null, // Envoie null si le lien est vide
    };

    console.log('Données envoyées:', articleData); // Debug

    try {
      // Envoi des données à l'API
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        // Affiche un message de succès et réinitialise le formulaire
        alert("Article publié avec succès !");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        // Gestion des erreurs renvoyées par le serveur
        const errorData = await response.json();
        console.error('Erreur de serveur:', errorData); // Debug
        alert(
          errorData.message || "Une erreur est survenue lors de la publication."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(
        "Impossible de publier l'article. Vérifiez votre connexion et réessayez."
      );
    }
  });
});
