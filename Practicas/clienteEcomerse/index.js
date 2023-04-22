window.onload = function() {
    fetch('http://localhost:8081/api/products')
      .then(response => response.json())
      .then(data => procesarDatos(data.payload))
      .catch(error => console.error(error));
  };

const productos = document.getElementById("productos");

function procesarDatos(data) {
    console.log(data);
    let html = data.playload.map( (data) => {
        let respon =  
        `<div class="product-info container">
          <h2>${data.title}</h2>
          <p>description: ${data.description}</p>
          <p>price: ${data.price}</p>
          <img src="${data.thumbnail[0]}" alt="img"  width="200" height="150">
          <div class="container">
          <button class="btn btn-dark"><a class="text-decoration-none text-light" href='/'>Product details</a></button>
          <button class="btn btn-dark">Add to card</button>
          </div>
        </div>`;
        return respon;
    
      })
      productos.innerHTML = html.join('');    
}