const { transporter } = require('../config/emailConfig');

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailbody) => {
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

module.exports = {
    sendBasicEmail
}