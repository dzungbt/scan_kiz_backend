// import cron from 'node-cron';
// import accountController from '../../controllers/accountController';

const cron = require('node-cron');
const accountController = require('../../controllers/accountController');
function cronJobs () {
    cron.schedule('0 */12 * * *', () => {
        accountController.updateAccountStatus();
    });
}

module.exports = cronJobs;