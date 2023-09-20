const fs = require('fs');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const cookie = require('cookie-parser');
app.use(cookie());

const session = require('express-session');
app.use(session({
    secret: 'secret',
    cookie: { path:'/', maxAge:(60*60*1000), httpOnly:true, secure:false, SameSite:'None' },
    resave: false,
    saveUninitialized: true,
}));

const basicAuth = require('basic-auth-connect');
app.all('/api/secret', basicAuth((user, password) => {
    return user === 'user' && password === 'password';
}));

app.all('/favicon.ico', express.static(__dirname + '/dist/favicon.ico'));
app.use('/css/', express.static(__dirname + '/dist/css/'));
app.use('/js/', express.static(__dirname + '/dist/js/'));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.get('/sample1', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.get('/sample2', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.post('/api/update', (req, res) => {
    if (session["UserName"] !== 'user') {
        //エラーレスポンスを返す
    }
    const data = Object.assign({ 'result':true }, req.body);
    if ((req.body.message||'').trim())
        fs.appendFileSync('test.txt', (req.body.message + '\n'));
    data['contents'] = fs.readFileSync('test.txt', 'utf8').split(/\n/).filter((a) => { return (a !== ''); }).reverse();
    data['userName'] = session["UserName"];
    res.json(data);
});

app.get('/api/read', (req, res) => {
    const data = { 'result':true };
    data['contents'] = fs.readFileSync('test.txt', 'utf8').split(/\n/).filter((a) => { return (a !== ''); }).reverse();
    data['userName'] = session["UserName"];
    res.json(data);
});

app.get('/api/secret', (req, res) => {
    const data = { 'result':true };
    session["UserName"] = "user";
    res.json(data);
});

app.listen(3000, () => {
    console.log('start app.js')
});
