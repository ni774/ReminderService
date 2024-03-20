const { NotificationTicket } = require('../models/index');
const { Op } = require('sequelize');

class TicketRepository {
    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async create(data) {
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status, // status is pending or success or failed
                    notificationTime: {
                        //get all pending notifications which time is less than current time
                        [Op.lte]: new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            console.log("error in repository");
            throw error;
        }
    }

     async update(id, data) {
        try {
            const ticket = await NotificationTicket.findByPk(id);
            if(data.status){
                ticket.status = data.status;
            }
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = TicketRepository;