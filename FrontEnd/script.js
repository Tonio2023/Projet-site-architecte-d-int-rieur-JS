
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
      const workId = work.id
      console.log(workId);
      // Créer un élément figure avec l'image et le titre
      const figure = document.createElement('figure');
      figure.setAttribute("id", workId);
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
  

    // Sélectionner le bouton "Tous" par défaut
  document.getElementById("All").classList.add("active");

  // Fonction pour enlever la classe "active" des autres boutons
  function removeActiveClass() {
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(function(button) {
      if (button.id !== "All" || button.classList.contains("active")) {
        button.classList.remove("active");
      }
    });
  }

  // Ajouter un gestionnaire d'événements pour chaque bouton
  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      removeActiveClass();
      this.classList.add("active");
    });
  });



    // Afficher tous les travaux par défaut
    afficherWorks('All');

    // Ajouter un écouteur d'événement sur le bouton "Tous"
    const allButton = document.getElementById('All');
    allButton.addEventListener('click', () => {
      // Afficher tous les travaux
      afficherWorks('All');
    });

    // Ajout écouteur d'événement sur le bouton "Objets"
    const objetsButton = document.getElementById('Objets');
    objetsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 1 (Objets)
      afficherWorks(1);
    });

    // Ajout écouteur d'événement sur le bouton "Appartements"
    const appartementsButton = document.getElementById('Appartements');
    appartementsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 2 (Appartements)
      afficherWorks(2);
    });

    // Ajout écouteur d'événement sur le bouton "Hotels & restaurants"
    const hotelsButton = document.getElementById('Hotels');
    hotelsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 3 (Hotels & restaurants)
      afficherWorks(3);
    });

  });


  /////////////////////////////// MODE  ADMINISTRATEUR ///////////////////////////////////


  
  // Fonction pour récupérer le token d'authentification depuis le localStorage
  function getAuthToken() {
    return localStorage.getItem('token');
  }
  
  //  si l'utilisateur est connecté en tant qu'administrateur, création des éléments et div filtres 
  
  if (getAuthToken()) {
    // Changer le bouton de connexion en bouton de déconnexion
    // L'utilisateur est connecté en tant qu'administrateur, donc afficher les fonctions d'édition
    const header = document.querySelector('header');
    const editionDiv = document.createElement('div');
    editionDiv.classList.add('editionLine1');
    editionDiv.innerHTML = `
    <i class="fa-regular fa-pen-to-square"></i>
    <p class="pEdit">Mode édition</p>
    <input type="submit" id="buttonAdmin" value="publier les changements">
    `;
    header.insertBefore(editionDiv, header.firstChild);
    // Créer une div "introEdit" avec une icône et un paragraphe "modifier"
    const figure = document.querySelector('figure');
    const introEdit = document.createElement('div');
    introEdit.className = 'introEdit';
    introEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
    figure.insertBefore(introEdit, figure.children[1]);

    // Ajouter un lien "modifier" et une icône pour chaque projet de la page
    const projetEditDiv = document.querySelector('.projetsEdit');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');
    editIcon.setAttribute("onclick", "openModal()");
    const editLink = document.createElement('a');
    editLink.href = '#';
    editLink.setAttribute("onclick", "openModal()");
    editLink.textContent = 'modifier';

    const h2Element = document.getElementById('h2Projets')

    // Insérez editIcon juste après l'élément h2
    h2Element.insertAdjacentElement("afterend", editIcon);

    // Insérez editLink juste après editIcon
    editIcon.insertAdjacentElement("afterend", editLink);

    // Cacher les filtres
    document.getElementById("filters").classList.add("none");

  }
   // variable pour la clé du token d'authentification
   const tokenKey = 'auth-token';
  
  function toggleLoginState() {
    const authToken = getAuthToken();
    
    if (authToken) {
      // L'utilisateur est connecté en tant qu'administrateur, donc afficher les fonctions d'édition
      // Changer le bouton de connexion en bouton de déconnexion
    const header = document.querySelector('header');
    const line2 = header.querySelector('.line2');
    const nav = document.querySelector('nav')
    const ulElement = document.getElementById('ulLog')
    const logoutDiv = document.createElement('div');
    logoutDiv.className = 'logout';
    const logoutLink = document.createElement('a');
    logoutLink.textContent = 'logout';
    logoutLink.href = '#';
    logoutLink.addEventListener('click', function() {
      localStorage.clear();
      window.location.reload();
    });
    logoutLink.classList.add("navA");
    logoutDiv.appendChild(logoutLink);
    ulElement.insertBefore(logoutDiv, ulElement.children[2]);
    nav.appendChild(ul)
    line2.appendChild(nav)
    header.appendChild(line2)

    
  } else {
    // L'utilisateur n'est pas connecté en tant qu'administrateur, donc afficher LOGIN
    const header = document.querySelector('header');
    const line2 = header.querySelector('.line2');
    const nav = document.querySelector('nav')
    const ulElement = document.getElementById('ulLog')
    const logoutDiv = document.createElement('div');
    logoutDiv.className = 'logout';
    const logoutLink = document.createElement('a');
    logoutLink.textContent = 'login';
    logoutLink.href = 'Login.html';
    logoutLink.addEventListener('click', function() {
    localStorage.removeItem(tokenKey);
    window.location.reload();
    });
    logoutLink.classList.add("navA");
    logoutDiv.appendChild(logoutLink);
    ulElement.insertBefore(logoutDiv, ulElement.children[2]);
    nav.appendChild(ul)
    line2.appendChild(nav)
    header.appendChild(line2)

  }
}

toggleLoginState();




