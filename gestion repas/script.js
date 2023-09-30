document
  .getElementById("ajoutForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nomRepas = document.getElementById("nomRepas").value;
    const descriptionRepas = document.getElementById("descriptionRepas").value;
    const categorieRepas = document.getElementById("categorieRepas").value;

    const formData = new FormData();
    formData.append("nom", nomRepas);
    formData.append("description", descriptionRepas);
    formData.append("categorie", categorieRepas);

    fetch("ajouter_repas.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Repas ajouté :", data);
        // Actualiser la liste des repas après l'ajout
        chargerListeRepas();
      })
      .catch((error) => console.error("Error:", error));
  });

// Fonction pour charger la liste des repas
function chargerListeRepas() {
  fetch('recuperer_repas.php')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const listeRepas = document.getElementById('listeRepas');
          listeRepas.innerHTML = ''; // Nettoyer la liste des repas

          data.forEach(repas => {
              const card = document.createElement('div');
              card.classList.add('card', 'mb-3');

              const cardBody = document.createElement('div');
              cardBody.classList.add('card-body');

              const cardTitle = document.createElement('h5');
              cardTitle.classList.add('card-title');
              cardTitle.textContent = repas.nom;

              const cardText = document.createElement('p');
              cardText.classList.add('card-text');
              cardText.textContent = `${repas.description} (${repas.categorie})`;

              const boutonSupprimer = document.createElement('button');
              boutonSupprimer.classList.add('btn', 'btn-danger');
              boutonSupprimer.textContent = 'Supprimer';
              boutonSupprimer.addEventListener('click', () => supprimerRepas(repas.id));

              cardBody.appendChild(cardTitle);
              cardBody.appendChild(cardText);
              cardBody.appendChild(boutonSupprimer);

              card.appendChild(cardBody);

              listeRepas.appendChild(card);
          });
      })
      .catch(error => console.error('Error:', error));
}


// Fonction pour supprimer un repas
function supprimerRepas(idRepas) {
  fetch('supprimer_repas.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `id=${idRepas}`
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Réponse du serveur :', data);
      // Actualiser la liste des repas après la suppression
      chargerListeRepas();
  })
  .catch(error => console.error('Error:', error));
}


  // Charger la liste des repas au chargement de la page
  window.onload = chargerListeRepas;