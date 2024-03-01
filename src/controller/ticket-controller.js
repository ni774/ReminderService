const TicketService = require('../services/email-service');

const create = async (req,res) => {
    try {
        const response =await TicketService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new notification ticket',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating ticket",
            data: {},
            err: error
        });
    }
}

const get = async (req, res) => {
    console.log("get");
    try {
        const  response = await TicketService.fetchPendingEmail();
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all tickets',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tickets",
            data: {},
            err: error
        })
    }
}

module.exports = {
    create,
    get
}