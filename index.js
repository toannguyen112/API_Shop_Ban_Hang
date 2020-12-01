const express = require('express');
const bodyParser = require('body-parser')
require("./src/db/mongoose");
const costomerRouter = require('./src/routers/costomer_route');
const productRouter = require('./src/routers/product_route');
const adminRouter = require('./src/routers/admin_routes');
const cartRouter = require('./src/routers/cart_routes');
const orderRouter = require('./src/routers/order_routes');

const app = express();
const port = process.env.PORT

var cors = require('cors')
app.use(express.json());
app.use(cors());
app.use(adminRouter);
app.use(costomerRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);

app.use(bodyParser.json());


app.listen(port, () => {
    console.log("Server is up on port " + port);
});
