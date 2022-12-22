class Persona{
    constructor(nombre){
        this.nombre = nombre;
    }

    static especie = "humano"

    saludar = () =>{
        console.log(`¡Hola soy ${this.nombre}, mucho gusto!`)
    }

    getEspecie = () => {
        console.log(`Aunque no lo creas, soy un ${Persona.especie}`)
    }
}

let persona1 = new Persona("Cesar")
let persona2 = new Persona("Ricardo")

persona1.saludar();
persona1.getEspecie();

persona2.saludar();
persona2.getEspecie();

class Contador{
    constructor(nombre){
        this.nombre = nombre;
        this.contador = 0;
    }

    static contadorGlobal = 0;

    getResponsable(){
        return this.nombre
    }

    contar(){
        this.contador = this.contador + 1;
        Contador.contadorGlobal = Contador.contadorGlobal + 1;
    }

    getCuentaIndividual(){
        return this.contador
    }

    getCuentaGlobal(){
        return Contador.contadorGlobal
    }

}

let contadorNuevo= new Contador('Contador de ovejas');

console.log(contadorNuevo.getResponsable())
console.log(contadorNuevo.getCuentaGlobal())
console.log(contadorNuevo.getCuentaIndividual())


contadorNuevo.contar();
contadorNuevo.contar();
contadorNuevo.contar();

console.log(contadorNuevo.getCuentaGlobal())
console.log(contadorNuevo.getCuentaIndividual())
