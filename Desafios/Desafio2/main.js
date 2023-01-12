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
        }
    }
 
    async getProducts(){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            return console.log(jsonData);
        } 
        catch (error) {
            return console.error(error);
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
            return console.log(itemId);
        }
        } 
        catch (error) {
            return console.error(error);
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
                return console.log("Removed product");
            } else {
                return console.error("Not Found");
            }
        } 
        catch (error) {
            return console.error(error);
        }
    }

    async updayeProduct(id,product){
        try {
            const data = await fs.promises.readFile(this.products, "utf-8");
            const jsonData = JSON.parse(data);
            const itemId = Object.values(jsonData).find((e) => e.id === id);
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
                    return console.log("updated product");
                } 
                else {
                    return console.error("Product with missing information");
                }
                  
            }
            
        } 
        catch (error) {
            return console.error(error);
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

//Proceso de testing
//Para probar cada metodo es necesario comentar y descomentar las lineas indentadas segun los pasos 

//primero se crea una instancia de la clase ProdctManager.
const productosSimRacing = new ProductManager("./products.txt");

//1.-Se llama a la instancia getProducts y regresa un arreglo vacio.

    //productosSimRacing.getProducts();


//2.-Despues se agregan 4 productos uyno por uno con la instancia addProduct, cada uno se agrega con un id unico.

    // productosSimRacing.addProduct(producto1);
    // productosSimRacing.addProduct(producto2);
    // productosSimRacing.addProduct(producto3);
    // productosSimRacing.addProduct(producto4);


//3-De nuevo se llama a la instancia getProducts donde devuelve los 4 elementos agregados anteriormente.

    //productosSimRacing.getProducts();


//4.-Se llama a la instancia getProductById primero a un elemento que se sabe ue existe dentro del arreglo para que lo despliegue y despues uno que no.

    //productosSimRacing.getProductById(3);//Elemento existente en el arreglo
    //productosSimRacing.getProductById(5);//Elemento que no existe en el arreglo

//5-Despues se llama al metodo updateProduct para modificar el segundo elemento del arreglo, usando como entrada el id del elemento y un nuevo objeto con los valores actualizados.

    //productosSimRacing.updayeProduct(2,ActualizacionDeProducto);


//6.-A continuacion se hace uso del metodo deleteProduct para eleminar el cuarto elemento del arreglo que se sabe que existe un quinto que se sabe que no existe para mostrar un error.

    //productosSimRacing.deleteById(4);
    //productosSimRacing.deleteById(5);


//7.-Por ultimo se hace uso del metodo getProducts para desplegar el arreglo de productos actualizado despues ded los ultmos pasos, donde se actualiza un producto y se elimina otro.

    //productosSimRacing.getProducts();