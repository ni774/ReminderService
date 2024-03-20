const { transporter } = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

//*********** function for sending email to the user by nodemailer **********************/
const sendBasicEmail = async (info) => {
    //info is object expecting :- mailFrom, mailTo, mailSubject, mailbody
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

const subscribeEvent = async (payload)=> {
    let service = payload.service;
    let data = payload.data;
    switch(service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log("No valid event recieved");
            break;
    }
}


module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateNotificationTicket,
    subscribeEvent
}