export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  estaVuelta: boolean;
  encontrada: boolean;
}

const crearCartaInicial = (Carta: InfoCarta): Carta => {
  return {
    idFoto: Carta.idFoto,
    imagen: Carta.imagen,
    estaVuelta: false,
    encontrada: false,
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
