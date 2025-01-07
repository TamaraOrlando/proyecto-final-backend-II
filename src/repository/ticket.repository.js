import ticketDao from "../dao/classes/ticket.dao.js";


class TicketRepository {
    async getAllTickets() {
        try {
            return await ticketDao.findAll();
        } catch (error) {
            console.error("Error al obtener todos los tickets:", error);
            throw new Error("Error al obtener todos los tickets");
        }
    }

    async getTicketById(id) {
        try {
            return await ticketDao.findById(id);
        } catch (error) {
            console.error("Error al obtener el ticket por ID:", error);
            throw new Error("Error al obtener el ticket por ID");
        }
    }

    async createTicket(ticketData) {
        try {
            return await ticketDao.create(ticketData);
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw new Error("Error al crear el ticket");
        }
    }

    async updateTicketById(id, ticketData) {
        try {
            return await ticketDao.updateById(id, ticketData);
        } catch (error) {
            console.error("Error al actualizar el ticket por ID:", error);
            throw new Error("Error al actualizar el ticket por ID");
        }
    }

    async deleteTicketById(id) {
        try {
            return await ticketDao.deleteById(id);
        } catch (error) {
            console.error("Error al eliminar el ticket por ID:", error);
            throw new Error("Error al eliminar el ticket por ID");
        }
    }
}


export default new TicketRepository(); 
