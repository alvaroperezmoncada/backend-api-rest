require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const port = 3001;
const bluebird = require('bluebird');
const e = require('express');

let connection; //almacena la conexion a la Db
app.use
//Configura servidor para recibir forma JSON
app.use(express.json());
app.use(cors({ origin: true }))
app.set('port',process.env.PORT || port)
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

app.get("/get-user-email", async (request,response) =>{
    const email = request.query.email;
    const [rows, fields] = await connection.execute(`SELECT * FROM users where email like '%${email}%'`);
    response.json({data:rows});
})

app.get("/get-user-id", async (request,response) =>{
    const email = request.query.id_user;
    const [rows, fields] = await connection.execute(`SELECT * FROM users where id='${id_user}'`);
    response.json(rows[0]);
})


app.put("/update-product", (req, res) => {
  const product = req.body;
  console.log(product.name)
  res.json(product)
})


app.put("/update-user", async (request, response) => {
    try {
      const {id_user, user_name, email, estado, admin} = request.body;

      const [rows, fields]= await connection.execute(
        `UPDATE users SET estado= '${data.estado}', admin= '${data.admin}'' WHERE users.id_user=${data.id_user};`    
        );  
    resp.json({ status: "ok" });
    
    } catch (error) {
      console.log(error);
    }
  }
  );



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


  //Fin endpoint de  de Bryan

//ventas
//listar ventas
app.get("/get-sales", async (req, res) => {
  const [rows, fields] = await connection.execute(
    `SELECT * FROM sales`
  );
  res.json(rows);
  console.log(rows);
})

//buscar id
app.post("/find-sale-by-sale-id", async (req, res) => {
  console.log(req.body.sale_ID);
    const [rows, fields] = await connection.execute(
      `SELECT * FROM sales WHERE sale_ID=${req.body.sale_ID};`
    );
    //console.log(rows.length);
    res.json(rows);
    console.log(rows);
})

//buscar nombre
app.get("/find-sale-by-name", async (req, res) => {
  console.log(req.query.nombre_Cliente);
    const [rows, fields] = await connection.execute(
      `SELECT * FROM sales WHERE nombre_Cliente=${req.query.nombre_Cliente};`
    );
    //console.log(rows.length);
    res.json(rows);
    console.log(rows);
})

//buscar identificacion
app.get("/find-sale-by-id-client", async (req, res) => {
  console.log(req.query.Id_cliente);
    const [rows, fields] = await connection.execute(
      `SELECT * FROM sales WHERE Id_cliente=${req.query.Id_cliente};`
    );
    //console.log(rows.length);
    res.json(rows);
    console.log(rows);
})

//obtener ultimo id generado de factura
app.get("/get-last-sale", async (request, response) => {
  const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales s ORDER BY 1 DESC LIMIT 1");

  //console.log({ data: rows });
  response.json({ data: rows }); //En este puedo preguntar por data que se encuentra dentro de un JSON   { data .....}
});

//guardar venta
app.post("/add-sale", async (req, resp) => {
  const { fecha_venta, Id_cliente, nombre_Cliente, valorTotal, estado, vendedor } = req.body;
  try {
    await connection.execute(
      `INSERT INTO sales (fecha_venta, Id_cliente, nombre_Cliente, valorTotal, estado, vendedor) VALUES('${fecha_venta}','${Id_cliente}','${nombre_Cliente}', ${valorTotal},'${estado}','${vendedor}')`
    );
    const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales s ORDER BY 1 DESC LIMIT 1");
    resp.json({ data: rows});
  } catch (error) {
    console.log(error);
  }
}
); 

//Actualizar ventas
app.post("/update-sale", async (req, resp) => {
  const { sale_ID, fecha_venta, Id_cliente, nombre_Cliente, valorTotal, estado, vendedor } = req.body;
  try {
    await connection.execute(
      `UPDATE sales SET fecha_venta = '${fecha_venta}', Id_cliente = '${Id_cliente}', nombre_Cliente = '${nombre_Cliente}', valorTotal = ${valorTotal}, estado = '${estado}', vendedor = '${vendedor}' WHERE sale_ID=(${sale_ID})`
    );
    const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales s ORDER BY 1 DESC LIMIT 1");
    resp.json({ data: rows});
  } catch (error) {
    console.log(error);
  }
}
); 

//Agregar producto por venta
app.post("/add-product-sale", async (req, resp) => {
  const { productID, productDescrip, sale_code, saleDetailAmount, costUnit, saleDetailTotalProduct } = req.body;
  try {
    await connection.execute(
      `INSERT INTO salesdetail (productID, productDescrip, sale_code, saleDetailAmount, costUnit, saleDetailTotalProduct) VALUES(${productID}, '${productDescrip}', ${sale_code}, ${saleDetailAmount}, ${costUnit}, ${saleDetailTotalProduct})`
    );
    const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales s ORDER BY 1 DESC LIMIT 1");
    resp.json({ data: rows});
  } catch (error) {
    console.log(error);
  }
}
); 

//obtener productos por ventas
app.post("/find-products-by-sale", async (req, res) => {
  console.log(req.body.sale_code);
    const [rows, fields] = await connection.execute(
      `SELECT sd.saleDetail_ID, sd.productID, sd.sale_code, sd.saleDetailAmount, sd.saleDetailTotalProduct, p.productDescript, p.productCost FROM products p INNER JOIN salesdetail sd  on p.productID = sd.productID WHERE sd.sale_code =${req.body.sale_code};`
    );
    //console.log(rows.length);
    res.json(rows);
    console.log(rows);
})

//eliminar producto de venta
app.post("/delete-product-sale", async (req, resp) => {
  const { saleDetail_ID } = req.body;
  try {
    await connection.execute(
      `UPDATE salesdetail SET sale_code = 69 WHERE saleDetail_ID=(${saleDetail_ID})`
    );
    const [rows, fields] = await connection.execute("SELECT sale_ID FROM sales s ORDER BY 1 DESC LIMIT 1");
    resp.json({ data: rows});
  } catch (error) {
    console.log(error);
  }/*
  await connection.execute(`DELETE FROM salesdetail WHERE saleDetail_ID = ${saleDetail_ID}`);
  response.json({ status: "ok" });*/
});

//productos disponibles
app.get("/get-products-available", async (req, res) => {
  const [rows, fields] = await connection.execute(
    `SELECT * FROM products WHERE productState = 1`
  );
  res.json(rows);
  console.log(rows);
})

//total de la venta 
app.post("/get-total-sale", async (req, res) => {
  console.log(req.body.sale_code);
    const [rows, fields] = await connection.execute(
      `SELECT SUM(s.saleDetailTotalProduct) as SUMA FROM salesdetail s WHERE sale_code =${req.body.sale_code};`
    );
    res.json(rows);
    console.log(rows);
})
//FIn ventas

  
app.listen(app.get('port'), async() =>{
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

