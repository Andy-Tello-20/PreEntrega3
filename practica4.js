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




let listaRegistros = []


function registrar(x, y, z) {


    let contador

    if (localStorage.getItem("registros")) {   //SI EXISTE PASA LO SIG.

        listaRegistros = JSON.parse(localStorage.getItem("registros"))

        let long = listaRegistros.length

        let ultimoID = listaRegistros[long - 1].id

        contador = ultimoID

        //console.log(long) Longitud de "listaRegistros en LocalStorage"


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
let btnRegistroCompleto = document.getElementById("btnRegistroCompleto")

function registroCompleto(x) {

    if (x !== null) {

        if (x.length > 0) {

            let iterarTodo = x.map(
                (i) => `ID: ${i.id}, Ventas: $${i.ventas}, Interes: $${i.interes}, Ganancia: $${i.ganancia}, Salidas: $${i.salidas}\nFecha de ingreso ${i.dia}/${i.mes}/${i.año} -- ${i.hora}:${i.minutos}:${i.segundos}`
            )

            let verTodo = iterarTodo.join("\n\n")

            cuadroResp4.innerText = `${verTodo}`

        }
    } else {
        cuadroResp4.innerText = "El registro esta vacio"
    }
}

btnRegistroCompleto.addEventListener("click", (event) => {

    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    registroCompleto(listaRegistros)

})


/*-------------------------------------------------------------------------------------------------------------- */

/* CAPTURANDO FORMULARIO 5 */

let formulario5 = document.getElementsByClassName("formulario5")[0]
let btnResumen = document.getElementById("verResumen")
let cuadroResp5 = document.getElementsByClassName("resp5")[0]




function resumenContabilidad(x) {

    if (x !== null) {

        if (listaRegistros.length > 0) {

            let rango = listaRegistros.filter(
                (i) => i.ventas > 0 && i.ventas <= Infinity
            )

            /*let contTotal = listaRegistros.map(
                (i) => `Id: ${i.id}, Ventas: $${i.ventas}, Interés: $${i.interes}, Ganancia: $${i.ganancia}, Salidas: $${i.salidas}`
            )
 
            let mensaje = contTotal.join("\n\n")*/

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

            let contabilidadTotal = `\n\n🟢🟡Ventas-Totales:💲 ${reduceVentas}, Promedio-Interes: ${promedioInteres.toFixed(2)}% , Ganancias-Totales:💲 ${reduceGanancias.toFixed(2)}, Salidas-Totales:💲 ${reduceSalidas} 🟢🟡`

            let resumen

            if (reduceGanancias == reduceSalidas) {
                resumen = "Estás obteniendo un equilibrio entre los ingresos generados y los gastos incurridos en tu negocio"
            } else if (reduceGanancias < reduceSalidas) {
                resumen = "Estás incurriendo en pérdidas, tu negocio no está generando suficientes ingresos para cubrir los costos o gastos"
            } else {
                let porcentajeRentabilidad = ((reduceGanancias - reduceSalidas) / reduceSalidas) * 100

                resumen = `Estás obteniendo un rendimiento positivo del ${porcentajeRentabilidad.toFixed(2)}% en tu negocio, lo cual es deseable y demuestra que tu actividad comercial es rentable.`
            }

            cuadroResp5.innerText = `${contabilidadTotal}\n\n${resumen}`

        }
    } else {
        alert("El registro esta vacio")
    }
}


btnResumen.addEventListener("click", (event) => {
    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    resumenContabilidad(listaRegistros)

})


/*-------------------------------------------------------------------------------------------------------------- */

/* CAPTURANDO FORMULARIO 6 */

let formulario6 = document.getElementsByClassName("formulario6")[0]
let inpBorrarId = document.getElementById("idABorrar")
let btnBorrarRegistro = document.getElementById("borrarRegistro")
let cuadroResp6 = document.getElementsByClassName("resp6")[0]


function borrarRegistro(x, y) {

    if (x !== null) {

        if (x.length > 0) {

            
            //obtengo el objeto.ID
            let obtenerId = x.find(
                (i) => i.id == y
            )

            if (obtenerId) {
                function confirmar() {

                    let confirmarBorrado = confirm(`está seguro de borrar el registro Id: ${obtenerId.id}, Ventas: $${obtenerId.ventas}, Interes: $${obtenerId.interes}, Ganancias: $${obtenerId.ganancia}, Salidas: $${obtenerId.salidas} `)

                    if (confirmarBorrado) {

                        //Busco indice en la listaRegistros a traves del ID

                        let indice = x.indexOf(obtenerId)

                        //Borro registro en "listaRegistro" segun indice 

                        x.splice(indice, 1)

                        localStorage.setItem("registros", JSON.stringify(x))

                        cuadroResp6.innerText=`El registro con ID: ${obtenerId.id}, ha sido eliminado`

                    } else {
                        cuadroResp6.innerText="Operacion cancelada"
                    }

                }
                confirmar()

            } else {
                cuadroResp6.innerText="El ID ingresado no existe"
            }
        }

    } else {
        cuadroResp6.innerText="El registro esta vacio"
    }
}

btnBorrarRegistro.addEventListener("click", (event) => {
    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    let valorInpBorrar = parseInt(inpBorrarId.value)

    borrarRegistro(listaRegistros, valorInpBorrar)

    formulario6.reset()
})
