const Ticket = require('./ticket');

class TicketList {

    constructor() {
        this.ultimoNumero = 0;

        this.pendientes = [];
        this.asignados = [];

    }
    // Método para obtener el siguiente número de ticket 
    get siguienteNumero() {
        this.ultimoNumero ++;
        return this.ultimoNumero;
    }

    // 3 tickets que se veran en las tarjetas y 10 en el historial 
    get ultimos13(){
        return this.asignados.slice(0,13);
    }

    // Método para crear ticket
    crearTicket() {
        const nuevoTicket = new Ticket( this.siguienteNumero );
        this.pendientes.push( nuevoTicket );
        return nuevoTicket;
    }

    //  Método para asignar ticket
    asignarTicker( agente, escritorio ) {
        if( this.pendientes.length === 0){
            return null
        }
        const siguienteTicket = this.pendientes.shift();

        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift( siguienteTicket );
        return siguienteTicket;
    }
}

module.exports = TicketList;