const fs = require("fs");

class ProductManager{
    
    constructor(products){
        this.products = products;
    }

    async addProduct(product){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            let newJsonData;
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock");
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
                    return console.error("Product added successfully");
                }
                else{
                    return console.error("Product with missing information");
                } 
            }
            else{
                return console.error("Product already in stock");
            }      
        } 
        catch (error) { 
            console.error(error);
            return error;
        }
    }
 
    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            return jsonData;
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }

    async getProductById(id){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            const itemId = Object.values(jsonData).find((e) => e.id === id);
        if (itemId === undefined) {
            return console.error("Not Found");
        } else {
            console.log(itemId);
            return itemId;
        }
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }

    async deleteById(id){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            const product = Object.values(jsonData).find((e) => e.id === id);
            if (product) {
                let newJsonData = jsonData.filter((item) => item.id !== id);
                await fs.promises.writeFile(this.products, JSON.stringify(newJsonData));
                //return console.error(newJsonData);
                return console.log("Removed product successfully");
            } else {
                return console.error("Not Found");
            }
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }

    async updateProduct(id,product){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            const itemId = Object.values(jsonData ).find((e) => e.id === id);
            const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock");
            
            if (itemId === undefined) {
                return console.error("Not Found");
            } else {
                if (propertyCondition) {
                    itemId.title = product.title;
                    itemId.description = product.description;
                    itemId.price = product.price;
                    itemId.thumbnail = product.thumbnail;
                    itemId.code = product.code;
                    itemId.stock = product.stock;
                    await fs.promises.writeFile(this.products, JSON.stringify(jsonData)); 
                    return console.log("updated product successfully");
                } 
                else {
                    return console.error("Product with missing information");
                }
                  
            }
            
        } 
        catch (error) {
            console.error(error);
            return error;
        }
    }
}

const producto1 = {
    title: "Trustmaster t150", 
    description: "Gaming Steering Wheel", 
    price: 5000, 
    thumbnail: "https://www.discoazul.com/uploads/media/images/t150rs-ps.jpg", 
    code: "A-0010-Z", 
    stock: 10 
}

const producto2 = {
    title: "Trustmaster TMX", 
    description: "Gaming Steering Wheel", 
    price: 5000, 
    thumbnail: "https://c1.neweggimages.com/ProductImage/26-606-035-S03.jpg", 
    code: "A-0020-Z", 
    stock: 10 
}

const producto3 = {
    title: "Trustmaster t300", 
    description: "Gaming Steering Wheel", 
    price: 5000, 
    thumbnail: "https://m.media-amazon.com/images/I/81eiBUipVVL.jpg", 
    code: "A-0030-Z", 
    stock: 10 
}

const producto4 = {
    title: "logitech g29", 
    description: "Gaming Steering Wheel", 
    price: 5000, 
    thumbnail: "https://tiendasarcadia.com/wp-content/uploads/nc/p/1/7/1/6/7/17167.jpg", 
    code: "A-0040-Z", 
    stock: 10 
}

const producto5 = {
    title: "logitech g920", 
    description: "Gaming Steering Wheel", 
    price: 5000, 
    thumbnail: "https://m.media-amazon.com/images/I/713hqmmfGSL._AC_SY450_.jpg", 
    code: "A-0050-Z", 
    stock: 10 
}

const ActualizacionDeProducto = {
    title: "titulo actualizado", 
    description: "Descripccion actualizada", 
    price: 12345, 
    thumbnail: "url a imagen actualizado", 
    code: "codigo actualizado", 
    stock: 1234 
}

module.exports = {ProductManager};