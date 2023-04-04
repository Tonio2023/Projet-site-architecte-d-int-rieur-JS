let isLoaded = false; // Variable de contrôle pour vérifier si les photos sont déjà chargées

function openModal () {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.modal').style.display = 'block';
    
    

    if (!isLoaded) { // si les photos ne sont pas encore chargées
        fetch('http://localhost:5678/api/works')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const modalWorks = document.querySelector('.modalWorks');
            // console.log(data[0].id);
            
            // Boucle sur chaque élément du tableau de données
            data.forEach(element => {
                const imgUrl = element.imageUrl;
                const captionText = 'éditer';
                const workId = element.id
                
                
                // Créer un nouvel élément <figure>
                const figure = document.createElement('figure');
                figure.setAttribute("id", workId);
                figure.classList.add('modalFigure');
                
                // Créer un nouvel élément <img> et <figcaption>
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = 'Image';
                
                // Création button
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.classList.add('deleteWork');
                deleteBtn.dataset.id = element.id; // ajouter l'id de travail comme un attribut data pour l'utiliser plus tard
                
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash-can');
                deleteBtn.appendChild(deleteIcon);
                deleteBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const token = localStorage.getItem('token')
                    console.log(token); // Récupération de l'ID du travail à supprimer
                    fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    })
                    .then(response => {
                    if (response.ok) {
                      const modalWorks = document.querySelector('.modalWorks');
                      const workToRemove = document.getElementById(workId);
                      modalWorks.removeChild(workToRemove); // Suppression de l'élément de travail correspondant du DOM

                       // Suppression de l'élément correspondant dans la page d'accueil
                      const gallery = document.querySelector('.gallery');
                      const portfolioWorkToRemove = document.getElementById(workId);

                      if (portfolioWorkToRemove) {
                        gallery.removeChild(portfolioWorkToRemove);
                      }
                    }
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    });
                });
                    

                // Ajout du bouton à la figure
                figure.appendChild(deleteBtn);
                // Création du figcaption
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = captionText;

                // Insérer l'image et le figcaption dans la figure
                figure.appendChild(img);
                figure.appendChild(figcaption);

                // Insérer la figure dans la <div>
                modalWorks.appendChild(figure);
            });
            isLoaded = true; // Mise à jour de la variable 
        }); 
        }
        const modalBackground = document.querySelector('.overlay');
    modalBackground.addEventListener('click', closeModal)
}

// Fermer la modale
const closeButton = document.getElementById('idClose');
closeButton.addEventListener('click', closeModal);
function closeModal () {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
    const selectElement = document.querySelector("#category");
    selectElement.selectedIndex = 0;
    const titleElement = document.getElementById('title');
    titleElement.value = '';
    const imageInput = document.querySelector('#image-input');
    imageInput.value = '';
    const displayImage = document.querySelector('#display_image');
    while (displayImage.firstChild) {
    displayImage.removeChild(displayImage.firstChild);
    }

    const form = document.getElementById('form');
    form.reset();

}

// modale suivante
const nextButton = document.getElementById('nextModal');
nextButton.addEventListener('click', nextModal)
function nextModal() {
    document.querySelector('.modalWorks').style.display = 'none';
    document.querySelector('.modalFooter').style.display = 'none';
    document.querySelector('#title1').style.display = 'none';
    document.querySelector('.modalMain').style.display = 'none';
    document.querySelector('#title2').style.display = 'block';
    document.querySelector('.prevModal').style.display = 'block';
    document.querySelector('.formModal').style.display = 'block';
}

//modale précédente
const prevButton = document.getElementById('idPrev');
prevButton.addEventListener('click', prevModal);
function prevModal() {
    document.querySelector('.modalWorks').style.display = 'flex';
    document.querySelector('.modalFooter').style.display = 'flex';
    document.querySelector('#title1').style.display = 'block';
    document.querySelector('.modalMain').style.display = 'block';
    document.querySelector('#title2').style.display = 'none';
    document.querySelector('.prevModal').style.display = 'none';
    document.querySelector('.formModal').style.display = 'none';
}

// fonction afficher photo

const image_input = document.querySelector('#image_input');
let imageUrl = ''; // Initialisez une variable vide qui sera utilisée pour stocker l'URL de l'image sélectionnée

const imageInput = document.querySelector('#image_input');

