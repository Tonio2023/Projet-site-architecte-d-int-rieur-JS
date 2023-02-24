// Affichages des travaux dans la galerie 

fetch('http://localhost:5678/api/works')
.then(response => {
  return response.json();
})
.then(data => {
  //console.log(data);

  const gallery = document.querySelector('.gallery');

  // Boucle sur chaque élément du tableau de données
  data.forEach(element => {
    const imgUrl = element.imageUrl;
    const captionText = element.title;

    // Création nouvel élément <figure>
    const figure = document.createElement('figure');

    // Création nouvel élément <img> et <figcaption>
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Image';
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = captionText;

    // Insérer l'image et le figcaption dans la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Insérer la figure dans la <div>
    gallery.appendChild(figure);
  });
});


fetch("http://localhost:5678/api/works/")
  .then(response => response.json())
  .then(data => {
    const categoryNames = data.map(item => item.category.name);
    console.log(categoryNames);
  })
  .catch(error => console.error(error));

//Affichage des éléments en fonction ds buttons filtres

  /*const filterButtons = document.querySelectorAll(".filter-button");
  const itemsContainer = document.getElementById("items-container");
  
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(items => {
      const categories = new Set(); //création de l'objet set
      items.forEach(item => {
        const category = item.category.replace(/\s+/g, '-'); // remplace les espaces par des tirets
        categories.add(category);
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.classList.add(category);
        itemElement.textContent = item.name;
        itemsContainer.appendChild(itemElement);
      });
      // Création dynamique des boutons de filtre à partir de l'objet Set
      const filterButtonContainer = document.getElementById("filter-buttons");
      categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.classList.add("filter-button");
        filterButton.dataset.filter = category;
        filterButton.textContent = category.replace(/-/g, ' ');
        filterButtonContainer.appendChild(filterButton);
      });
  
      // Filtrage des éléments en fonction des boutons de filtre
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          const filter = button.dataset.filter;
          const items = document.querySelectorAll(".item");
          items.forEach(item => {
            if (filter === "Tous") {
              item.classList.add("show");
            } else if (item.classList.contains(filter)) {
              item.classList.add("show");
            } else {
              item.classList.remove("show");
            }
          });
        });
      });
    });*/