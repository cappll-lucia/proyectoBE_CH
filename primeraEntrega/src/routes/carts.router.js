import {Router} from 'express';
import CartsManager from '../managers/cartsManager.js';

const router = new Router();
const cartsManager = new CartsManager();


router.get('/:cid', async(req, res)=>{
    try {        
        const cid = req.params.cid;
        const cart = await cartsManager.getCartById(cid);
        if(cart) res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/', async(req, res)=>{
    try {
        await cartsManager.addCart();
        res.send({status:'success', message:'Cart added'})
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/:cid/product/:pid', async(req, res)=>{
    try {
        const cid= req.params.cid;
        const pid= req.params.pid;
        await cartsManager.addProdToCart(cid, pid)
        res.send({status:'success', message:'Prod added to cart'})
    } catch (error) {
        res.status(400).send(error);
    }
})


router.delete('/:cid', async(req, res)=>{
    try {
        const cid = req.params.cid;
        await cartsManager.deleteCart(cid);
        res.send({status:'success', message:'Cart removed'})
    } catch (error) {
        res.status(400).send(error);
    }
})


export default router;