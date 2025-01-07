import TicketRepository from "../repository/ticket.repository.js";


class TicketService {
    async getTickets() {
        try {
            const tickets = await TicketRepository.getAllTickets();
            if (!tickets) throw new Error("No se encontraron tickets.");
            return tickets;
        } catch (error) {
            console.error("Error al obtener los tickets:", error);
            throw new Error("Error al obtener los tickets");
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await TicketRepository.getTicketById(id);
            if (!ticket) throw new Error(`El ticket con ID ${id} no existe.`);
            return ticket;
        } catch (error) {
            console.error("Error al obtener el ticket por ID:", error);
            throw new Error(`Error al obtener el ticket con ID ${id}`);
        }
    }

    async createTicket(ticketData) {
        try {
            return await TicketRepository.createTicket(ticketData);
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw new Error("Error al crear el ticket");
        }
    }

    async updateTicket(id, ticketData) {
        try {
            const ticket = await this.getTicketById(id);
            if (!ticket) throw new Error(`El ticket con ID ${id} no existe.`);
            return await TicketRepository.updateTicketById(id, ticketData);
        } catch (error) {
            console.error("Error al actualizar el ticket:", error);
            throw new Error("Error al actualizar el ticket");
        }
    }

    async deleteTicket(id) {
        try {
            const ticket = await this.getTicketById(id);
            if (!ticket) throw new Error(`El ticket con ID ${id} no existe.`);
            return await TicketRepository.deleteTicketById(id);
        } catch (error) {
            console.error("Error al eliminar el ticket:", error);
            throw new Error("Error al eliminar el ticket");
        }
    }
}



export default new TicketService(); 
