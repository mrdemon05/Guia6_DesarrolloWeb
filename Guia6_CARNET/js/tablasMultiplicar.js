const containerResultado = document.querySelector("#idContainerResultado");
const btnCalcular = document.querySelector("#idBtnCalcular");
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    const inputTabla = document.querySelector("#inputTabla").value;
    let contador = 1;

    if (inputTabla > 0 && inputTabla % 1 == 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;
        // La guía utiliza do...while para generar las doce multiplicaciones.
        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 colum"><h3>${contador}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>x</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${inputTabla}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>=</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${resultado}</h3></div>`;
            tabla += `</div>`;
            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("Debe ingresar un número entero positivo");
    }
}
