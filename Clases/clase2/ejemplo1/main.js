const number = [1, 2, 3, 4, 5, 6,];

const cuadrados = number.map(numero => numero ** 2);
console.log(cuadrados);

const incluye = cuadrados.includes(16);
console.log(incluye);

const numeroABuscar = 5;
const incluyeNumber = number.includes(numeroABuscar);
console.log(`El valor ${numeroABuscar}  se esta buscando en el array ${number} y el resultado es ${incluyeNumber}`);

const objeto = [
    {
        manzanas: 1,
        peras: 1,
        naranjas: 1,
        uvas: 1
    },

    {
        manzanas: 1,
        peras: 1,
        naranjas: 1,
        toronjas: 1
    }
]


let nuevoArray = []
for (let i = 0; i < objeto.length; i++) {
    let x2 = Object.keys(objeto[i]);
    //console.log(x2)
    for (let j = 0; j < x2.length; j++) {
        if (nuevoArray.includes(x2[j]) == false) {
            nuevoArray.push(x2[j]);
        }
    }
}
console.log(nuevoArray);

let total = 0
for (let i = 0; i < objeto.length; i++) {
    let x1 = Object.values(objeto[i]);
    //console.log(x1)
    for (let j = 0; j < x1.length; j++) {
        total = total + x1[j];
    }
}
console.log(total);


