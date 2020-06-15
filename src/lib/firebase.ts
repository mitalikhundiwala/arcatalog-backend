import * as admin from 'firebase-admin';

const serviceAccount =
    process.env.NODE_ENV === 'production'
        ? require('../../ar-catalog-production-firebase.json')
        : require('../../ar-catalog-firebase.json');
console.log(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
