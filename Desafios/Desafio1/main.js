class ProductManager{
    #products;
    constructor(){
        this.#products = [];
    }

    addProduct(product){
        const propertyCondition = product.hasOwnProperty("title") && product.hasOwnProperty("description")&& product.hasOwnProperty("price")&& product.hasOwnProperty("thumbnail")&& product.hasOwnProperty("code")&& product.hasOwnProperty("stock");
        const verifyExistence = this.#products.find((e) => e.code === product.code)
        if (verifyExistence === undefined) {
            if(propertyCondition){
                this.#products.push({
                    title: (product.title), 
                    description: (product.description), 
                    price: (product.price), 
                    thumbnail: (product.thumbnail), 
                    code: (product.code), 
                    stock: (product.stock), 
                    id: (this.#products.length+1)
                });
            }
            else{
                return console.error("Product with missing information");
            }
        } 
        else {
            return console.error("Product already in stock");
        }
    }
 
    getProducts(){
        return this.#products
    }

    getProductById(id){
        const itemId = this.#products.find((e) => e.id === id)
        if (itemId === undefined) {
            return console.error("Not Found");
        } else {
            return itemId
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

//Proceso de testing

//primero se crea una instancia de la clase ProdctManager.
const productosSimRacing = new ProductManager();

//Se llama a la funcion  getProducts para devolver un arreglo vacio.
console.log(productosSimRacing.getProducts());

//Se agregan 5 elementos con infofrmacion distinta usando la funcion addProduct.
productosSimRacing.addProduct(producto1);
productosSimRacing.addProduct(producto2);
productosSimRacing.addProduct(producto3);
productosSimRacing.addProduct(producto4);
productosSimRacing.addProduct(producto5);

//Se muestran los 5 productos agregados con exito, con id distinto.
console.log(productosSimRacing.getProducts());

//Se agrega el producto1 nuevamente usando la funcion addProduct, pero se muestra error ya existir un elemento con el mismo codigo.
productosSimRacing.addProduct(producto1);

//Se llama al producto con el id=3 mediante la funcion getProductById y se muestra en consola.
console.log(productosSimRacing.getProductById(3));

//Por ultimo se llama al producto con id=6 mediante la funcion getProductById y al no existir tal producto muestra error en la consola.
console.log(productosSimRacing.getProductById(6));