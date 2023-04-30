import { Router } from "express";
import ProductManager from '../managers/productManager.js';
import uploader from "../services/uploader.js";

const router = new Router();
const productManager= new ProductManager();


router.get('/', async(req, res)=>{
    try {        
        const prods = await productManager.getProducts();
        const limit = req.query.limit;
        if(!limit) res.send(prods)
            else res.send(prods.slice(0, limit));
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/:pid', async(req, res)=>{
    try {        
        const pid = req.params.pid;
        const prod = await productManager.getProductById(pid);
        if(prod) res.send(prod);
    } catch (error) {
        res.status(400).send(error)
    }
});


router.post('/', uploader.single("file"), async(req, res)=>{
    try {
        const prod = req.body;
        if(prod.title && prod.description && prod.code && prod.price && prod.status && prod.stockNumber && prod.category){
            const path = req.file.path;
            if(path) prod.thumbnails=[path]
                else prod.thumbnails=[];
            await productManager.addProduct(prod);
            res.status(400).send({status:'success', message:'Product added'})
        }else{
            res.status(400).send({status: 'Error', error: 'Some fields are missing'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:pid', uploader.single('file'), async(req, res)=>{
    try {
        const pid = req.params.pid;
        const prod = req.body;
        const path = req.file.path;
        if(path) prod.thumbnails=[path]
            else prod.thumbnails=[]
        await productManager.updateProduct(pid, prod);
        res.send({status:'success', message:'Product updated'});
    } catch (error) {
        res.status(400).send(error)
    }
});


router.delete('/:pid', async(req, res)=>{
    try {
        const pid = req.params.pid;
        await productManager.deleteProduct(pid);
        res.send({status:'success', message:'Product deleted'});
    } catch (error) {
        res.status(400).send(error)
    }
})



export default router;