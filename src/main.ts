import { Carta, cartas, tablero } from "./modelo";

document.addEventListener("DOMContentLoaded", () => {
  pintarTablero(cartas);
});

// Función para crear contenedores
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

//Elimino esta función porque es igual a pintarTablero,
// lo único que hace es llamarla
// Elegir el div del html y resetear tablero
// const pintarListaAnimales = (listaAnimales: Carta[]): void => {
//   pintarTablero(listaAnimales);
// };

const iniciarPartida = () => {
  const cartasBarajadas: Carta[] = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = "CeroCartasLevantadas";
  console.log(tablero); //Este console.log nos está diciendo que se está ejecutando
};

// Pintar tablero
const pintarTablero = (listaAnimales: Carta[]): void => {
  const appDiv = document.getElementById("principal");

  // Crear el container dentro del div
  if (appDiv && appDiv instanceof HTMLDivElement) {
    appDiv.innerHTML = "";
    const crearDivAnimales = crearContenedor("Animales");
    appDiv.appendChild(crearDivAnimales);

    // Recorrer el array y crear el div por cada animal
    listaAnimales.forEach((animal, index) => {
      const divAnimal = crearContenedor("animal");
      divAnimal.className = "grid-item";
      divAnimal.id = `${index}`;
      // Averiguar el ID de cada carta
      const idElemento = divAnimal.id;

      // Dar la vuelta a la primera carta y cambiar el estado
      const darLaVueltaALaPrimeraCarta = (tablero: any, idElemento: string) => {
        tablero.estadoPartida = "UnaCartaLevantada";
        tablero.indiceCartaVolteadaA = idElemento;
      };
      // dar la vuelta a la segunda carta y cambiar el estado
      const darLaVueltaALaSegundaCarta = (tablero: any, idElemento: string) => {
        tablero.estadoPartida = "DosCartasLevantadas";
        tablero.indiceCartaVolteadaB = idElemento;
      };
      // consultar el estado de la partida si es la primera carta
      const esLaPrimeraCarta = (tablero: any): boolean =>
        tablero.estadoPartida === "CeroCartasLevantadas";
      // consultar el estado de la partida si es la segunda carta
      const esLaSegundaCarta = (tablero: any): boolean =>
        tablero.estadoPartida === "UnaCartaLevantada";
      // Establecer estado de la primera carta (no de la partida!!)
      const estaDeVuelta = (cartas: any): boolean => (cartas.estaVuelta = true);
      // Establecer estado de la segunda carta (no de la partida!!)
      const estaEncontrada = (cartas: any): boolean =>
        (cartas.encontrada = true);
      const indiceCartaA = tablero.indiceCartaVolteadaA;
      const indiceCartaB = tablero.indiceCartaVolteadaB;

      // Asignar el evento de click
      divAnimal.addEventListener("click", () => {
        if (tablero.estadoPartida !== "PartidaNoIniciada") {
          divAnimal.innerHTML = `<img src="${animal.imagen}" />`;
          // ver si está sacando el ID elemento
          console.log(idElemento);
          // pregunto si es la primera o la segunda.
          if (esLaPrimeraCarta(tablero)) {
            darLaVueltaALaPrimeraCarta(tablero, idElemento);
            estaDeVuelta(cartas);
            console.log(estaDeVuelta(cartas));
          } else if (esLaSegundaCarta(tablero)) {
            darLaVueltaALaSegundaCarta(tablero, idElemento);
            if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
              if (
                tablero.cartas[indiceCartaA].idFoto ===
                tablero.cartas[indiceCartaB].idFoto
              ) {
                console.log(cartas);
                console.log("He entrado");
                estaEncontrada(cartas);
                console.log(estaEncontrada(cartas));
              }
            }
          }
        }
      });

      // Asignárselo al contenedor
      crearDivAnimales.appendChild(divAnimal);
    });
  } else {
    console.error("No se encontro el elemento");
  }
};

// Botón iniciar partida
const botonIniciar = document.getElementById("iniciarPartidaButton");

if (botonIniciar) {
  botonIniciar.addEventListener("click", () => {
    iniciarPartida();
    pintarTablero(tablero.cartas);
  });
}
