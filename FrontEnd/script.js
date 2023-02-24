fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json();
  })
  .then(data => {
    const gallery = document.querySelector('#items-container');
  
    // Boucle sur chaque élément du tableau de données
    data.forEach(element => {
      const imgUrl = element.imageUrl;
      const captionText = element.title;
      const category = element.category.toLowerCase();

      // Création nouvel élément <figure>
      const figure = document.createElement('figure');
      figure.dataset.category = category;

      // Création nouvel élément <img> et <figcaption>
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = 'Image';
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = captionText;

      // Insérer l'image et le figcaption dans la figure
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Insérer la figure dans la galerie
      gallery.appendChild(figure);
    });

    const filterButtons = document.querySelectorAll('.filter-button');

    // Ajouter un écouteur d'événement à chaque bouton de filtre
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedCategory = button.id.toLowerCase();

        // Parcourir les éléments de la galerie
        gallery.querySelectorAll('figure').forEach(item => {
          const itemCategory = item.dataset.category;

          // Masquer ou afficher l'élément en fonction de sa catégorie
          if (selectedCategory === 'all' || selectedCategory === itemCategory) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
