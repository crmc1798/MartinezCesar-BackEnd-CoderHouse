//tipos de funciones

//tradicional
function saludar (nombre){
    console.log('Hola '+nombre)
}
let usuario = 'Diego'
saludar(usuario)

//const
const restarMayoriaEdad = function (mayoriaEdad, edadUsuario){
    return mayoriaEdad - edadUsuario;
}

let mayoriaEdad = 21;
let edadUsuario = 18;

const resultado = restarMayoriaEdad(mayoriaEdad,edadUsuario);

console.log({resultado})

//flecha (colocar return y llaves en caso de tener mas de una instruccion)
let num1 = 1
let num2 = 3
const sumarNumeros = (num1, num2) => num1 + num2
const resultado2 = sumarNumeros(num1,num2);

console.log({resultado2})