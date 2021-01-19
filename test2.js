const rjson = require('r-json');
const path = require('path');
const webpush = require('web-push');

console.log(rjson(path.join(__dirname,'notify-users.json')))
            
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:rjvkumaraswamy@gmail.com', publicVapidKey, privateVapidKey);

const payload = JSON.stringify({ title: 'test' });

//webpush.sendNotification(rjson(path.join(__dirname,'notify-users.json')),payload).catch(error=>{console.error(error.stack);});


