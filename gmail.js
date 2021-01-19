const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path')

const clientSecret = path.join(__dirname,'/credentials/clientSecret.json');

function getCredentials() {
  const filePath = clientSecret
  if (fs.existsSync(filePath)) {
    return require(filePath)
  }
  if (process.env.CREDENTIALS) {
    return JSON.parse(process.env.CREDENTIALS)
  }
  throw new Error('Unable to load credentials')
}

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
}

async function getAuth(){
  const credentials = getCredentials()
  const client = await google.auth.getClient({
    credentials,
    scopes: ['https://www.googleapis.com/auth/gmail.send',
             'https://mail.google.com/',
             'https://www.googleapis.com/auth/gmail.modify',
             'https://www.googleapis.com/auth/gmail.compose',
             'https://www.googleapis.com/auth/gmail.send'
            ]
  })
  return client;
}

async function getGmail() {
  var auth = await getAuth();
  return google.gmail({
    version: 'v1',
    auth
  })
}

(async()=>{
var gmail = await getGmail();
const credentials = getCredentials();
var auth = getAuth();
var raw = makeBody('rajeevraok@gmail.com', 'carryminati@appspot.gserviceaccount.com', 'This is your subject', 'I got this working finally!!!');
    gmail.users.messages.send({
        auth,
        userId: 'me',
        resource: {
            raw: raw
        }

    }, function(err, response) {
        return(err || response)
    });
})();