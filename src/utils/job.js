const cron = require('node-cron');
const emailService = require('../services/email-service');
const { transporter } = require('../config/emailConfig');

/**
 * 10:00 am
 * every 5 minutes
 * we will check in db are there any pending email which was expected to be sent 
 * by now and is pending 
 */

const setupJobs =  () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmail();
        response.forEach(element => {
            transporter.sendMail({
                to: element.recepientEmail,
                subject: element.subject,
                html: element.content
            }, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    await emailService.updateNotificationTicket(element.id, {status: 'SUCCESS'});
                }
            });
        });
        console.log('running every minute 1, 2, 4 and 5 rom utils', response);
    });
}

module.exports = setupJobs ;