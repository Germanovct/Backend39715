const socket = io();

socket.on("products", (products) => {
  if(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList = 'card m-2';
      productElement.style = 'width: 18rem';
      productElement.innerHTML = `
      <div class="card-body p-3">
        <h2 class="card-title">${product.title}</h2>
        <p class="card-text">${product.description}</p>
        <p>Precio: <span class="text-success">$${product.price}</span></p>
        <p>Stock: ${product.stock}</p>
        <button class="btn btn-danger" id="deleteButton-${product.id}">
        </button>
      </div>
      `;

      const deleteButton = productElement.querySelector(`#deleteButton-${product.id}`);
      deleteButton.addEventListener('click', () => {
        socket.emit('deleteProduct', { id: product.id });
      });

      product.thumbnails.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = product.title;
        imgElement.classList = 'card-img-top p-3';
        imgElement.style = 'width:150px';
        productElement.appendChild(imgElement);
      });
      productsContainer.appendChild(productElement);
    });
  }
});


const form = document.getElementById("productForm");
const submitButton = document.getElementById("submitForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("/api/products", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Success") {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-success" role="alert">
            ${data.response}
          </div>
        `;
        form.reset();
      } else {
        document.getElementById("result").innerHTML = `
          <div class="alert alert-danger" role="alert">
            Error al crear el producto
          </div>
        `;
      }
    })
    .catch((error) => {
      document.getElementById("result").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error al crear el producto. Error: ${error}
        </div>
      `;
    });
});

socket.on("productCreated", (result) => {
  const resultDiv = document.getElementById("result");
  if (result.success) {
      resultDiv.innerHTML = "Producto creado exitosamente";
  } else {
      resultDiv.innerHTML = "Error al crear el producto: " + result.error;
  }
});