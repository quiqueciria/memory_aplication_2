import { infoCartas } from "./datos";
import { InfoCarta } from "./modelo";

// const imgElement = document.getElementById("leon") as HTMLImageElement;

// imgElement.addEventListener("click", () => {
//   imgElement.src = "/src/imgs/2.png";
// });

// const imgElementGato = document.getElementById("gato") as HTMLImageElement;

// imgElementGato.addEventListener("click", () => {
//   imgElementGato.src = "/src/imgs/3.png";
// });

document.addEventListener("DOMContentLoaded", () => {
  pintarListaAnimales(infoCartas);
});

const crearContenedor = (nombreClase: string): HTMLDivElement => {
  const listaAnimales = document.createElement("div");
  listaAnimales.className = "grid-container";
  listaAnimales.id = nombreClase;
  return listaAnimales;
};

const pintarListaAnimales = (listaAnimales: InfoCarta[]): void => {
  const appDiv = document.getElementById("principal");
  if (appDiv && appDiv instanceof HTMLDivElement) {
    const crearDivAnimales = crearContenedor("Animales");
    appDiv.appendChild(crearDivAnimales);
    listaAnimales.forEach((animal) => {
      const divAnimal = crearContenedor("animal");
      divAnimal.innerHTML = `<img src="${animal.imagen}" />`;
      divAnimal.className = "grid-item";
      divAnimal.id = `${animal.idFoto}`;
      crearDivAnimales.appendChild(divAnimal);
    });
  } else {
    console.error("No se encontro el elemento");
  }
};
