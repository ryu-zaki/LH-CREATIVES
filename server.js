require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const path = require("path");
const mysql = require('mysql2');
const {hashPassword} = require('./middlewares');
const session = require("express-session");

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ashlieKim',
    database: 'test',
});


app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'c8681865f02915a4a73a3c8943c7ff22d3874d03b5642dc407acbb93fffa356d21420713cac415f2a3070c6cea8e643503f33aef0aadff2f4c986cc869b3b4a8'
}))

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
})

app.get('/dashboard', (req, res) => {
    if (!req.session.isLogin) {
        res.redirect('/signin');
        return;
    }
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'dashboard.html'));
})

app.get('/signin', (req, res) => {
    if (req.session.isLogin) return res.redirect('/dashboard');
    res.sendFile(path.join(__dirname, 'frontend', 'pages', 'signin.html'));
})

dbConnection.connect((err) =>  {
    if (err) {
        console.log(err)
        return;
    }

    app.post("/signin", hashPassword, async (req, res) => {

        const sql = `SELECT * FROM users WHERE password = ?`;

        dbConnection.execute(sql, [req.hashPass], (err, results) => {
           if (err) return console.log(err.stack);

           if (!results.length) return res.sendStatus(401);

            req.session.isLogin = true;
            res.sendStatus(200);
           
           

        })
    });

    app.post("/logout", (req, res) => {
        req.session.destroy();

        res.sendStatus(200);
       
        
    })
   
   }
)


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));