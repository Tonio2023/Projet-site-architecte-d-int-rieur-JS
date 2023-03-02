

// Récupérer les boutons filtres
const filterButtons = document.querySelectorAll('.filter-button');

// Récupérer la galerie de travaux
const gallery = document.querySelector('.gallery');

// Récupérer les données des travaux de l'API
fetch('http://localhost:5678/api/works')
<<<<<<< HEAD
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



=======
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
    
    //  sélectionner un bouton et désélectionner les autres
    function selectButton(selectedButton) {
      filterButtons.forEach(button => {
        if (afficherWorks === selectedButton) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
    
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
    // Afficher tous les travaux par défaut
    afficherWorks('All');
    
    // Ajouter un écouteur d'événement sur le bouton "Tous"
    const allButton = document.getElementById('All');
    allButton.addEventListener('click', () => {
      // Afficher tous les travaux
      afficherWorks('All');
    });
<<<<<<< HEAD

    // Ajout écouteur d'événement sur le bouton "Objets"
=======
    
    // Ajouter un écouteur d'événement sur le bouton "Objets"
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
    const objetsButton = document.getElementById('Objets');
    objetsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 1 (Objets)
      afficherWorks(1);
    });
<<<<<<< HEAD

    // Ajout écouteur d'événement sur le bouton "Appartements"
=======
    
    // Ajouter un écouteur d'événement sur le bouton "Appartements"
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
    const appartementsButton = document.getElementById('Appartements');
    appartementsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 2 (Appartements)
      afficherWorks(2);
    });
<<<<<<< HEAD

    // Ajout écouteur d'événement sur le bouton "Hotels & restaurants"
=======
    
    // Ajouter un écouteur d'événement sur le bouton "Hotels & restaurants"
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
    const hotelsButton = document.getElementById('Hotels');
    hotelsButton.addEventListener('click', () => {
      // Afficher les travaux avec la categoryId 3 (Hotels & restaurants)
      afficherWorks(3);
    });
    
  });
  


  // Connexion utilisateur 
  const form = document.querySelector('#connexion'); // sélectionnez le formulaire par son ID
  form.addEventListener('submit', async (e) => { // ajouter un événement de soumission du formulaire
    e.preventDefault(); // empêcher le comportement par défaut de la soumission du formulaire
  
    const email = document.querySelector('#email').value; // récupérer la valeur du champ email
    const password = document.querySelector('#pass').value; // récupérer la valeur du champ mot de passe
  
    const data = {
      email: email,
      password: password
    }; // créer un objet avec les propriétés email et password et leurs valeurs correspondantes
  
    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // définir le type de contenu de la requête comme JSON
        },
        body: JSON.stringify(data) // convertir l'objet en une chaîne JSON et l'inclure dans la requête POST
      });

      if (!response.ok) { // vérifier si la réponse de l'API indique une erreur
        alert('Erreur dans l\'identifiant ou le mot de passe'); // affiche le message d'erreur
      } else {
        window.location.replace('index.html')
      }
      const responseData = await response.json(); // extraire les données de la réponse
<<<<<<< HEAD
      

      localStorage.setItem('token',responseData.token) // stockage du token dans le localstorage

      console.log(responseData.token); // faire quelque chose avec les données de la réponse
      
=======

  
      console.log(responseData); // faire quelque chose avec les données de la réponse
  
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
    } catch (err) {
      console.error(err);
    }
  });

<<<<<<< HEAD
  /****** admin mode ******/

  const token = localStorage.getItem('token');


=======



  
>>>>>>> 140b17b88292f9b9844d1322d5ef8d66ae9025d6
