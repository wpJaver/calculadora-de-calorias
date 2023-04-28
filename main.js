const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();

  calcularCalorias();
});

function grupoPoblacional(edad) {
  if (edad >= 15 && edad <= 29) return "Joven";
  else if (edad >= 30 && edad <= 59) return "Adultos";
  else return "Adultos mayores";
}

function calcularCalorias() {
  aparecerResultado();
  const nombre = document.querySelector("#nombre");
  const tipo_documento = document.querySelector("#tipo-documento");
  const numero_documento = document.querySelector("#numero-documento");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const genero = document.querySelector('input[name="genero"]:checked');
  const actividad = document.querySelector("#actividad").value;
  // const totalCalorias = document.querySelector('#total-calorias');

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  if (!(edad.value && peso.value && altura.value)) {
    mostrarMensajeDeError("Por favor asegúrese de llenar todos los campos");
    return;
  } else if (edad.value < 15 || edad.value > 80) {
    mostrarMensajeDeError("La edad ingresada no es permitida");
    return;
  }

  let calculoCalorias;

  if (genero.id === "masculino") {
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    calculoCalorias =
      actividad *
      (multiplicadorTMB.peso * peso.value +
        multiplicadorTMB.altura * altura.value -
        multiplicadorTMB.edad * edad.value +
        5);
  } else {
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    calculoCalorias =
      actividad *
      (multiplicadorTMB.peso * peso.value +
        multiplicadorTMB.altura * altura.value -
        multiplicadorTMB.edad * edad.value -
        161);
  }

  // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

  resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo" >
            <h5 class="card-title h2 mb-3">Calorías requeridas</h5>
            <div class="w-100">
            <p style="">El paciente ${nombre.value} identificado con ${
    tipo_documento.value
  } NO.${
    numero_documento.value
  }, requiere un total de <b style="color:#dc3545;font-size:20px">${Math.floor(
    calculoCalorias
  )} kcal</b> para el sostenimiento de su TBM</p>
  </div>
  <h5 class="card-title h2">Grupo poblacional</h5>
  <p style="color:#dc3545;font-weight:bold;font-size:20px">${grupoPoblacional(
    edad.value
  )}</p>  
        </div>
    `;
  //     "El paciente (nombre del paciente) identificado con (tipo de documento)
  // NO.(número de documento), requiere un total de (cantidad calorías) kcal
  // para el sostenimiento de su TBM"

  // Volver a limpiar variables
  nombre.value = null;
  peso.value = null;
  altura.value = null;
  edad.value = null;
  actividad.value = null;
  numero_documento.value = null;
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
