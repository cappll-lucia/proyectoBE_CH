import fs from 'fs';
import __dirname from '../utils.js';

export default class CartsManager{
    constructor(){
        this.path=`${__dirname}/files/carts.json`;
    }

    getCatrs = async()=>{
        console.log(this.path)
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        }
    }

    getCartById = async(_id)=>{
        const carts = await this.getCatrs();
        const foundCart = carts.find(c=>c.id==_id)
        if(!foundCart){
            const err = new Error();
            err.status='Error'
            err.error=`No existe un cart con id=${_id}`
            throw err
        }
        return foundCart
    }

    addCart = async()=>{
        const newCart = {}
        const carts = await this.getCatrs();
        if(carts.length==0) newCart.id=1
            else newCart.id=carts[carts.length-1].id+1;
        newCart.products=[];
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts), null, '\n');
    }

    deleteCart = async(_id)=>{
        let carts = await this.getCatrs();
        carts=carts.filter(c=>c.id!=_id);
        await fs.promises.writeFile(this.path, JSON.stringify(carts), null, '\n');
    }

    addProdToCart = async(_id, _prodId)=>{
        const foundCart = await this.getCartById(_id);
        const carts = await this.getCatrs();
        const cartIndex = carts.findIndex(c=>c.id==foundCart.id);
        const prodIndexInCart =foundCart.products.findIndex(p=>p.product==_prodId);
        if(prodIndexInCart===-1){
            foundCart.products.push({
                product: Number(_prodId),
                quantity: 1
            })
        }else{
            foundCart.products[prodIndexInCart].quantity++;
        }
        carts[cartIndex]=foundCart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts), null, '\t');
    }



}