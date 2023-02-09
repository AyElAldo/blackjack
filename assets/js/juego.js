/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Swords
*/

// Funcion anonima autoinvocada
(() => {

    'use strict'

    let tipoCartas = ["C", "D", "H", "S"];
    let especiales = ["A", "J", "Q", "K"];
    
    // let puntosJugador = 0;
    // let puntosJugadores[puntosJugadores.length -1] = 0;
    let puntosJugadores = [];
    
    // REFERNCIAS HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const puntajes = document.querySelectorAll('small');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    
    
    let deck = [];

    // Crea el mazo
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);

    }
    
    // Regresa una carta del mazo
    function pedirCarta(){
        if(deck.lenght === 0){
            throw 'No hay cartas en el deck.'
        }
        return deck.pop();
    }
    
    function valorCarta(carta){
        const valor = carta.substring(0, carta.length - 1);
        if(isNaN(valor)) return (valor === 'A') ? 11 : 10;
        else return valor * 1;
    }
    
    // TURNO: Ultimo es la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] += valorCarta(carta);
        puntajes[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno) => {

        // Creando la carta en HTML
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        divCartasJugadores[turno].append(imgCarta);
        imgCarta.classList.add('carta');

    }

    const determinarGanador = (puntosJugadores, puntosMinimos) => {

        setTimeout(() => {
            if(puntosJugadores[puntosJugadores.length -1] === puntosMinimos) alert("Nadie ha ganado.");
            else if( ((puntosJugadores[puntosJugadores.length -1] > puntosMinimos) && (puntosJugadores[puntosJugadores.length -1] <= 21)) || puntosMinimos > 21) alert("Ha ganado la computadora.");
            else alert("FELIDADES, HAS GANADO.");
        }, 100);

    }

    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
            
            acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
            
    
        }while( (puntosJugadores[puntosJugadores.length -1] < puntosMinimos) && (puntosMinimos <= 21) );
    
        determinarGanador(puntosJugadores, puntosMinimos);
    }
    
    // Inicia el juego
    const iniciarJuego = (numJugadores = 1) => {

        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i <= numJugadores; i++) puntosJugadores.push(0);
        console.log(puntosJugadores);

        puntajes.forEach( elem => elem.innerText = 0 );
        //divCartasJugadores.forEach(elem => elem.innerText = 0);

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }
    // console.log(deck);
    
    // carta = pedirCarta();
    // console.log(carta);
    
    // valor = valorCarta(carta);
    // console.log(valor);
    
    // EVENTOS
    
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        
        acumularPuntos(carta, 0);
    
        crearCarta(carta, 0);
    
    
        if(puntosJugadores[0] > 21){
            console.warn("Has perdido.");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }else if(puntosJugadores[0] === 21){
            btnDetener.dispabled = true;
            console.warn("FELICIDADES, HAS GANADO !!!");
        }
    })
    
    
    // Detener
    btnDetener.addEventListener('click', () => {
    
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    
        turnoComputadora( puntosJugadores[0] );
    
    })
    
    // Funcion para quitar graficamente las cartas
    const limpiarCartas = () => {

        divCartasJugadores.forEach(elem => elem.innerText = '');

    }

    // Nuevo Juego
    btnNuevo.addEventListener('click', () => {
    
        btnDetener.disabled = false;
        btnPedir.disabled = false;
        
        limpiarCartas();        
        iniciarJuego();
    
    })



})();    
