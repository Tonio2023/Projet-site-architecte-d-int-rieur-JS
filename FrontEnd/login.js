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

    const responseData = await response.json(); // extraire les données de la réponse
    
    localStorage.setItem('token',responseData.token) // stockage du token dans le localstorage
    
    
    console.log(responseData.token); // faire quelque chose avec les données de la réponse
    
    if (!response.ok) { // vérifier si la réponse de l'API indique une erreur
      alert('Erreur dans l\'identifiant ou le mot de passe'); // affiche le message d'erreur
    } else {
      window.location.replace('index.html')
    }
  } catch (err) {
    console.error(err);
  }
});
