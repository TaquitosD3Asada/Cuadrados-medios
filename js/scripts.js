document.addEventListener('DOMContentLoaded', function () {
    const btnGenerar = document.getElementById('btnGenerar');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const inputSemilla1 = document.getElementById('semilla1');
    const inputSemilla2 = document.getElementById('semilla2');
    const inputIteraciones = document.getElementById('iteraciones');
    const resultado = document.getElementById('resultado');

    function productosMedios(semilla1, semilla2, iteraciones) {
        let resultadoTexto = '';

        for (let i = 0; i < iteraciones; i++) {
            if (semilla1.toString().length < 3 || semilla2.toString().length < 3) {
                alert('Ingrese semillas válidas con al menos 4 dígitos.');
                inputSemilla1.value = '';
                inputSemilla2.value = '';
                inputIteraciones.value = '';
                return;
            }

            let producto = semilla1 * semilla2;
            let productoStr = producto.toString();

            if (productoStr.length % 2 !== 0) {
                productoStr = '0' + productoStr;
            }

            let nuevaSemilla = obtenerDigitosCentrales(productoStr);
            resultadoTexto += `R${i + 1}: 0.${nuevaSemilla}\n`;

            semilla1 = semilla2;
            semilla2 = parseInt(nuevaSemilla);
        }

        return resultadoTexto;
    }

    function generarNumeros() {
        const semilla1 = parseInt(inputSemilla1.value);
        const semilla2 = parseInt(inputSemilla2.value);
        const iteraciones = parseInt(inputIteraciones.value);

        if (isNaN(semilla1) || isNaN(semilla2) || isNaN(iteraciones) || semilla1 <= 0 || semilla2 <= 0 || iteraciones <= 0) {
            alert('Ingrese valores válidos para las semillas (mayor o igual a 4) e iteraciones (mayor a 0).');
            return;
        }

        const resultadoTexto = productosMedios(semilla1, semilla2, iteraciones);
        resultado.textContent = resultadoTexto;
    }

    btnGenerar.addEventListener('click', generarNumeros);
    
    function reiniciarDatos() {
        inputSemilla1.value = ''; // Limpiar el valor del input de la primera semilla
        inputSemilla2.value = ''; // Limpiar el valor del input de la segunda semilla
        inputIteraciones.value = ''; // Limpiar el valor del input de las iteraciones
        resultado.textContent = ''; // Limpiar el contenido del resultado
    }

    btnReiniciar.addEventListener('click', reiniciarDatos);
    
    function obtenerDigitosCentrales(cadena) {
        let longitud = cadena.length;
        let indiceInicio = Math.floor((longitud - 4) / 2);
        let indiceFin = Math.ceil((longitud + 4) / 2);
        let centro = cadena.substr(indiceInicio, 4);

        return centro;
    }
});
