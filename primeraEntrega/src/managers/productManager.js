import fs from 'fs';
import __dirname from '../utils.js';

export default class ProductManager{
    constructor(){
        this.path = `${__dirname}/files/products.json`;
    }

    getProducts = async()=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }else{
            return [];
        }
        
    }

    getProductById= async(_id)=>{
        const products = await this.getProducts();
        const foundProd = products.find((p)=>p.id==_id);
        if(!foundProd){
            const err = new Error();
            err.status='Error';
            err.error=`There is no product with id=${_id}`;
            throw err
        }
        return foundProd
    }

    addProduct = async(_prod)=>{
        const products = await this.getProducts();
        if(products.length==0){
            _prod.id=1
        }else{
            _prod.id=products[products.length-1].id+1;
        }
        products.push(_prod);
        await fs.promises.writeFile(this.path, JSON.stringify(products), null, '\t');
    }
    
    deleteProduct = async(_id)=>{
        let products = await this.getProducts();
        products=products.filter(prod=>prod.id!=_id);
        await fs.promises.writeFile(this.path, JSON.stringify(products), null, '\t');
    }
    
    updateProduct = async(_id, _changes)=>{
        const foundProd = await this.getProductById(_id);
        const products = await this.getProducts();
        const index = products.findIndex(prod=>prod.id==_id);
        if(!foundProd){
            const err = new Error();
            err.status='Error';
            err.message=`There is no product with id=${_id}`;
            throw err
        }
        if(_changes.title){
            foundProd.title=_changes.title;
        }
        if(_changes.description){
            foundProd.description=_changes.description;
        }
        if(_changes.price){
            foundProd.price=_changes.price;
        }
        if(_changes.thumbnails){
            foundProd.thumbnails.push(... _changes.thumbnails);
        }
        if(_changes.code){
            foundProd.code=_changes.code;
        }
        if(_changes.stockNumber){
            foundProd.stockNumber=_changes.stockNumber;
        }
        if(_changes.status){
            foundProd.status=_changes.status;
        }
        if(_changes.category){
            foundProd.category=_changes.category;
        }
        products[index]=foundProd;
        await fs.promises.writeFile(this.path, JSON.stringify(products), null, '\t');
    }
}