require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const port = process.env.DB_PORT;
const bluebird = require('bluebird');
const e = require('express');

let connection; //almacena la conexion a la Db

//Configura servidor para recibir forma JSON
app.use(express.json());
//app.use(cors({ origin: true }))

app.get("/get-users", async (request,response) =>{
    const [rows, fields] = await connection.execute("select * from users");
    response.json({data:rows});
})

app.get("/get-user", async (req,res) =>{
    const email = req.query.email;
    const [rows, fields] = await connection.execute(`SELECT * FROM users where email='${email}'`);
    res.json(rows[0])
})

/* app.post("/add-product", async (req, res) => {
    try {
        console.log(req.body)
        const {name, price, stock, description} = req.body;
        await connection.execute(`INSERT INTO products (name, price, stock, description) VALUES('${name}',${price}, ${stock}, '${description}')`);
        res.json({status:"ok"})
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
    
})

app.put("/update-product", (req, res) => {
    const product = req.body;
    console.log(product.name)
    res.json(product)
})
app.delete("/delete-product", (req, res) => {
    const product = req.body;
    console.log(product.name)
    res.json(product)
}) */


app.listen(port, async() =>{
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_DATABASE,
        Promise: bluebird
    }
    );
    console.log("Servidor running on port: " + port);
});

