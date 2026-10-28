const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    let arrayEstudiante = new Array();
    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
    let contador = 1;

    if (totalEstudiantes <= 0 || isNaN(totalEstudiantes) || totalEstudiantes % 1 != 0) {
        alert("Debe ingresar una cantidad entera positiva de estudiantes");
        return;
    }

    let estudiante, calificacion, convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
        if (estudiante == null) return;

        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`);
            if (calificacion == null) return;
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion).toFixed(2)
        );
        contador++;
    }

    let calificacionAlta = 0, promedio = 0;
    let posicion = arrayEstudiante[0];
    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];
        // textContent conserva el nombre como texto al construir el listado.
        let texto = document.createElement("span");
        texto.textContent = nombre;
        listado += `<li><b>Nombre:</b> ${texto.innerHTML} - <b>Calificación:</b> ${nota}</li>`;

        if (parseFloat(nota) > calificacionAlta) {
            calificacionAlta = parseFloat(nota);
            posicion = indice;
        }
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    let mejorNombre = document.createElement("span");
    mejorNombre.textContent = posicion[0];
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}`;
    listado += `<br><b>Estudiante con mejor calificación:</b> ${mejorNombre.innerHTML}</p>`;
    containerEstudiantes.innerHTML = listado;
}
