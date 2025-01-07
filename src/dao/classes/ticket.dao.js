import TicketModel from "../models/ticket.model.js";

class TicketDao {
    async findAll() {
        try {
            return await TicketModel.find().lean();
        } catch (error) {
            console.error("Error al obtener todos los tickets:", error);
            throw new Error("Error al obtener todos los tickets");
        }
    }

    async findById(id) {
        try {
            return await TicketModel.findById(id).lean();
        } catch (error) {
            console.error("Error al obtener el ticket por ID:", error);
            throw new Error("Error al obtener el ticket por ID");
        }
    }

    async create(ticketData) {
        try {
            const ticket = new TicketModel(ticketData);
            return await ticket.save();
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw new Error("Error al crear el ticket");
        }
    }

    async updateById(id, ticketData) {
        try {
            return await TicketModel.updateOne({ _id: id }, ticketData);
        } catch (error) {
            console.error("Error al actualizar el ticket por ID:", error);
            throw new Error("Error al actualizar el ticket por ID");
        }
    }

    async deleteById(id) {
        try {
            return await TicketModel.deleteOne({ _id: id });
        } catch (error) {
            console.error("Error al eliminar el ticket por ID:", error);
            throw new Error("Error al eliminar el ticket por ID");
        }
    }
}

export default new TicketDao(); 
