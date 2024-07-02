document.addEventListener('DOMContentLoaded', () => {
    // Ejecuta el código una vez que el DOM esté completamente cargado y analizado

    const radios = document.querySelectorAll('input[type="radio"]');
    // Selecciona todos los elementos input de tipo radio

    radios.forEach(radio => {
        // Itera sobre cada elemento radio

        radio.addEventListener('click', function () {
            // Añade un evento click a cada elemento radio

            if (this.checked) {
                // Si el radio está seleccionado

                if (this.dataset.wasChecked) {
                    // Si el dataset wasChecked existe

                    this.checked = false;
                    // Deselecciona el radio

                    delete this.dataset.wasChecked;
                    // Elimina el dataset wasChecked

                } else {
                    // Si el dataset wasChecked no existe

                    this.dataset.wasChecked = true;
                    // Añade el dataset wasChecked
                }
            } else {
                // Si el radio no está seleccionado

                delete this.dataset.wasChecked;
                // Elimina el dataset wasChecked
            }
        });

        // Cambio de color de las etiquetas de estrellas
        radio.addEventListener('click', function () {
            // Añade un evento click a cada elemento radio

            const rating = this.value;
            // Obtiene el valor del radio seleccionado

            const labels = this.parentNode.querySelectorAll('label');
            // Selecciona todas las etiquetas dentro del padre del radio

            labels.forEach((label, index) => {
                // Itera sobre cada etiqueta

                label.style.color = index < rating ? '#f5b301' : '#ccc';
                // Cambia el color de la etiqueta a dorado si el índice es menor que el valor seleccionado, de lo contrario, a gris
            });
        });
    });

    const stars = document.querySelectorAll('.estrellas-rating input');
    // Selecciona todos los elementos input dentro del contenedor .estrellas-rating

    stars.forEach(star => {
        // Itera sobre cada estrella

        star.addEventListener('change', () => {
            // Añade un evento change a cada estrella

            const selectedValue = star.value;
            // Obtiene el valor seleccionado de la estrella

            stars.forEach((s, index) => {
                // Itera sobre todas las estrellas nuevamente

                if (index < selectedValue) {
                    // Si el índice es menor que el valor seleccionado

                    s.nextElementSibling.style.color = '#f5b301'; // Gold color
                    // Cambia el color del siguiente elemento (etiqueta) a dorado

                } else {
                    // Si el índice es mayor o igual que el valor seleccionado

                    s.nextElementSibling.style.color = '#ccc'; // Default color
                    // Cambia el color del siguiente elemento (etiqueta) al color por defecto (gris)
                }
            });
        });
    });

    // Llamar a la función para mostrar la fecha y hora actual
    displayDateTime();
});

// Función para mostrar la fecha y hora actual (solo horas y minutos)
function displayDateTime() {
    const now = new Date();
    // Obtiene la fecha y hora actual

    const dateString = now.toLocaleDateString();
    // Obtiene la fecha en formato de cadena

    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Obtiene la hora en formato de cadena con horas y minutos

    const dateTimeString = `${dateString} ${timeString}`;
    // Combina la fecha y la hora en una sola cadena

    document.getElementById('dateTime').textContent = dateTimeString;
    // Establece el contenido de texto del elemento con id 'dateTime' a la cadena de fecha y hora
}

// Función para compartir el archivo de texto a través de WhatsApp
function shareOnWhatsApp() {
    const now = new Date();
    // Obtiene la fecha y hora actual

    const formattedDateTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Formatea la fecha y hora en una cadena

    const operario = document.getElementById('operario').value;
    // Obtiene el valor del input con id 'operario'

    const apartamento = document.getElementById('apartamento').value;
    // Obtiene el valor del input con id 'apartamento'

    const estrellas = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : 'No';
    // Obtiene el valor del input seleccionado con el nombre 'rating', o 'No' si no hay ninguno seleccionado

    const observaciones = document.getElementById('observaciones').value;
    // Obtiene el valor del textarea con id 'observaciones'

    const titulo = document.querySelector('h2').textContent;
    // Obtiene el texto del primer elemento h2

    let textContent = `${titulo}\n${formattedDateTime}\nOperario: ${operario}\nApartamento: ${apartamento}\nNivel de suciedad: ${estrellas}\n\nProductos:\n`;
    // Crea una cadena de texto con el título, la fecha y hora, el operario, el apartamento y el nivel de suciedad

    const rows = document.querySelectorAll('tbody tr');
    // Selecciona todas las filas dentro del tbody

    rows.forEach(row => {
        // Itera sobre cada fila

        const product = row.querySelector('td:first-child').textContent;
        // Obtiene el texto del primer td de la fila (el nombre del producto)

        const checkedField = row.querySelector('input[type="radio"]:checked');
        // Selecciona el input de tipo radio seleccionado en la fila

        let value = 'No';
        // Inicializa el valor como 'No'

        if (checkedField) {
            // Si hay un input de tipo radio seleccionado

            value = checkedField.closest('table').querySelector(`th:nth-child(${checkedField.parentElement.cellIndex + 1})`).textContent;
            // Obtiene el texto del encabezado de la columna correspondiente al input seleccionado
        }

        textContent += `${product}: ${value}\n`;
        // Añade el producto y su valor a la cadena de texto
    });

    textContent += `\nObservaciones:\n${observaciones}`;
    // Añade las observaciones a la cadena de texto

    const encodedText = encodeURIComponent(textContent);
    // Codifica la cadena de texto para incluirla en una URL

    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    // Crea la URL de WhatsApp con el texto codificado

    window.open(whatsappUrl, '_blank');
    // Abre la URL de WhatsApp en una nueva pestaña
}

// Llamar a la función para mostrar la fecha y hora actual cuando se carga la página
window.onload = displayDateTime;
