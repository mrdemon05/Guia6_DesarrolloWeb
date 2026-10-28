const campo = document.getElementById("idTxtNumero");
const validarNumero = function (e) {
    let validar = /^[0-9]{1}$/;
    let tecla = e.key;
    if (!validar.test(tecla)) e.preventDefault();
};
campo.addEventListener("keypress", validarNumero);

const boton = document.getElementById("idBtnCalcular");

function calcularFactorial(numero) {
    return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

const imprimir = (numero, resultado) => {
    const contenedor = document.getElementById("idDivResultado");
    contenedor.innerHTML = `El factorial de ${numero}! es ${resultado}`;
};

function calcular() {
    let numero = document.getElementById("idTxtNumero").value;
    // También valida el texto pegado. Hasta 170 el resultado es finito.
    if (/^[0-9]+$/.test(numero) && numero <= 170) {
        let resultado = calcularFactorial(numero);
        imprimir(numero, resultado);
    } else {
        alert("Debe ingresar un número entero entre 0 y 170");
    }
}
boton.addEventListener("click", calcular);
