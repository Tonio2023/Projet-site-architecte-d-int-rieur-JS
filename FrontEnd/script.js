fetch('http://localhost:5678/api/works')
  .then(response => {
    return response.json();
  })
  .then(data => {console.log(data);

    const elementfigure = document.createElement('p')
    elementfigure.textContent = "hello"

    document.querySelector('.gallery').appendChild(elementfigure)


  });


  fetchldmdmdmdmd
