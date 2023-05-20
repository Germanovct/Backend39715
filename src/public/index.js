/*const socket = io();


let productsElem = document.getElementById("products");

socket.on("product_added", (product) => {
  let item = document.createElement("div");
  item.classList.add("gallery");
  item.innerHTML = `<h2>${product.title}</h2> <p>$${product.price}</p> <p>${product.description}</p>`;
  productsElem.appendChild(item);
});

socket.on("product_deleted", (productIndex) => {
  productsElem.removeChild(productsElem.children[productIndex]);
});
*/

const form = document.getElementById("cookieForm");

form.addEventListener("submit", async (evt)=>{
  evt.preventDefault();

  const obj ={};
  const data = new FormData (form);

  data.forEach((value, key)=>{
    obj [key] =value;
  });

  let response = await fetch ("/createCookie", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();
  console.log(result);


});

const getCookies = () =>{
  console.log(document.cookie);
};

