const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const {PORT} = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controller/ticket-controller');

const jobs = require('./utils/job');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets', TicketController.create);
    app.get('/api/v1/tickets', TicketController.get);
    app.listen(PORT, ()=>{
        console.log(`server is started at port ${PORT}`);
        jobs();

        // sendBasicEmail(
        //     'gnikhil556@gmail.com',
        //     'gnikhil1098@gmail.com',
        //     'this is testing email server',
        //     'hey! how are you i hope you like the service'
        // )

        
        //* shedule time on edvery 30 seconds

        // cron.schedule('30 * * * * *', () => {
        //     console.log('running every minute 1, 2, 4 and 5');
        // });
    })
}

setupAndStartServer();