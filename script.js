// JQUERY PARA EL MENÚ
$(document).ready(function() {
    $("#botonHamburguesa").click(function() {
        $("#menuDesplegable").slideToggle(); 
    });
});

// VARIABLES
let saldo = 10000;
let historial = ["Inicio: +$10000"];

// NAVEGACIÓN
function cambiarPantalla(pantalla) {
    console.log("Cambiando a " + pantalla);

    document.getElementById('vista-login').classList.add('oculto');
    document.getElementById('vista-menu').classList.add('oculto');
    document.getElementById('vista-depositar').classList.add('oculto');
    document.getElementById('vista-enviar').classList.add('oculto');
    document.getElementById('vista-movimientos').classList.add('oculto');

    document.getElementById(pantalla).classList.remove('oculto');
    
    const nav = document.getElementById('barra-navegacion');
    if (pantalla === 'vista-login') {
        nav.classList.add('oculto');
    } else {
        nav.classList.remove('oculto');
        if ($(window).width() < 992) {
            $("#menuDesplegable").slideUp();
        }
    }
    
    document.getElementById('saldoPantalla').innerText = saldo;
}

// LOGIN
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    var correo = document.getElementById('inputEmail').value;
    var pass = document.getElementById('inputPass').value;

    if (correo === 'palta@mayo.cl' && pass === 'Palta123') {
        cambiarPantalla('vista-menu');
    } else {
        alert('Error. Datos incorrectos');
    }
});

// DEPOSITAR
function funcionDepositar() {
    let monto = parseFloat(document.getElementById('montoDeposito').value);
    
    if (monto > 0) {
        saldo += monto;
        historial.push("Depósito: +$" + monto);
        alert("Deposito realizado");
        document.getElementById('montoDeposito').value = "";
        cambiarPantalla('vista-menu');
    } else {
        alert("Monto inválido");
    }
}

// ENVIAR
function funcionEnviar() {
    let monto = parseFloat(document.getElementById('montoEnvio').value);
    let contacto = document.getElementById('selectorContactos').value;


    if (monto > saldo) {
        alert("No tienes platita suficiente");
    } else {
        saldo -= monto;
        historial.push("Envío a " + contacto + ": -$" + monto);
        
        alert("Transferencia realizada exisotamente.");
        
        document.getElementById('montoEnvio').value = "";
        cambiarPantalla('vista-menu');
    }
}

// CARGAR MOVIMIENTOS
document.querySelector("button[onclick=\"cambiarPantalla('vista-movimientos')\"]").onclick = function() {
    let lista = document.getElementById('listaMovimientos');
    lista.innerHTML = "";
    
    historial.forEach(function(item) {
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = item;
        lista.appendChild(li);
    });
    
    cambiarPantalla('vista-movimientos');
};

// SALIR
function cerrarSesion() {
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputPass').value = "";
    cambiarPantalla('vista-login');
}