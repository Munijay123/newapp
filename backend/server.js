const express = require("express");
const mySql = require('mysql');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mySql.createConnection({
    host: 'Localhost',
    user: "root",
    password: "",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO LOGIN ('firstname','lastname','phonenumber','email','password','confirmpassword') VALUES (?)"
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.email,
        req.body.password,
        req.body.confirmpassword
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM LOGIN WHERE email = ? AND password = ?"
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");

        }
        return res.json("Failed");

    })
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM LOGIN"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.get('/users/:id', (req, res) => {
    const sql = "SELECT * FROM LOGIN WHERE id = ?"
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.put('/users/:id', (req, res) => {
    const sql = "UPDATE LOGIN SET firstname = ?, lastname = ?, phonenumber = ?, email = ?, password = ?, confirmpassword = ? WHERE id = ?"
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.email,
        req.body.password,
        req.body.confirmpassword,
        req.params.id
    ]
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.delete('/users/:id', (req, res) => {
    const sql = "DELETE FROM LOGIN WHERE id = ?"
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.get('/users/search/:name', (req, res) => {
    const sql = "SELECT * FROM LOGIN WHERE firstname LIKE ? OR lastname LIKE ?"
    const name = `%${req.params.name}%`
    db.query(sql, [name, name], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Server is running");
})