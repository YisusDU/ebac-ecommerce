

//------------Metodo remover elementos del carrito
//---------Espacio para colocar todas las constantes
const iconeRemove = document.querySelectorAll(".remove");//Icono del bote de basura
//Seleccionamos el icono del bote de basura del carrito
//Función
iconeRemove.forEach(elem => {
  elem.addEventListener("click", () => {
    const elemParent = elem.parentElement;
    elemParent.remove();
  })
});

//----------Metodo mostrar y ocultar carrito
//---------Espacio para colocar todas las constantes
const iconeCart = document.querySelector(".iconeCart");//mostrar carrito
const car = document.querySelector(".cart");//carrito
const iconeCloseCart = document.querySelector(".cart__close");//Crucecita del carrito
const iconeMenu = document.querySelector(".iconeMenu"); //icono de menu
const menu = document.querySelector(".menu");// menu
const iconeCloseMenu = document.querySelector(".menu__close");//cruz del menu
//seleccionamos el icono del carrito
//Seleccionamos el article del carrito
//Función
iconeCart.addEventListener("click", () => {
  //añadimos un if para que no entre en conflicto con la clase close
  if (car.classList.contains("close")) {
    car.classList.add("show");
    car.classList.remove("close")

  } else {
    car.classList.toggle("show");
  }
  //Añadimos funcion para cerrar el menu si esta abierto
  if (car.classList.contains("show")) {
    menu.classList.add("close");
  }
});
//Seleccionamos nuestra crucecita
//Comprobamos que arroja la consola
console.log(iconeCloseCart);
//se muestra el elementi html correctamente
//le añadimos el evento
iconeCloseCart.addEventListener("click", () => {
  car.classList.toggle("close");
});

//--------------Métodos para mostrar y ocultar el menu izquierdo emparejada con el
//Seleccionamos el article del menu
//Añadimos el evento para mostrar el menu lateral
iconeMenu.addEventListener("click", () => {
  //añadimos un if para que no entre en conflicto con la clase close
  if (menu.classList.contains("close")) {
    menu.classList.add("show");
    menu.classList.remove("close")
  } else {
    menu.classList.toggle("show");
  }
  if (menu.classList.contains("show")) {
    car.classList.add("close");
  }
});
//Seleccionamos la crucecita

console.log(iconeCloseMenu)
//Todo bien hasta ahora
iconeCloseMenu.addEventListener("click", () => {
  menu.classList.toggle("close");
});

//-------Añadir productos al carrito
// Seleccionamos el contenedor del carrito
const carContainer = document.querySelector(".cart__items");

// Creamos un arreglo para almacenar los productos del carrito
let carArray = [];

// Función para agregar productos al carrito
const addProductCart = (product) => {
  // Verificamos si el producto ya existe en el carrito
  const existingProduct = carArray.find((item) => item.name === product.name);

  // Si el producto existe, incrementamos su cantidad
  if (existingProduct) {
    alert("El producto ya existe en el carrito");
  } else {
    // Si no existe, lo agregamos al array
    carArray.push({ ...product, quantity: 1 });
  }

  // Llamamos una función que actualiza el carrito
  updateCartContainer();
};

// Función que actualiza el contenedor del carrito
const updateCartContainer = () => {
  // Limpiamos el contenido del contenedor del carrito
  carContainer.innerHTML = "";
  updateCartCounter();


  // Agregamos los productos del carrito
  carArray.forEach((product, index) => {
    const cartItem = document.createElement("section");
    cartItem.classList.add("cart__item");

    const cartImg = document.createElement("img");
    cartImg.classList.add("cart__img");
    cartImg.src = product.image;
    cartItem.appendChild(cartImg);

    const cartProduct = document.createElement("p");
    cartProduct.classList.add("cart__product");
    cartProduct.textContent = product.name;
    cartItem.appendChild(cartProduct);

    const cartPrice = document.createElement("p");
    cartPrice.classList.add("cart__price");
    cartPrice.textContent = `$${product.price}`;
    cartItem.appendChild(cartPrice);

    const iconeRemove = document.createElement("i");
    iconeRemove.classList.add("cart__delete");
    iconeRemove.classList.add("remove");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "img/trash.JPG";
    deleteIcon.classList.add("delete-icone");
    iconeRemove.appendChild(deleteIcon);

    cartItem.appendChild(iconeRemove);
    carContainer.appendChild(cartItem);

    // Agregamos un evento de clic al botón de eliminar
    iconeRemove.addEventListener("click", () => {
      setTimeout(() => {
        // Elimina el producto del arreglo
        updateCartCounter();
        carArray.splice(index, 1);
        // Actualiza el carrito
        updateCartContainer();
      }, 300);
    });
  });



};

// Seleccionamos los botones de agregar al carrito
const addCartButtons = document.querySelectorAll(".products__btn");


// Agregamos un evento de clic a los botones de "Añadir al carrito"
addCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const product = {
      name: e.target.parentNode.querySelector(".products__title").textContent,
      image: e.target.parentNode.querySelector(".products__img").src,
      price: e.target.parentNode.querySelector(".products__price").textContent.replace("$", ""),
    };
    updateCartCounter();
    addProductCart(product);
  });
});


//------Contador de objetos en el carrito
//Seleccionamos el botón agregar al carrito
//const addCartButtons = document.querySelectorAll(".products__btn");
//agregamos una funcion
// Iteramos sobre la lista de botones y agregamos un listener de eventos a cada uno
// addCartButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     //El metodo reduce, funciona con un acumulador: acc y un objeto actual: current, al final se establece el 0, que es donde empieza
//     //el contador
//   /*   const totalQuantity = carArray.reduce((acc, current) => acc + current.quantity, 0);
//     document.querySelector(".header__icon--carCounter").innerText = totalQuantity; */


//   });
// });


//Funcion para actualizar el contador de productos en el carrito

const updateCartCounter = () => {
  document.querySelector(".header__icon--carCounter").innerText = carArray.length;
}