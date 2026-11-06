// validaciones del formulario e impresion por consola
let tareas = [
    {
        nombre: "Rediseño de interfaz de usuario",
        descripcion: "Actualizar los componentes visuales del dashboard principal según la nueva guía de estilos.",
        fecha: "2026-10-15",
        categoria: "Urgente",
        completada: false
    },
    {
        nombre: "Integración de API REST",
        descripcion: "Configurar los endpoints de autenticación y consumo de datos con tokens seguros de acceso.",
        fecha: "2026-10-16",
        categoria: "Estudio",
        completada: false
    },
    {
        nombre: "Optimización de consultas",
        descripcion: "Revisar peticiones lentas en la base de datos y optimizar la carga para mejorar tiempos de respuesta.",
        fecha: "2026-10-18",
        categoria: "Urgente",
        completada: false
    }
];

const formularioNuevaTarea = document.querySelector("#newTaskForm");
const alertaError = document.querySelector("#alertError");
const contenedorTareas = document.querySelector("#taskContainer");

function validacionFormularioInput(data) {
    if (!data.nombre.trim() || !data.descripcion.trim() || !data.fecha.trim() || !data.categoria.trim()) {
        return false;
    }
    return true;
}

formularioNuevaTarea.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreInput = document.querySelector("#newTaskNameInput");
    const descripcionInput = document.querySelector("#newTaskDescInput");
    const fechaInput = document.querySelector("#newTaskDateInput");
    const categoriaInput = document.querySelector("#newTaskCategoryInput");

    const datosTarea = {
        nombre: nombreInput.value,
        descripcion: descripcionInput.value,
        fecha: fechaInput.value,
        categoria: categoriaInput.value,
        completada: false
    };

    const esValido = validacionFormularioInput(datosTarea)
    if (!esValido) {
        alertaError.classList.remove('d-none');
        return
    }
    alertaError.classList.add('d-none');

    tareas.push(datosTarea);
    console.log(JSON.stringify(tareas, null, 2));

    renderizarTareas();

    formularioNuevaTarea.reset();
    
    const elementoModal = document.querySelector("#newTaskModal");
    const instanciaModal = bootstrap.Modal.getInstance(elementoModal);
    if (instanciaModal) {
        const botonNuevaTarea = document.querySelector('[data-bs-target="#newTaskModal"]');
        elementoModal.addEventListener('hidden.bs.modal', function devolverFoco() {
            botonNuevaTarea.focus();
        }, { once: true });

        if (elementoModal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        instanciaModal.hide();
    }
});

function renderizarTareas() {
    contenedorTareas.innerHTML = '';

    tareas.forEach(tarea => {
        let claseEtiqueta = 'bg-secondary';

        if (tarea.categoria === 'Urgente') {
            claseEtiqueta = 'bg-danger';
        } else if (tarea.categoria === 'Estudio') {
            claseEtiqueta = 'bg-success';
        } else if (tarea.categoria === 'Personal') {
            claseEtiqueta = 'bg-info';
        } else if (tarea.categoria === 'Trabajo') {
            claseEtiqueta = 'bg-primary';
        }

        const columnaTarea = document.createElement('div');
        columnaTarea.className = 'task-list-item';

        const fila = document.createElement('div');
        fila.className = 'task-row';

        const casilla = document.createElement('input');
        casilla.type = 'checkbox';
        casilla.className = 'form-check-input';
        casilla.checked = Boolean(tarea.completada);
        casilla.setAttribute('aria-label', `Marcar ${tarea.nombre} como completada`);
        casilla.addEventListener('change', () => {
            tarea.completada = casilla.checked;
        });

        const contenido = document.createElement('div');
        contenido.className = 'task-content';

        const encabezado = document.createElement('div');
        encabezado.className = 'task-heading';

        const titulo = document.createElement('h5');
        titulo.className = 'task-title';
        titulo.textContent = tarea.nombre;

        const etiqueta = document.createElement('span');
        etiqueta.className = `badge ${claseEtiqueta}`;
        etiqueta.textContent = tarea.categoria;

        const descripcion = document.createElement('p');
        descripcion.className = 'task-desc';
        descripcion.textContent = tarea.descripcion;

        const meta = document.createElement('div');
        meta.className = 'task-meta';

        const fecha = document.createElement('span');
        const iconoFecha = document.createElement('i');
        iconoFecha.className = 'bi bi-calendar3';
        fecha.append(iconoFecha, document.createTextNode(tarea.fecha));

        const responsable = document.createElement('span');
        const iconoResponsable = document.createElement('i');
        iconoResponsable.className = 'bi bi-person';
        responsable.append(iconoResponsable, document.createTextNode('Andres F.'));

        encabezado.append(titulo, etiqueta);
        meta.append(fecha, responsable);
        contenido.append(encabezado, descripcion, meta);
        fila.append(casilla, contenido);
        columnaTarea.appendChild(fila);

        contenedorTareas.appendChild(columnaTarea);
    });
}

renderizarTareas();
