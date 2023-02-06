/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Swords
*/

let tipoCartas = ["C", "D", "H", "S"];
let especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

// REFERNCIAS HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntajes = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


let deck = [];
// Crea el mazo
const crearDeck = () => {
    // Cartas normales
    for(let i = 2; i <= 10; i++){
        for(let j of tipoCartas){
            deck.push(i + j);
        }
    }

    // Cartas especiales
    for(let i of especiales){
        for(let j of tipoCartas){
            deck.push(i + j);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);

    return deck;
}

// Regresa una carta del mazo
function pedirCarta(){
    if(deck.lenght === 0){
        throw 'No hay cartas en el deck.'
    }
    const carta = deck.pop();
    return carta;
}

function valorCarta(carta){
    const valor = carta.substring(0, carta.length - 1);
    if(isNaN(valor)) return (valor === 'A') ? 11 : 10;
    else return valor * 1;
}

const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        
        // Cambia el puntaje
        puntajes[1].innerText = puntosComputadora;

        // Creando la carta en HTML
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        divCartasComputadora.append(imgCarta);
        imgCarta.classList.add('carta');

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos) alert("Nadie ha ganado.");
        else if( ((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21)) || puntosMinimos > 21) alert("Ha ganado la computadora.");
        else alert("FELIDADES, HAS GANADO.");
    }, 100);
}

crearDeck();
// console.log(deck);

// carta = pedirCarta();
// console.log(carta);

// valor = valorCarta(carta);
// console.log(valor);

// EVENTOS

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    
    // Cambia el puntaje
    puntajes[0].innerText = puntosJugador;

    // Creando la carta en HTML
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    divCartasJugador.append(imgCarta);
    imgCarta.classList.add('carta');


    if(puntosJugador > 21){
        console.warn("Has perdido.");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        btnDetener.dispabled = true;
        console.warn("FELICIDADES, HAS GANADO !!!");
    }
})


// Detener
btnDetener.addEventListener('click', () => {

    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora( puntosJugador );

})


// Nuevo Juego
btnNuevo.addEventListener('click', () => {

    btnDetener.disabled = false;
    btnPedir.disabled = false;
    
    deck = [];
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;

    puntajes[0].innerText = 0;
    puntajes[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
})

