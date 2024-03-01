const { transporter } = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailbody) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            html: mailbody
        }, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

const fetchPendingEmail = async (timestamp) => {
    //* fetch notification email from DB which status is pending
    //* and time is less than current time
    
    try {
        const response = await repo.get({status: 'PENDING'});
        console.log("response: ",JSON.stringify(response));
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        console.log(data);
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateNotificationTicket = async (id,data) => {
    try {
        const response = await repo.update(id,data);
        return true;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateNotificationTicket
}