$(document).ready(function () {
  $.getJSON('data/products.json', function (products) {
    products.forEach(product => {
      $('#product-grid').append(`
        <div class="col-md-4 mb-4">
          <div class="card product-card h-100">
            <img src="img/${product.id}.svg" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Preis: € ${product.price.toFixed(2)}</p>
              <button class="btn mt-auto btn-primary" 
                data-id="${product.id}" 
                data-name="${product.name}" 
                data-price="${product.price}">
                In den Warenkorb
              </button>
            </div>
          </div>
        </div>
      `);
    });
  });
});
