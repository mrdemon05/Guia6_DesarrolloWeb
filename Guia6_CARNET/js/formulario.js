// Parte II, ejemplo 4: elementos del expediente médico.
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");
const idModal = document.getElementById("idModal");

let arrayPaciente = [];
let arrayPaisesNuevos = [];
let indiceEdicion = -1;

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    toast.show();
}

function textoSeguro(valor) {
    let elemento = document.createElement("span");
    elemento.textContent = valor;
    return elemento.innerHTML;
}

// Complementario 2: convertir el arreglo a texto para guardarlo.
function guardarPacientes() {
    localStorage.setItem("guia6_pacientes", JSON.stringify(arrayPaciente));
}

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    indiceEdicion = -1;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar Datos';
    inputNombre.focus();
};

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true ? "Mujer" : "";
    let pais = cmbPais.value;
    let direccion = inputDireccion.value;

    if (nombre != "" && apellido != "" && fechaNacimiento != "" &&
        sexo != "" && pais != 0 && direccion != "") {
        let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
        let paciente = new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion);

        // Complementario 1: actualizar la fila seleccionada o registrar una nueva.
        if (indiceEdicion == -1) {
            arrayPaciente.push(paciente);
            mostrarMensaje("Se ha registrado un nuevo paciente");
        } else {
            arrayPaciente[indiceEdicion] = paciente;
            mostrarMensaje("Se han actualizado los datos del paciente");
        }
        guardarPacientes();
        limpiarForm();
        imprimirPacientes();
    } else {
        mostrarMensaje("Faltan campos por completar");
    }
};

function imprimirFilas() {
    let fila = "";
    let contador = 1;
    arrayPaciente.forEach((element) => {
        fila += `<tr>
            <td class="text-center fw-bold">${contador}</td>
            <td>${textoSeguro(element[0])}</td>
            <td>${textoSeguro(element[1])}</td>
            <td>${textoSeguro(element[2])}</td>
            <td>${textoSeguro(element[3])}</td>
            <td>${textoSeguro(element[4])}</td>
            <td>${textoSeguro(element[5])}</td>
            <td>
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary"
                    aria-label="Editar paciente ${contador}" onclick="editarPaciente(${contador - 1})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger"
                    aria-label="Eliminar paciente ${contador}" onclick="eliminarPaciente(${contador - 1})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return fila;
}

const imprimirPacientes = () => {
    if (arrayPaciente.length == 0) {
        document.getElementById("idTablaPacientes").textContent = "Ninguno";
        return;
    }
    let table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead><tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:5%">Sexo</th>
                <th scope="col" class="text-center" style="width:15%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr></thead>
            <tbody>${imprimirFilas()}</tbody>
        </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = table;
};

// Complementario 1: cargar los datos de una fila en el formulario.
function editarPaciente(indice) {
    if (indice < 0 || indice >= arrayPaciente.length) return;
    let paciente = arrayPaciente[indice];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    inputRdMasculino.checked = paciente[3] == "Hombre";
    inputRdFemenino.checked = paciente[3] == "Mujer";
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text == paciente[4]) {
            cmbPais.value = cmbPais.options[i].value;
        }
    }
    inputDireccion.value = paciente[5];
    indiceEdicion = indice;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-pencil-square"></i> Guardar cambios';
    inputNombre.focus();
}

// Complementario 1: reconstruir el arreglo sin el paciente seleccionado.
function eliminarPaciente(indice) {
    if (indice < 0 || indice >= arrayPaciente.length) return;
    if (confirm("¿Desea eliminar este paciente?")) {
        let pacientesRestantes = [];
        for (let i = 0; i < arrayPaciente.length; i++) {
            if (i != indice) pacientesRestantes.push(arrayPaciente[i]);
        }
        arrayPaciente = pacientesRestantes;
        guardarPacientes();
        limpiarForm();
        imprimirPacientes();
        mostrarMensaje("Se ha eliminado el paciente");
    }
}

function agregarOpcionPais(nombre) {
    let option = document.createElement("option");
    option.textContent = nombre;
    option.value = cmbPais.children.length;
    cmbPais.appendChild(option);
}

const addPais = () => {
    let paisNew = inputNombrePais.value;
    if (paisNew == "") {
        mostrarMensaje("Faltan campos por completar");
        return;
    }
    for (let i = 1; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text.toUpperCase() == paisNew.toUpperCase()) {
            mostrarMensaje("El país ya se encuentra registrado");
            return;
        }
    }
    agregarOpcionPais(paisNew);
    arrayPaisesNuevos.push(paisNew);
    // Conserva los países nuevos para poder editar sus pacientes al recargar.
    localStorage.setItem("guia6_paises", JSON.stringify(arrayPaisesNuevos));
    mostrarMensaje("País agregado correctamente");
};

buttonLimpiarPaciente.onclick = () => limpiarForm();
buttonAgregarPaciente.onclick = () => addPaciente();
buttonMostrarPaciente.onclick = () => imprimirPacientes();
buttonAgregarPais.onclick = () => addPais();
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Complementario 2: recuperar los arreglos almacenados al abrir la página.
let pacientesGuardados = localStorage.getItem("guia6_pacientes");
if (pacientesGuardados != null) arrayPaciente = JSON.parse(pacientesGuardados);
let paisesGuardados = localStorage.getItem("guia6_paises");
if (paisesGuardados != null) {
    arrayPaisesNuevos = JSON.parse(paisesGuardados);
    for (let pais of arrayPaisesNuevos) agregarOpcionPais(pais);
}
limpiarForm();
imprimirPacientes();
