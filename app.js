const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const db = mongojs('customerapp', ['users']);

const app = express();

/*
let logger = function(req, res, next){
    console.log('Logging...');
    //va afficher 'logging' lorsqu'on fait un get//
    next();
}

app.use(logger); 
*/
//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//set static path// vers le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

//Global vars
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
});

//express-validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() +']';

        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// app.get('/api', (req, res) => {

//     res.json({
//         message: 'Welcome to the API... Bitch!'
//     });
// });



app.get('/', function (req, res) {
    db.users.find(function (err, docs){
        res.render('index', {
            title: 'Customers',
            users: users
    })
    
    });
});

app.post('/users/add', function(req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
    } else {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email

        }
        console.log('SUCCESS');
    }
});


// app.post('/api/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403);

//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData

//             });
//         }
//     });
// });

// app.post('/api/login', (req, res) => {
//     //Mock user
//     const user = {
//         id: 1,
//         username: 'brad',
//         email: "brad@gmail.com"
//     }

//     jwt.sign({
//         user
//     }, 'secretkey', (err, token) => {
//         res.json({
//             token
//         });
//     });
// });
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server started on port 5000'));