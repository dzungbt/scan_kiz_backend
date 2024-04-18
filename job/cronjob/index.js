import cron from 'node-cron';
import accountController from '../../controllers/accountController';
function cronJobs () {
    cron.schedule('*/5 * * * * *', () => {
        accountController.updateAccountStatus()
    });
}

module.exports = cronJobs;