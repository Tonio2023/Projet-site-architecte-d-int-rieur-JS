fetch('http://localhost:5678/api/works')
.then(response => {
  return response.json();
})
.then(data => {
  console.log(data);

  const gallery = document.querySelector('.gallery');

  // Boucle sur chaque élément du tableau de données
  data.forEach(element => {
    const imgUrl = element.imageUrl;
    const captionText = element.title;

    // Créer un nouvel élément <figure>
    const figure = document.createElement('figure');

    // Créer un nouvel élément <img> et <figcaption>
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