import { Carta, cartas } from "./modelo";

document.addEventListener("DOMContentLoaded", () => {
  pintarListaAnimales(cartas);
});

const crearContenedor = (nombreClase: string): HTMLDivElement => {
  const listaAnimales = document.createElement("div");
  listaAnimales.className = "grid-container";
  listaAnimales.id = nombreClase;
  return listaAnimales;
};
// Barajar el array cartas:InfoCarta
const barajarCartas = (cartas: Carta[]) => {
  let arrayCopy = [...cartas];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
};

// Elegir el div del html
const pintarListaAnimales = (listaAnimales: Carta[]): void => {
  const appDiv = document.getElementById("principal");
  // Crear el container dentro del div
  if (appDiv && appDiv instanceof HTMLDivElement) {
    const crearDivAnimales = crearContenedor("Animales");
    appDiv.appendChild(crearDivAnimales);

    // // Le asignamos el array listaAnimales a una costante para pasarle el método forEach
    // const cartasBarajadas = barajarCartas(listaAnimales);

    // Recorrer el array y crear el div por cada animal
    listaAnimales.forEach((animal) => {
      const divAnimal = crearContenedor("animal");
      divAnimal.className = "grid-item";
      divAnimal.id = `${animal.idFoto}`;

      // Asignar el evento de click
      divAnimal.addEventListener("click", () => {
        divAnimal.innerHTML = `<img src="${animal.imagen}" />`;
      });

      // Asignárselo al contenedor
      crearDivAnimales.appendChild(divAnimal);
    });
  } else {
    console.error("No se encontro el elemento");
  }
};

const iniciarPartida = () => {
  const cartasBarajadas: Carta[] = barajarCartas(cartas);
  console.log(cartasBarajadas);
};

// Reset tablero

// Botón iniciar partida
const botonInciar = document.getElementById("iniciarPartidaButton");

if (botonInciar) {
  botonInciar.addEventListener("click", () => {
    // console.log("funciona!"), pintarListaAnimales();
    iniciarPartida();
  });
}
