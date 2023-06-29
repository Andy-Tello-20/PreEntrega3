/* CAPTURAR formulario VENTAS/INT/SALIDAS/BOTON */

let ventasInp = document.getElementById("ventas")
let interesInp = document.getElementById("interes")
let salidasInp = document.getElementById("salidas")
let btnCalcular = document.getElementById("calcular")
let cuadroResp = document.getElementsByClassName("resp")[0]


/* clase constructura */

class moldeRegistro {
    constructor(id, ventas, interes, salidas, ganancia, dia, mes, año, hora, minutos, segundos) {
        this.id = id
        this.ventas = ventas,
            this.interes = interes,
            this.salidas = salidas,
            this.ganancia = ganancia,
            this.dia = dia,
            this.mes = mes,
            this.año = año,
            this.hora = hora,
            this.minutos = minutos,
            this.segundos = segundos
    }

    vistaPrevia() {
        cuadroResp.innerText = `ID: ${this.id} - Las ventas son $${this.ventas}\n interes de ${this.interes}%\n una ganancia de $${this.ganancia.toFixed(2)}\n las salidas fueron: $${this.salidas}`
    }
}







function registrar(x, y, z) {

    let listaRegistros
    let contador 

    if (localStorage.getItem("registros")) {   //SI EXISTE PASA LO SIG.

        listaRegistros = JSON.parse(localStorage.getItem("registros"))

        let long= listaRegistros.length

        let ultimoID= listaRegistros[long-1].id

        contador=ultimoID

        console.log(long)


    } else {

        listaRegistros = []
        contador = 0
    }

    contador += 1
    let Id = contador
    let ventas, interes, salidas


    ventas = x
    interes = y
    salidas = z

    const fechaActual = new Date()

    let año = fechaActual.getFullYear()
    let mes = fechaActual.getMonth() + 1
    let dia = fechaActual.getDate()
    let hora = fechaActual.getHours()
    let minutos = fechaActual.getMinutes()
    let segundos = fechaActual.getSeconds()

    let ganancia = ventas * (interes / 100)

    let nuevoRegistro = new moldeRegistro(Id, ventas, interes, salidas, ganancia, dia, mes, año, hora, minutos, segundos)


    listaRegistros.push(nuevoRegistro)

    localStorage.setItem("registros", JSON.stringify(listaRegistros))

    nuevoRegistro.vistaPrevia()


}

/*EVENTO EN EL BOTON CALCULAR */

btnCalcular.addEventListener("click", (event) => {

    event.preventDefault()

    let valorVentas = parseInt(ventasInp.value)
    let valorInt = parseInt(interesInp.value)
    let valorSalidas = parseInt(salidasInp.value)


    registrar(valorVentas, valorInt, valorSalidas)
})