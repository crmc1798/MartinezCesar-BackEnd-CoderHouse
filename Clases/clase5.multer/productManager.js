const fs = require("fs");

class ProductManager{
    
    constructor(products){
        this.products = products;
    }
 
    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        } 
        catch (error) {
            return error;
        }
    }

    async addProduct(product){
        try {
            const jsonData = await this.getProducts();
            let newJsonData;
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock")&& product.hasOwnProperty("status")&& product.hasOwnProperty("category");
            const verifyExistence = Object.values(jsonData).find((e) => e.code === product.code);
            if(verifyExistence === undefined){
                if(propertyCondition){
                    if(jsonData.length === 0){
                        product.id = jsonData.length+1;
                    }
                    else{
                        if(jsonData[jsonData.length-1].id == jsonData.length){
                            product.id = jsonData.length+1;
                        }
                        else{
                            product.id = jsonData[jsonData.length-1].id+1;
                        }
                    }
                    newJsonData = JSON.stringify([...jsonData, product]);
                    await fs.promises.writeFile(this.products, newJsonData);
                    return "Product added successfully";
                }
                else{
                    return "Product with missing information";
                } 
            }
            else{
                return "Product already in stock";
            }      
        } 
        catch (error) { 
            return error;
        }
    }

    async getProductById(id){
        try {
            const jsonData = await this.getProducts();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
        if (itemId === undefined) {
            return "Not Found";
        } 
        else {
            return itemId;
        }
        } 
        catch (error) {
            return error;
        }
    }

    async deleteById(id){
        try {
            const jsonData = await this.getProducts();
            const product = Object.values(jsonData).find((e) => e.id === id);
            if (product) {
                let newJsonData = jsonData.filter((item) => item.id !== id);
                await fs.promises.writeFile(this.products, JSON.stringify(newJsonData));
                return "Removed product successfully";
            } 
            else {
                return "Not Found";
            }
        } 
        catch (error) {
            return error;
        }
    }

    async updateProduct(id,product){
        try {
            const jsonData = await this.getProducts();
            const itemId = Object.values(jsonData ).find((e) => e.id === id);
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock")&& product.hasOwnProperty("status")&& product.hasOwnProperty("category");
            
            if (itemId === undefined) {
                return "Not Found";
            } 
            else {
                if (propertyCondition) {
                    itemId.title = product.title;
                    itemId.description = product.description;
                    itemId.price = product.price;
                    itemId.thumbnail = product.thumbnail;
                    itemId.code = product.code;
                    itemId.stock = product.stock;
                    itemId.status = product.sattus;
                    itemId.category = product.category;
                    
                    await fs.promises.writeFile(this.products, JSON.stringify(jsonData)); 
                    return "updated product successfully";
                } 
                else {
                    return "Product with missing information";
                }  
            }   
        } 
        catch (error) {
            return error;
        }
    }
}

module.exports = {ProductManager};

//[{"title":"Trustmaster t150","description":"Gaming Steering Wheel","price":5000,"thumbnail":"https://www.discoazul.com/uploads/media/images/t150rs-ps.jpg","code":"A-0010-Z","stock":10,"status":true,"category":"Sim racing","id":1},{"title":"Trustmaster TMX","description":"Gaming Steering Wheel","price":5000,"thumbnail":"https://c1.neweggimages.com/ProductImage/26-606-035-S03.jpg","code":"A-0020-Z","stock":10,"status":true,"category":"Sim racing","id":2},{"title":"Trustmaster t300","description":"Gaming Steering Wheel","price":5000,"thumbnail":"https://m.media-amazon.com/images/I/81eiBUipVVL.jpg","code":"A-0030-Z","stock":10,"status":true,"category":"Sim racing","id":3},{"title":"logitech g29","description":"Gaming Steering Wheel","price":5000,"thumbnail":"https://tiendasarcadia.com/wp-content/uploads/nc/p/1/7/1/6/7/17167.jpg","code":"A-0040-Z","stock":10,"status":true,"category":"Sim racing","id":4},{"title":"logitech g920","description":"Gaming Steering Wheel","price":5000,"thumbnail":"https://m.media-amazon.com/images/I/713hqmmfGSL._AC_SY450_.jpg","code":"A-0050-Z","stock":10,"status":true,"category":"Sim racing","id":5},{"title":"Trustmaster t150 v2","description":"Gaming Steering Wheel updated version","price":7000,"thumbnail":"https://www.discoazul.com/uploads/media/images/t150rs-ps.jpg","code":"A-0060-Z","stock":25,"status":true,"category":"Sim racing","id":6},{"title":"Trustmaster TMX v2","description":"Gaming Steering Wheel updated version","price":7000,"thumbnail":"https://c1.neweggimages.com/ProductImage/26-606-035-S03.jpg","code":"A-0070-Z","stock":25,"status":true,"category":"Sim racing","id":7},{"title":"Trustmaster t300 v2","description":"Gaming Steering Wheel updated version","price":7000,"thumbnail":"https://m.media-amazon.com/images/I/81eiBUipVVL.jpg","code":"A-0080-Z","stock":25,"status":true,"category":"Sim racing","id":8},{"title":"logitech g29 v2","description":"Gaming Steering Wheel updated version","price":7000,"thumbnail":"https://tiendasarcadia.com/wp-content/uploads/nc/p/1/7/1/6/7/17167.jpg","code":"A-0090-Z","stock":25,"status":true,"category":"Sim racing","id":9},{"title":"logitech g920 v2","description":"Gaming Steering Wheel updated version","price":7000,"thumbnail":"https://m.media-amazon.com/images/I/713hqmmfGSL._AC_SY450_.jpg","code":"A-0100-Z","stock":25,"status":true,"category":"Sim racing","id":10}]