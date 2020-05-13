import * as admin from 'firebase-admin';

const serviceAccount = require('../../ar-catalog-firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
