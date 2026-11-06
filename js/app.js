// validaciones del formulario e impresion por consola
let tareas = [
    {
        nombre: "Rediseño de interfaz de usuario",
        descripcion: "Actualizar los componentes visuales del dashboard principal según la nueva guía de estilos.",
        fecha: "2026-10-15",
        categoria: "Urgente"
    },
    {
        nombre: "Integración de API REST",
        descripcion: "Configurar los endpoints de autenticación y consumo de datos con tokens seguros de acceso.",
        fecha: "2026-10-16",
        categoria: "Estudio"
    },
    {
        nombre: "Optimización de consultas",
        descripcion: "Revisar peticiones lentas en la base de datos y optimizar la carga para mejorar tiempos de respuesta.",
        fecha: "2026-10-18",
        categoria: "Urgente"
    },
    {
        nombre: "Implementación de autenticación",
        descripcion: "Desarrollar el módulo de inicio de sesión y registro de usuarios con validación de credenciales.",
        fecha: "2026-10-20",
        categoria: "Urgente"
    },
    {
        nombre: "Documentación del proyecto",
        descripcion: "Elaborar la documentación técnica del sistema, incluyendo funcionalidades, endpoints y estructura del proyecto.",
        fecha: "2026-10-22",
        categoria: "Trabajo"
    },
    {
        nombre: "Pruebas funcionales del sistema",
        descripcion: "Ejecutar casos de prueba para verificar el funcionamiento de los módulos y registrar posibles defectos.",
        fecha: "2026-10-24",
        categoria: "Estudio"
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
        categoria: categoriaInput.value
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

        columnaTarea.innerHTML = `
        <div class="task-row">
            <input type="checkbox" class="form-check-input" aria-label="Marcar ${tarea.nombre} como completada">
            <div class="task-content">
                <div class="task-heading">
                    <h5 class="task-title">${tarea.nombre}</h5>
                    <span class="badge ${claseEtiqueta}">${tarea.categoria}</span>
                </div>
                <p class="task-desc">${tarea.descripcion}</p>
                <div class="task-meta">
                    <span><i class="bi bi-calendar3"></i>${tarea.fecha}</span>
                    <span><i class="bi bi-person"></i>Andres F.</span>
                </div>
            </div>
        </div>
        `;

        contenedorTareas.appendChild(columnaTarea);
    });
}

renderizarTareas();