// Ajoutez un écouteur d'événements qui se déclenche lorsque la valeur de "imageInput" change
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];  // Récupérez le fichier image sélectionné par l'utilisateur à partir de l'objet événement "event".
  const reader = new FileReader();  // Créez un nouvel objet FileReader qui sera utilisé pour lire le contenu du fichier image.

  // Ajoutez un écouteur d'événements qui se déclenche lorsque le contenu du fichier image est chargé.
  reader.addEventListener('load', () => {
    imageUrl = reader.result;

    const displayImage = document.querySelector('#display_image');
    while (displayImage.firstChild) {
      displayImage.removeChild(displayImage.firstChild);
    }

    // Créez un objet URL à partir de l'image base64
    const url = URL.createObjectURL(file);
    // Utilisez l'URL de l'objet pour afficher l'image
    const img = document.createElement('img');
    // Définissez l'URL de l'image comme la source de l'élément HTML "img".
    img.src = url;
    img.classList.add('imgAjout');
    document.querySelector('#display_image').appendChild(img);
  });
  // Lit le contenu du fichier image sous forme d'URL encodée en base64.
  reader.readAsDataURL(file);

    document.querySelector("#display_image").style.display = 'block';
    document.querySelector("#labelAjout").style.display = 'none';
    document.querySelector("#paraAjout").style.display = 'none';
    document.querySelector("#iconeAjout").style.display = 'none';

});





// Envoi nouveau projet

const form = document.getElementById('form');
const imageInpu = document.getElementById('image_input');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');

// écouteur d'événements qui se déclenche lorsque le formulaire est soumis.
form.addEventListener('submit', (e) => {
  // Empêche le comportement par défaut du formulaire (l'envoi de données et le rechargement de la page).
  e.preventDefault();
  
  const imageFile = imageInput.files[0];
  if (!imageFile) {
    alert('Veuillez télécharger une image.');
    return;
  }
  
  // Créez un nouvel objet FormData qui sera utilisé pour envoyer les données du formulaire (image, titre, catégorie).
  const formData = new FormData();
  formData.append('image', imageInput.files[0]); // Ajoutez le fichier image sélectionné par l'utilisateur à FormData.
  formData.append('title', titleInput.value); // Ajoutez la valeur du champ de saisie de titre à FormData.
  formData.append('category', categoryInput.value); // Ajoutez la valeur du champ de saisie de catégorie à FormData.
  
  
  const token = localStorage.getItem('token')
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    // Si la réponse n'est pas OK (200), lancez une erreur.
    if (!response.ok) {
      throw new Error('Erreur lors de la requête');
    }
    // Si la réponse est OK, renvoyez les données de la réponse sous forme d'objet JSON.
    return response.json();
  })
  .then(data => {
    // Faites quelque chose avec les données renvoyées (probablement les afficher dans l'interface utilisateur).
    
    const workId = data.id
    console.log(workId);
    //création de l'élément pour le portfolio
    const newFigureElement = document.createElement('figure');
    newFigureElement.classList.add('project');
    newFigureElement.setAttribute("id", workId);
    newFigureElement.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
    <h3>${data.title}</h3>
    `;
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(newFigureElement);
    
    
    
    
    // création de l'élément pour la modale
    const modalFigureElement = document.createElement('figure');
    modalFigureElement.classList.add('modalFigure');
    modalFigureElement.setAttribute("id", workId);
    modalFigureElement.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
     <figcaption>éditer</figcaption>
    `;
    // Création du bouton
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('deleteWork');
    deleteBtn.dataset.id = data.id;
    
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash-can');
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token')
      // Récupération de l'ID du travail à supprimer
      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          // Suppression de l'élément de travail correspondant du DOM
          const workId = data.id
          const modalWorks = document.querySelector('.modalWorks');
          const workToRemove = document.getElementById(workId);
          
          modalWorks.removeChild(workToRemove);
    
          // Suppression de l'élément correspondant dans la page d'accueil
          const gallery = document.querySelector('.gallery');
          const portfolioWorkToRemove = document.getElementById(workId);
    
          if (portfolioWorkToRemove) {
            gallery.removeChild(portfolioWorkToRemove);
          }
        } else {
          throw new Error('Erreur lors de la suppression');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
    

    // Ajout du bouton à la figure
    modalFigureElement.insertBefore(deleteBtn, modalFigureElement.firstChild);
    
    const modalContent = document.querySelector('.modalWorks');
    modalContent.appendChild(modalFigureElement);
    
    // Réinitialisez le formulaire.
    form.reset();    
    document.querySelector("#display_image").style.display = 'none';
    document.querySelector("#labelAjout").style.display = 'block';
    document.querySelector("#paraAjout").style.display = 'block';
    document.querySelector("#iconeAjout").style.display = 'block';
  })
  .catch(error => {
    console.error(error); 
  });
});
