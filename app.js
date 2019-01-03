const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

/*
let logger = function(req, res, next){
    console.log('Logging...');
    //va afficher 'logging' lorsqu'on fait un get//
    next();
}

app.use(logger); 
*/

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path// vers le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api', (req, res) => {

    res.json({
        message: 'Welcome to the API... Bitch!'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);

        } else {
            res.json({
                message: 'Post created...',
                authData

            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: "brad@gmail.com"
    }

    jwt.sign({
        user
    }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});
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