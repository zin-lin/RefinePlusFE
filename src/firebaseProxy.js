var admin = require('firebase-admin');
var serviceAccount = require('./comicsx-be12b-firebase-adminsdk-zxz3h-80a7043e2b.json');
const tunnel = require('tunnel2')
// Create your Proxy Agent
// Please choose your tunneling method accordingly, my case
// is httpsoverHttp, yours might be httpsoverHttps
const proxyAgent = tunnel.httpsOverHttp({
    proxy: {
        host: 'http://146.176.251.205',
        port: '80',
    }
});
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount, proxyAgent),
});