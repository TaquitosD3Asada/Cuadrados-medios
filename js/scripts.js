// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const btnGenerar = document.getElementById('btnGenerar');
    const inputSemilla = document.getElementById('semilla');
    const inputIteraciones = document.getElementById('iteraciones');
    const resultado = document.getElementById('resultado');

    // Función para generar números pseudoaleatorios con el algoritmo de cuadrados medios
    function cuadradosMedios(semilla, iteraciones) {
        let resultadoTexto = '';

        for (let i = 0; i < iteraciones; i++) {
            // Verificar que la semilla tenga al menos 4 dígitos
            if (semilla.toString().length < 3) {
                alert('Ingrese una semilla válida con al menos 4 dígitos.');
                document.querySelector('label[for="semilla"]').textContent = 'Semilla Inicial:';
                inputSemilla.value = '';
                inputIteraciones.value = '';
                return;
            }

            // Obtener el cuadrado de la semilla
            let cuadrado = semilla * semilla;

            // Convertir el cuadrado a una cadena de texto
            let cuadradoStr = cuadrado.toString();

            // Verificar si la longitud es impar
            if (cuadradoStr.length % 2 !== 0) {
                // Si es impar, agregar un cero a la izquierda
                cuadradoStr = '0' + cuadradoStr;
            }

            // Obtener los 4 dígitos centrales como nueva semilla utilizando la función
            let nuevaSemilla = obtenerDigitosCentrales(cuadradoStr);
            
            // Agregar el número pseudoaleatorio al resultado
            resultadoTexto += `${i + 1}: 0.${nuevaSemilla}\n`;

            // Actualizar la semilla para la próxima iteración
            semilla = parseInt(nuevaSemilla);
        }

        return resultadoTexto; // Devolver el resultado en lugar de asignarlo directamente
    }

    // Función para manejar el evento de click en el botón generar
    function generarNumeros() {
        const semilla = parseInt(inputSemilla.value);
        const iteraciones = parseInt(inputIteraciones.value);

        if (isNaN(semilla) || isNaN(iteraciones) || semilla <= 0 || iteraciones <= 0) {
            alert('El valor maximo de iteraciones es 106.');
            return;
        }

        const resultadoTexto = cuadradosMedios(semilla, iteraciones);
        resultado.textContent = resultadoTexto;
    }

    btnGenerar.addEventListener('click', generarNumeros);

    // Función para obtener los dígitos centrales de una cadena
    function obtenerDigitosCentrales(cadena) {
        // Obtener la longitud de la cadena
        let longitud = cadena.length;
    
        // Calcular los índices del primer y último dígito central
        let indiceInicio = Math.floor((longitud - 4) / 2);
        let indiceFin = Math.ceil((longitud + 4) / 2);
    
        // Extraer la subcadena con los cuatro dígitos centrales
        let centro = cadena.substr(indiceInicio, 4);
    
        return centro;
    }
});
