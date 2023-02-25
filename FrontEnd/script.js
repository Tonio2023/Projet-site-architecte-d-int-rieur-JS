// Récupérer les boutons filtres
const filterButtons = document.querySelectorAll('.filter-button');

// Récupérer la galerie de travaux
const gallery = document.querySelector('.gallery');

// Récupérer les données des travaux de l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Fonction pour afficher les travaux en fonction de leur categoryId
    function afficherWorks(categoryId) {
      // Vider la galerie de travaux
      gallery.innerHTML = '';
      // Filtrer les travaux en fonction de leur categoryId
      const filteredWorks = categoryId === 'All' ? data : data.filter(work => {
        return work.categoryId === categoryId;
      });
      // Boucler sur les travaux filtrés et les afficher
      filteredWorks.forEach(work => {
        // Créer un élément figure avec l'image et le titre
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = 'Image';
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        // Ajouter l'image et le titre à la figure
        figure.appendChild(img);
        figure.appendChild(figcaption);
        // Ajouter la figure à la galerie
        gallery.appendChild(figure);
      });
    }

    // Afficher tous les travaux par défaut
    afficherWorks('All');

    // Ajouter un écouteur d'événement sur le bouton "Tous"
    const allButton = document.getElementById('All');
    allButton.addEventListener('click', () => {
      // Afficher tous les travaux
      afficherWorks('All');
    });

    // Ajouter un écouteur d'événement sur le bouton "Objets"
    const objetsButton = document.getElementById('Objets');
    objetsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 1 (Objets)
      afficherWorks(1);
    });

    // Ajouter un écouteur d'événement sur le bouton "Appartements"
    const appartementsButton = document.getElementById('Appartements');
    appartementsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 2 (Appartements)
      afficherWorks(2);
    });

    // Ajouter un écouteur d'événement sur le bouton "Hotels & restaurants"
    const hotelsButton = document.getElementById('Hotels');
    hotelsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 3 (Hotels & restaurants)
      afficherWorks(3);
    });

  
  });
