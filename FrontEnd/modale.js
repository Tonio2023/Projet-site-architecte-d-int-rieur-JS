let isLoaded = false; // Variable de contrôle pour vérifier si les photos sont déjà chargées

function openModal () {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.modal').style.display = 'block';
    
    

    if (!isLoaded) { // Vérifiez si les photos sont déjà chargées
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
                    }
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    });
                });
                    

       
                figure.appendChild(deleteBtn);

                const figcaption = document.createElement('figcaption');
                figcaption.textContent = captionText;

                // Insérer l'image et le figcaption dans la figure
                figure.appendChild(img);
                figure.appendChild(figcaption);

                // Insérer la figure dans la <div>
                modalWorks.appendChild(figure);
            });
            isLoaded = true; // Mettez à jour la variable de contrôle après le chargement initial
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
let imageUrl = '';

const imageInput = document.querySelector('#image_input');
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imageUrl = reader.result;
    // Créez un objet URL à partir de l'image base64
    const url = URL.createObjectURL(file);
    // Utilisez l'URL de l'objet pour afficher l'image
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('imgAjout');
    document.querySelector('#display_image').appendChild(img);
  });

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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('title', titleInput.value);
  formData.append('category', categoryInput.value);

  const token = localStorage.getItem('token')
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
        'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la requête');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
});
