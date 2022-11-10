// variables
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const divCarrito = document.querySelector("#lista-carrito tbody");
const listaArticulos = document.querySelector("#lista-articulos");

let articulosCarrito = [];

registrarEventListenners();

// ------------funciones --------------//
// capturamos los eventos
function registrarEventListenners() {
    // este evento llama la funcion agregar articulo
    listaArticulos.addEventListener("click", agregarArticulo);

    // este evento llama la funcion eliminar articulo
    carrito.addEventListener("click", eliminarArticulo);

    // escuchar boton vaciar carrito
    vaciarCarrito.addEventListener('click',()=>{
        articulosCarrito = []; // vuelve dejar arreglo vacio
        limpiarHtml()
    })
}
// agregar eventos al carrito
function agregarArticulo(e) {
  e.preventDefault(); // previene que recargue la pagina
  if (e.target.classList.contains("agregar-carrito")) {
    const articuloSeleccionado = e.target.parentElement.parentElement;
    leerDatosArticulos(articuloSeleccionado);
  }
}

// funcion para eliminar articulo
function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-articulo')){
        const articuloId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(articulo =>articulo.id !== articuloId);
        carritoHtml()
    }
}

// leer el html donde demos click y se extrae
function leerDatosArticulos(articulo) {
  const infoArticulo = {
    imagen: articulo.querySelector(".card img").src,
    titulo: articulo.querySelector("h4").textContent,
    precio: articulo.querySelector(".precio span").textContent,
    id: articulo.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //Revizar si el articulo esta en el carrito  si esta sumarlo y si no agregarlo
  const existeArticulo = articulosCarrito.some(articulo=> articulo.id === infoArticulo.id);
  if(existeArticulo){
    const articulos = articulosCarrito.map(articulo=>{
        if(articulo.id === infoArticulo.id){
            articulo.cantidad++;
            return articulo; // retornamos el array mapeado 
        }else{
            return articulo;
        }
    })
    articulosCarrito = [... articulos]
  }else{
    // si no agregamos pto al carrito
    articulosCarrito = [...articulosCarrito, infoArticulo];
  }
  carritoHtml();
}

// inyectar los articulos del array en el html del carrito(ybody)
function carritoHtml() {
  //llamar funcion que limpie html
  limpiarHtml();
  articulosCarrito.forEach((articulo) => {
    const {imagen,titulo,precio,cantidad,id} = articulo; // DESTRUCTURING
    const row = document.createElement("tr");
    row.innerHTML = `
        <td> <img src=${imagen} width="100"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-articulo" data-id=${id}>X</a> </td>
    `;
    divCarrito.appendChild(row);
  });
}

// funcion para limpiar html del carrito al hacer click
function limpiarHtml() {
  // Esta forma es lenta y sirve para app pequeñas
  //divCarrito.innerHTML = '';

  //forma mucho mejor para limpiar el html
  while (divCarrito.firstChild) {
    divCarrito.removeChild(divCarrito.firstChild);
  }
}
