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
      // const idElemento = divAnimal.id;

      // Dar la vuelta a la primera carta y cambiar el estado
      const darLaVueltaALaPrimeraCarta = (tablero: any, idElemento: number) => {
        tablero.estadoPartida = "UnaCartaLevantada";
        tablero.indiceCartaVolteadaA = idElemento;
      };
      // dar la vuelta a la segunda carta y cambiar el estado
      const darLaVueltaALaSegundaCarta = (tablero: any, idElemento: number) => {
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
      const estaDeVuelta = (cartas: Carta) => {
        cartas.estaVuelta = true;
      };
      // Establecer estado de la segunda carta (no de la partida!!) (lo he quitado despues de lo de la 102)
      // const estaEncontrada = (cartas: Carta) => {
      //   cartas.encontrada = true;
      // };
      // Asignar el evento de click
      divAnimal.addEventListener("click", () => {
        if (tablero.estadoPartida !== "PartidaNoIniciada") {
          divAnimal.innerHTML = `<img src="${animal.imagen}" />`;

          // pregunto si es la primera o la segunda.
          if (esLaPrimeraCarta(tablero)) {
            darLaVueltaALaPrimeraCarta(tablero, index);
            estaDeVuelta(tablero.cartas[index]);
          } else if (esLaSegundaCarta(tablero)) {
            darLaVueltaALaSegundaCarta(tablero, index);
          }
          const indiceCartaA = tablero.indiceCartaVolteadaA;
          const indiceCartaB = tablero.indiceCartaVolteadaB;

          if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
            if (
              tablero.cartas[indiceCartaA].idFoto ===
              tablero.cartas[indiceCartaB].idFoto
            ) {
              console.log("Son pareja");
              tablero.cartas[indiceCartaA].encontrada = true;
              tablero.cartas[indiceCartaA].estaVuelta = true;
              tablero.cartas[indiceCartaB].encontrada = true;
              tablero.cartas[indiceCartaB].estaVuelta = true;
              tablero.indiceCartaVolteadaA = undefined;
              tablero.indiceCartaVolteadaB = undefined;
              tablero.estadoPartida = "CeroCartasLevantadas";
              // Se quedan fijas las cartas
            } else {
              tablero.cartas[indiceCartaA].encontrada = false;
              tablero.cartas[indiceCartaA].estaVuelta = false;
              tablero.cartas[indiceCartaB].encontrada = false;
              tablero.cartas[indiceCartaB].estaVuelta = false;
              tablero.indiceCartaVolteadaA = undefined;
              tablero.indiceCartaVolteadaB = undefined;
              tablero.estadoPartida = "CeroCartasLevantadas";
              tablero.cartas.forEach((carta, indice) => {
                // dejo vacíos los divs
                if (tablero.cartas[indice].encontrada == false) {
                  console.log("le doy la vuelta");
                  const divCarta = document.getElementById(`${indice}`);
                  if (
                    divCarta !== undefined &&
                    divCarta !== null &&
                    divCarta instanceof HTMLDivElement
                  ) {
                    divCarta.innerHTML = "";
                    console.log(cartas);
                  }
                }
              });
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

// Reiniciar el tablero completo
const resetearTablero = () => {
  tablero.cartas = [
    ...tablero.cartas.map((carta) => ({
      ...carta,
      encontrada: false,
      estaVuelta: false,
    })),
  ];
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

// Botón iniciar partida
const botonIniciar = document.getElementById("iniciarPartidaButton");

if (botonIniciar) {
  botonIniciar.addEventListener("click", () => {
    iniciarPartida();
    resetearTablero();
    console.log(tablero);
    pintarTablero(tablero.cartas);
  });
}
