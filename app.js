require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const port = process.env.DB_PORT;
const bluebird = require('bluebird');
const e = require('express');

let connection; //almacena la conexion a la Db

//Configura servidor para recibir forma JSON
app.use(express.json());
app.use(cors({ origin: true }))

//Inician End points Alvaro

app.get("/get-users", async (request,response) =>{
    const [rows, fields] = await connection.execute("select * from users");
    response.json({data:rows});
})

app.get("/get-user", async (request,response) =>{
    const email = request.query.email;
    const [rows, fields] = await connection.execute(`SELECT * FROM users where email='${email}'`);
    response.json(rows[0])
})

// Finalizan end point Alvaro

//Estos son endpoint de Bryan

app.get("/get-product", async (request, response) => {
    const [rows, fields] = await connection.execute("SELECT * from products");

    //console.log({ data: rows });
    response.json({ data: rows }); //En este puedo preguntar por data que se encuentra dentro de un JSON   { data .....}
  });


  
app.get("/get-Unproduct", async (request, response) => {
    //Se debe enviar por postman en la parte params productID = #
    console.log(request.query.productID);
    const [rows, fields] = await connection.execute(
      `SELECT * FROM products WHERE productID=${request.query.productID};`
    );
    //console.log(rows.length);
    response.json(rows);
    console.log(rows);
  });


  app.post("/add-product", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
    const { productDescript, productCost, productState } = req.body;
    try {
      await connection.execute(
        `INSERT INTO products (productDescript,productCost,productState) VALUES('${productDescript}',${productCost},${productState})`
      );
  
      resp.json({ status: "ok" });
    } catch (error) {
      console.log(error);
    }
  }
  );


  app.post("/find-product", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    console.log(data.productID);
  
    try {
      const [rows, fields]= await connection.execute(
        `SELECT * FROM products WHERE productID=${data.productID};`    
        );
  
    resp.json(rows);
    console.log(rows);
    
    } catch (error) {
      console.log(error);
    }
  }
  );



  app.put("/actualizar-product", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    console.log(data);
  
    try {
      const [rows, fields]= await connection.execute(
        `UPDATE products SET productDescript= '${data.productDescript}', productCost=${data.productCost},productState=${data.productState} WHERE productID=${data.productID};`    
        );
  
    resp.json({ status: "ok" });
    
    } catch (error) {
      console.log(error);
    }
  }
  );



  app.get("/get-ventas", async (request, response) => {
    const [rows, fields] = await connection.execute("SELECT * from sales");

    //console.log({ data: rows });
    response.json({ data: rows }); //En este puedo preguntar por data que se encuentra dentro de un JSON   { data .....}
  });


  app.post("/find-sale", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    console.log(data.saleID);
  
    try {
      const [rows, fields]= await connection.execute(
        `SELECT * FROM sales WHERE sale_ID=${data.saleID};`    
        );
  
    resp.json(rows);
    console.log(rows);
    
    } catch (error) {
      console.log(error);
    }
  }
  );


  
  app.put("/actualizar-venta", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    console.log(data);
  
    try {
      const [rows, fields]= await connection.execute(
        `UPDATE sales SET fecha_venta='${data.saleDate}', Id_cliente='${data.saleIdClient}',nombre_Cliente='${data.saleNameClient}',valorTotal=${data.saleCost},estado='${data.saleState}',vendedor='${data.saleVendedor}' WHERE sale_ID=${data.saleID};`    
        );

    resp.json({ status: "ok" });
    
    } catch (error) {
      console.log(error);
    }
  }
  );




  app.post("/add-sale", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
    const { saleDate, saleIdClient, saleNameClient,saleCost,saleState,saleVendedor} = req.body;
    try {
      await connection.execute(
        `INSERT INTO sales (fecha_venta,Id_cliente,nombre_Cliente,valorTotal,estado,vendedor) VALUES('${saleDate}','${saleIdClient}','${saleNameClient}',${saleCost},'${saleState}','${saleVendedor}')`
      );
  
      resp.json({ status: "ok" });
    } catch (error) {
      console.log(error);
    }
  }
  );



  app.post("/add-item-sale", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
    const { saleCode, productCode, productCant,productTotal,productDescript,costUnita} = req.body;
    try {
      await connection.execute(
        `INSERT INTO salesdetail (productID,sale_code,productDescrip,saleDetailAmount,saleDetailTotalProduct,costUnit) VALUES(${saleCode},${productCode},'${productDescript}',${productCant},${productTotal},${costUnita})`
      );
  
      resp.json({ status: "ok" });
    } catch (error) {
      console.log(error);
    }
  }
  );


  app.get("/get-last-id-ventas", async (request, response) => {
    const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales ORDER BY sale_ID DESC LIMIT 1");
    //console.log({ data: rows });
    response.json({ data: rows }); //En este puedo preguntar por data que se encuentra dentro de un JSON   { data .....}
    console.log(rows);
  });



  app.post("/get-last-id-productos", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
    const data = req.body;
    try {
      const [rows, fields]= await connection.execute(
        `SELECT * FROM salesdetail WHERE sale_code=${data.saleID};`    
        );
    resp.json({ data: rows });
    } catch (error) {
      console.log(error);
    }
  }
  );


  
  app.post("/delete-product", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    console.log(data.itemID);
  
    try {
      const [rows, fields]= await connection.execute(
        `DELETE FROM salesdetail WHERE saleDetail_ID=${data.itemID};`    
        );
  
    resp.json(rows);
    console.log(rows);
    
    } catch (error) {
      console.log(error);
    }
  }
  );

  

  app.post("/recalc-venta-costo", async (req, resp) => {
    //const [productDescript, productCost, productState] = req.body;
    //Destructuración
  
    const data = req.body;
    //console.log(data.saleID);

    try {
      const [rows, fields]= await connection.execute(
        `SELECT SUM(saleDetailTotalProduct) as sumita FROM salesdetail WHERE sale_code=${data.saleID};`    
        );
  
    resp.json(rows[0].sumita);

    //resp.json(data.saleID);
    console.log(rows);
    
    } catch (error) {
      console.log(error);
    }
  }
  );




  

  //Fin endpoint de  de Bryan

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

