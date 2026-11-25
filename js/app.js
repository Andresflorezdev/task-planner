const formularioNuevaTarea = document.querySelector("#newTaskForm");
const alertaError = document.querySelector("#alertError");
const contenedorTareas = document.querySelector("#taskContainer");

function validarTarea(tarea) {
    return Boolean(
        tarea.nombre.trim() &&
        tarea.descripcion.trim() &&
        tarea.fecha.trim() &&
        tarea.categoria.trim()
    );
}

formularioNuevaTarea.addEventListener('submit', function (event) {
    event.preventDefault();

    const datosTarea = {
        nombre: document.querySelector("#newTaskNameInput").value,
        descripcion: document.querySelector("#newTaskDescInput").value,
        fecha: document.querySelector("#newTaskDateInput").value,
        categoria: document.querySelector("#newTaskCategoryInput").value
    };

    if (!validarTarea(datosTarea)) {
        alertaError.classList.remove('d-none');
        return;
    }

    alertaError.classList.add('d-none');
    taskManager.addTask(
        datosTarea.nombre.trim(),
        datosTarea.descripcion.trim(),
        datosTarea.fecha,
        'PORHACER',
        datosTarea.categoria
    );

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

    taskManager.tasks.forEach((tarea) => {
        let claseEtiqueta = 'bg-secondary';

        if (tarea.category === 'Urgente') {
            claseEtiqueta = 'bg-danger';
        } else if (tarea.category === 'Estudio') {
            claseEtiqueta = 'bg-success';
        } else if (tarea.category === 'Personal') {
            claseEtiqueta = 'bg-info';
        } else if (tarea.category === 'Trabajo') {
            claseEtiqueta = 'bg-primary';
        }

        const columnaTarea = document.createElement('div');
        columnaTarea.className = 'task-list-item';

        columnaTarea.innerHTML = `
        <div class="task-row">
            <input type="checkbox" class="form-check-input" aria-label="Marcar ${tarea.name} como completada">
            <div class="task-content">
                <div class="task-heading">
                    <h5 class="task-title"></h5>
                    <span class="badge ${claseEtiqueta}"></span>
                </div>
                <p class="task-desc"></p>
                <div class="task-meta">
                    <span><i class="bi bi-calendar3"></i>${tarea.dueDate}</span>
                    <span><i class="bi bi-person"></i>Andres F.</span>
                </div>
            </div>
        </div>
        `;

        columnaTarea.querySelector('.task-title').textContent = tarea.name;
        columnaTarea.querySelector('.task-desc').textContent = tarea.description;
        columnaTarea.querySelector('.badge').textContent = tarea.category;

        const checkbox = columnaTarea.querySelector('.form-check-input');
        checkbox.addEventListener('change', function () {
            columnaTarea.classList.toggle('task-completed', checkbox.checked);
        });

        contenedorTareas.appendChild(columnaTarea);
    });
}

renderizarTareas();
