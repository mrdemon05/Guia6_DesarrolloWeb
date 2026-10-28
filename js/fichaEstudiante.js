// Complementario 3: expresiones regulares para la ficha de un estudiante.
const inputCarnet = document.getElementById("idCarnetEstudiante");
const inputNombre = document.getElementById("idNombreEstudiante");
const inputDui = document.getElementById("idDuiEstudiante");
const inputNit = document.getElementById("idNitEstudiante");
const inputFecha = document.getElementById("idFechaEstudiante");
const inputCorreo = document.getElementById("idCorreoEstudiante");
const inputEdad = document.getElementById("idEdadEstudiante");
const resultado = document.getElementById("idResultadoValidacion");

const patronCarnet = /^[A-Za-z]{2}[0-9]{3}$/;
const patronNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+( [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const patronDui = /^[0-9]{8}-[0-9]$/;
const patronNit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/;
const patronFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
const patronCorreo = /^[A-Za-z0-9_%+-]+(\.[A-Za-z0-9_%+-]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
const patronEdad = /^[0-9]+$/;

function fechaValida(fecha) {
    if (!patronFecha.test(fecha)) return false;

    // Después de comprobar el formato, se valida el día con arreglos y condicionales.
    let dia = parseInt(fecha[0] + fecha[1]);
    let mes = parseInt(fecha[3] + fecha[4]);
    let anio = parseInt(fecha[6] + fecha[7] + fecha[8] + fecha[9]);
    if (anio == 0) return false;
    let diasMes = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0) {
        diasMes[1] = 29;
    }
    return dia <= diasMes[mes - 1];
}

function mostrarError(texto, campo) {
    resultado.className = "p-3 text-danger fw-bold";
    resultado.textContent = texto;
    campo.focus();
}

const validarFicha = function () {
    if (!patronCarnet.test(inputCarnet.value)) {
        mostrarError("El carnet debe tener dos letras y tres números. Ejemplo: AB001.", inputCarnet);
        return;
    }
    if (!patronNombre.test(inputNombre.value)) {
        mostrarError("El nombre debe contener únicamente letras y espacios entre palabras.", inputNombre);
        return;
    }
    if (!patronDui.test(inputDui.value)) {
        mostrarError("El DUI debe tener el formato 12345678-9.", inputDui);
        return;
    }
    if (!patronNit.test(inputNit.value)) {
        mostrarError("El NIT debe tener el formato 0614-010101-001-1.", inputNit);
        return;
    }
    if (!fechaValida(inputFecha.value)) {
        mostrarError("Ingrese una fecha válida en formato dd/mm/aaaa.", inputFecha);
        return;
    }
    if (!patronCorreo.test(inputCorreo.value)) {
        mostrarError("Ingrese un correo con el formato nombre@dominio.com.", inputCorreo);
        return;
    }
    if (!patronEdad.test(inputEdad.value)) {
        mostrarError("La edad debe contener únicamente números enteros, sin signos ni decimales.", inputEdad);
        return;
    }
    resultado.className = "p-3 text-success fw-bold";
    resultado.textContent = "Ficha validada: los siete campos tienen formatos válidos.";
};

const limpiarFicha = () => {
    let campos = new Array(inputCarnet, inputNombre, inputDui, inputNit, inputFecha, inputCorreo, inputEdad);
    for (let campo of campos) campo.value = "";
    resultado.textContent = "";
    inputCarnet.focus();
};

document.getElementById("idBtnValidarEstudiante").addEventListener("click", validarFicha);
document.getElementById("idBtnLimpiarEstudiante").addEventListener("click", limpiarFicha);
