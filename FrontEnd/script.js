fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);

    const firstElement = data[0];
    const imgUrl = firstElement.imageUrl;
    const captionText = 'Abat-jour Tahina';

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

    // Sélectionner la <div> avec la classe ".gallery"
    const gallery = document.querySelector('.gallery');

    // Insérer la figure dans la <div>
    gallery.appendChild(figure);

  });