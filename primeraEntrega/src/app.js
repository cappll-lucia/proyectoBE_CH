import express from 'express';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res)=>{
    res.send('<h1>Primera entrega proyecto final</h1><h3>Será necesario trabajar con Postman</h3>')
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`))