function buscarPaciente() {
    var id = document.getElementById("idPaciente").value.trim();
    var nombre = document.getElementById("nombrePaciente").value.trim().toLowerCase();

    if (id === "" && nombre === "") {
        document.getElementById("resultado").innerHTML = "Por favor, ingrese un ID o un nombre.";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pacientes.xml", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var xmlDoc = xhr.responseXML;
            var pacientes = xmlDoc.getElementsByTagName("paciente");
            var encontrado = false;

            for (var i = 0; i < pacientes.length; i++) {
                var pacienteID = pacientes[i].getElementsByTagName("id")[0].textContent;
                var pacienteNombre = pacientes[i].getElementsByTagName("nombre")[0].textContent.toLowerCase();

                if (pacienteID === id || pacienteNombre === nombre) {
                    var edad = pacientes[i].getElementsByTagName("edad")[0].textContent;
                    var genero = pacientes[i].getElementsByTagName("género")[0].textContent;
                    var diagnostico = pacientes[i].getElementsByTagName("diagnóstico")[0].textContent;

                    var resultadoHTML = `
                        <h3>Datos del Paciente</h3>
                        <p><strong>ID:</strong> ${pacienteID}</p>
                        <p><strong>Nombre:</strong> ${pacienteNombre}</p>
                        <p><strong>Edad:</strong> ${edad}</p>
                        <p><strong>Género:</strong> ${genero}</p>
                        <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
                    `;
                    document.getElementById("resultado").innerHTML = resultadoHTML;
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                document.getElementById("resultado").innerHTML = "Paciente no encontrado.";
            }
        } else {
            document.getElementById("resultado").innerHTML = "No se pudo cargar el archivo XML.";
        }
    };
    xhr.send();
}

function buscarMedicamento() {
    var nombreMedicamento = document.getElementById('nombreMedicamento').value.trim().toLowerCase();

    if (nombreMedicamento === "") {
        document.getElementById("resultadoMedicamento").innerHTML = "Por favor, ingrese el nombre de un medicamento.";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "medicamentos.json", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var medicamentosData = JSON.parse(xhr.responseText);
            var medicamentos = medicamentosData.medicamentos;
            var encontrado = false;

            for (var i = 0; i < medicamentos.length; i++) {
                var medicamentoNombre = medicamentos[i].nombre.toLowerCase();

                if (medicamentoNombre === nombreMedicamento) {
                    var descripcion = medicamentos[i].indicaciones;
                    var dosis = medicamentos[i].dosis;
                    var presentacion = medicamentos[i].presentación;

                    var resultadoHTML = `
                        <h3>Datos del Medicamento</h3>
                        <p><strong>Nombre:</strong> ${medicamentos[i].nombre}</p>
                        <p><strong>Descripción:</strong> ${descripcion}</p>
                        <p><strong>Dosis:</strong> ${dosis}</p>
                        <p><strong>Presentación:</strong> ${presentacion}</p>
                    `;
                    document.getElementById("resultadoMedicamento").innerHTML = resultadoHTML;
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                document.getElementById("resultadoMedicamento").innerHTML = "Medicamento no encontrado.";
            }
        } else {
            document.getElementById("resultadoMedicamento").innerHTML = "No se pudo cargar el archivo JSON.";
        }
    };
    xhr.send();
}
