const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;


        // Crear la instancia de nuestro ticketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('cliente conectado')

            socket.on('solicitar-ticket', ( _, callback ) => {
                // console.log('nuevo ticket backend')
                const nuevoTicket = this.ticketList.crearTicket();
                callback( nuevoTicket );
             })
            
             socket.on('siguiente-ticket-trabajar', ({agente, escritorio}, callback ) => { 
                const suTicket = this.ticketList.asignarTicker( agente, escritorio ) 
                callback( suTicket )
                this.io.emit('ticket-asignado', this.ticketList.ultimos13 )
             })
             
        });
    }


}


module.exports = Sockets;