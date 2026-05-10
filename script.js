function obtenerNota(id) {

    let input =
        document.getElementById(id);

    let valor =
        parseFloat(input.value);

    // VACÍO
    if (input.value === "") {

        input.style.border =
            "1px solid #ccc";

        return null;
    }

    // VALIDAR RANGO
    if (valor < 0 || valor > 5) {

        input.style.border =
            "2px solid red";

        return "error";
    }

    // CORRECTO
    input.style.border =
        "2px solid green";

    return valor;
}

function calcularNota() {

    let resultado =
        document.getElementById("resultado");

    let acumulado = 0;

    let porcentajeRestante = 1;

    let error = false;

    // ACTIVIDADES
    let actividades = [

        "u1i", "u1c", "u1a", "u1e",

        "u2i", "u2c", "u2a", "u2e",

        "u3i", "u3c", "u3a", "u3e",

        "u4i", "u4c", "u4a", "u4e"
    ];

    // CADA ACTIVIDAD VALE 1.875%
    let pesoActividad =
        0.30 / 16;

    actividades.forEach(id => {

        let nota =
            obtenerNota(id);

        if (nota === "error") {

            error = true;

            return;
        }

        if (nota !== null) {

            acumulado +=
                nota * pesoActividad;

            porcentajeRestante -=
                pesoActividad;
        }
    });

    // DOCUMENTO TCC
    let documento =
        obtenerNota("documento");

    if (documento === "error") {

        error = true;

    } else if (documento !== null) {

        acumulado +=
            documento * 0.15;

        porcentajeRestante -= 0.15;
    }

    // SUSTENTACIÓN
    let sustentacion =
        obtenerNota("sustentacion");

    if (sustentacion === "error") {

        error = true;

    } else if (sustentacion !== null) {

        acumulado +=
            sustentacion * 0.15;

        porcentajeRestante -= 0.15;
    }

    // PARCIAL FINAL
    let parcial =
        obtenerNota("parcial");

    if (parcial === "error") {

        error = true;

    } else if (parcial !== null) {

        acumulado +=
            parcial * 0.40;

        porcentajeRestante -= 0.40;
    }

    // SI HAY ERROR
    if (error) {

        resultado.innerHTML =

            `
            <h2 style="color:red;">
            ⚠️ Error
            </h2>

            <p>
            Las notas deben estar entre 0 y 5.
            </p>
            `;

        return;
    }

    // META
    let meta = 3.0;

    // CUÁNTO FALTA
    let faltante =
        meta - acumulado;

    // NOTA NECESARIA
    let notaNecesaria = 0;

    if (porcentajeRestante > 0) {

        notaNecesaria =
            faltante / porcentajeRestante;
    }

    // AJUSTE
    if (notaNecesaria < 0) {

        notaNecesaria = 0;
    }

    // MENSAJES
    let mensaje = "";

    if (notaNecesaria <= 3) {

        mensaje =
            "✅ Vas muy bien académicamente.";

    }

    else if (notaNecesaria <= 4) {

        mensaje =
            "⚠️ Debes mantener buenas notas para aprobar.";

    }

    else if (notaNecesaria <= 5) {

        mensaje =
            "❌ Necesitas notas muy altas para recuperar.";

    }

    else {

        mensaje =
            "🚨 Aunque saques 5.0 en todo, sería muy difícil aprobar.";
    }

    // MOSTRAR RESULTADO
    resultado.innerHTML =

        `
        <h2>Predicción Académica</h2>

        <p>
        <strong>Acumulado actual:</strong>
        ${acumulado.toFixed(2)}
        </p>

        <p>
        <strong>Nota mínima necesaria en lo restante:</strong>
        ${notaNecesaria.toFixed(2)}
        </p>

        <p>${mensaje}</p>
        `;
}

// TIEMPO REAL
document.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", calcularNota);
});

// INICIAR
calcularNota();