const generarFila = (tipo, fila, columnas) => {
    let tr = "<tr>";
    for (let c = 0; c <= columnas; c++) {
        if (tipo == 1) {
            if (c == 0) {
                tr += '<th scope="col" class="text-center">#</th>';
            } else {
                tr += `<th scope="col" class="text-center">Título ${c}</th>`;
            }
        } else {
            if (c == 0) {
                tr += `<td class="text-center fw-bold text-success">Fila ${fila}</td>`;
            } else {
                tr += `<td class="text-center">Celda ${fila},${c}</td>`;
            }
        }
    }
    return (tr += "</tr>");
};

const generarTabla = (filas, columnas) => {
    let tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">`;
    for (let i = 0; i <= filas; i++) {
        if (i == 0) {
            tabla += generarFila(1, i, columnas);
        } else {
            tabla += generarFila(2, i, columnas);
        }
    }
    tabla += "</table></div>";
    return tabla;
};

// El botón de la guía llama a esta función desde onclick.
const crearTabla = function () {
    let columnas = document.getElementById("idNumColumnas").value;
    let filas = document.getElementById("idNumFila").value;
    if (columnas > 0 && filas > 0 && columnas % 1 == 0 && filas % 1 == 0) {
        const contenedor = document.getElementById("idDivResultado");
        contenedor.innerHTML = generarTabla(filas, columnas);
    } else {
        alert("Debe ingresar números enteros positivos para las filas y columnas");
    }
};
