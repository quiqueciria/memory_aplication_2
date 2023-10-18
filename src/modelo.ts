export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

const crearCartaInicial = (Carta: InfoCarta): Carta => {
  return {
    idFoto: Carta.idFoto,
    imagen: Carta.imagen,
    estaVuelta: false,
    encontrada: false,
  };
};

const crearTableroInicial = (): Tablero => {
  return {
    cartas: cartas,
    estadoPartida: "PartidaNoIniciada",
  };
};

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const cartasTranformadas = infoCartas.map((carta) => {
    return crearCartaInicial(carta);
  });
  return [...cartasTranformadas, ...cartasTranformadas];
};

export interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 0,
    imagen: "/src/imgs/1.png",
  },

  {
    idFoto: 1,
    imagen: "/src/imgs/2.png",
  },
  {
    idFoto: 2,
    imagen: "/src/imgs/3.png",
  },

  {
    idFoto: 3,
    imagen: "/src/imgs/4.png",
  },
  {
    idFoto: 4,
    imagen: "/src/imgs/5.png",
  },

  {
    idFoto: 5,
    imagen: "/src/imgs/6.png",
  },
];

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

export let tablero: Tablero = crearTableroInicial();
