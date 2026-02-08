const config = require('../config/db.config');

console.log('--- Configuration Debug ---');
console.log('DB_HOST:', config.HOST);
console.log('DB_USER:', config.USER);
console.log('DB_PASSWORD Type:', typeof config.PASSWORD);
console.log('DB_PASSWORD Value:', config.PASSWORD ? (config.PASSWORD.length > 0 ? '******' : '<empty>') : '<null/undefined>');
console.log('DB_NAME:', config.DB);
console.log('---------------------------');
