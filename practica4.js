/* CAPTURAR formulario VENTAS/INT/SALIDAS/BOTON */

let ventasInp = document.getElementById("ventas")
let interesInp = document.getElementById("interes")
let salidasInp = document.getElementById("salidas")
let btnCalcular = document.getElementById("calcular")
let cuadroResp = document.getElementsByClassName("resp")[0]
let formulario1 = document.getElementsByClassName("formulario")[0]


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

        let long = listaRegistros.length

        let ultimoID = listaRegistros[long - 1].id

        contador = ultimoID

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

    //Reseteo formulario
    formulario1.reset()


})

/*------------------------------------------------------------------------------------ */


/*CAPTURAR FORMULARIO BUSCAR X ID  */

let buscarPorId = document.getElementById("inpBuscarID")
let btnBuscarId = document.getElementById("btnBuscarID")
let cuadroResp2 = document.getElementsByClassName("resp2")[0]
let formulario2 = document.getElementsByClassName("formulario2")[0]



function buscar(x, y) {

    if (y !== null) {

        if (listaRegistros.length > 0) {

            let pedirId = x

            let buscador = listaRegistros.find(
                (i) => i.id === pedirId

            )

            if (buscador) {

                cuadroResp2.innerText = `Id: ${buscador.id}, Ventas: $${buscador.ventas}, Interes: $${buscador.interes}, Ganancia: $${buscador.ganancia}, Salidas: $${buscador.salidas}\nFecha de ingreso ${buscador.dia}/${buscador.mes}/${buscador.año} -- ${buscador.hora}:${buscador.minutos}:${buscador.segundos}`

            } else {
                cuadroResp2.innerText = "El registro no existe"
            }

        }
    } else {
        cuadroResp2.innerText = "El registro esta vacio"
    }
}


btnBuscarId.addEventListener("click", (event) => {

    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))
    let valorBusquedaId = parseInt(buscarPorId.value)

    buscar(valorBusquedaId, listaRegistros)

    // reseteo formulario2
    formulario2.reset()

})

/*------------------------------------------------------------------------------------ */

/*CAPTURAR FORMULARIO 3 */

let buscarRangomin = document.getElementById("buscarRangomin")
let buscarRangoMax = document.getElementById("buscarRangoMax")
let btnBuscarRango = document.getElementById("btnBuscarRango")
let cuadroResp3 = document.getElementsByClassName("resp3")[0]
let formulario3 = document.getElementsByClassName("formulario3")[0]




function buscarPorVentas(x, y, z) {


    if (z !== null) {
        if (listaRegistros.length > 0) {

            let minimo, maximo

            minimo = x
            maximo = y


            let rango = listaRegistros.filter(
                (i) => i.ventas >= minimo && i.ventas <= maximo
            )

            //copio el array rango con el nombre"copiaRango" y lo ordeno de menor a mayor segun el valor de las ventas 

            let copiaRango = rango.slice().sort((a, b) => a.ventas - b.ventas)

            // La longitud de la nueva lista "rango" segun los elementos "ventas" encontrados por el metodo FILTER. Y esta tiene que ser mayor a 0

            let cantidadEncontrada = `Se encontraron ${rango.length} Registros\n\n`

            //Se crea una nueva lista "resultado" y se la transforma concatenando texto + elementos de la misma lista
            let resultados = copiaRango.map(
                (i) => `Id: ${i.id}, Ventas: $${i.ventas}, Interés: $${i.interes}, Ganancia: $${i.ganancia}, Salidas: $${i.salidas}`
            )

            let mensaje = resultados.join("\n\n")



            let reduceVentas = rango.reduce((acumulador, i) => {
                return acumulador + i.ventas
            }, 0)

            let reduceGanancias = rango.reduce((acumulador, i) => {
                return acumulador + i.ganancia
            }, 0)

            let reduceInteres = rango.reduce((acumulador, i) => {
                return acumulador + i.interes
            }, 0)

            let reduceSalidas = rango.reduce((acumulador, i) => {
                return acumulador + i.salidas
            }, 0)

            let promedioInteres = reduceInteres / rango.length

            let contabilidadParcial = `\n\n🟡🟡Ventas-Parciales: 💲${reduceVentas}, Promedio-Interes: ${promedioInteres.toFixed(2)}% , Ganancias-parciales: 💲${reduceGanancias}, Salidas-parciales: 💲${reduceSalidas}🟡🟡`

            cuadroResp3.innerText = `${cantidadEncontrada}${mensaje}${contabilidadParcial}`

        }
    } else {
        cuadroResp3.innerText = "El registro esta vacio"
    }
}


btnBuscarRango.addEventListener("click", (event) => {

    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    let valorInpRangomin = parseInt(buscarRangomin.value)
    let valorInpRangoMax = parseInt(buscarRangoMax.value)

    buscarPorVentas(valorInpRangomin, valorInpRangoMax, listaRegistros)

    formulario3.reset()
})




/*------------------------------------------------------------------------------------ */

/*CAPTURAR FORMULARIO 4 */

let cuadroResp4 = document.getElementsByClassName("resp4")[0]
let btnRegistroCompleto= document.getElementById("btnRegistroCompleto")

function registroCompleto(x) {

    if (x !== null) {

        if (x.length > 0) {

            let iterarTodo = listaRegistros.map(
                (i) => `ID: ${i.id}, Ventas: $${i.ventas}, Interes: $${i.interes}, Ganancia: $${i.ganancia}, Salidas: $${i.salidas}\nFecha de ingreso ${i.dia}/${i.mes}/${i.año} -- ${i.hora}:${i.minutos}:${i.segundos}`
            )

            let verTodo = iterarTodo.join("\n\n")

            cuadroResp4.innerText = `${verTodo}`

        }
    } else {
        cuadroResp4.innerText = "El registro esta vacio"
    }
}

btnRegistroCompleto.addEventListener("click",(event) => {

    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    registroCompleto(listaRegistros)

})

