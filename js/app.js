const formularioNuevaTarea = document.querySelector("#newTaskForm");
const alertaError = document.querySelector("#alertError");
const contenedorTareas = document.querySelector("#taskContainer");
const campoFechaTarea = document.querySelector("#newTaskDateInput");

function obtenerFechaActual() {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    return anio + '-' + mes + '-' + dia;
}

campoFechaTarea.min = obtenerFechaActual();

function validarTarea(tarea) {
    if (!tarea.nombre.trim() || !tarea.descripcion.trim() || !tarea.fecha.trim() || !tarea.categoria.trim()) {
        alertaError.textContent = 'Por favor, completa todos los campos correctamente.';
        return false;
    }

    if (tarea.fecha < obtenerFechaActual()) {
        alertaError.textContent = 'La fecha límite no puede ser anterior a la fecha actual.';
        return false;
    }

    return true;
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

    console.info('Tarea registrada. Estado actual de TaskManager:');
    console.table(taskManager.tasks);

    renderizarTareas();
    saveTasks();

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

    taskManager.tasks.slice().reverse().forEach((tarea) => {
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
        columnaTarea.dataset.taskId = tarea.id;

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
                <button type="button" class="btn btn-delete-task delete-button" aria-label="Eliminar ${tarea.name}">
                    <i class="bi bi-trash3"></i>
                    <span>Eliminar</span>
                </button>
            </div>
        </div>
        `;

        columnaTarea.querySelector('.task-title').textContent = tarea.name;
        columnaTarea.querySelector('.task-desc').textContent = tarea.description;
        columnaTarea.querySelector('.badge').textContent = tarea.category;

        const checkbox = columnaTarea.querySelector('.form-check-input');
        if (tarea.status === 'COMPLETADA') {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                taskManager.setTaskStatus(tarea.id, 'COMPLETADA');
            } else {
                taskManager.setTaskStatus(tarea.id, 'PORHACER');
            }

            columnaTarea.classList.toggle('task-completed', checkbox.checked);
            columnaTarea.classList.toggle('is-completed', checkbox.checked);
            saveTasks();
        });

        if (tarea.status === 'COMPLETADA') {
            columnaTarea.classList.add('task-completed');
            columnaTarea.classList.add('is-completed');
        }

        contenedorTareas.appendChild(columnaTarea);
    });
}

contenedorTareas.addEventListener('click', function (event) {
    const deleteButton = event.target.closest('.delete-button');

    if (!deleteButton) {
        return;
    }

    const taskCard = deleteButton.closest('[data-task-id]');

    if (!taskCard) {
        return;
    }

    const taskId = Number(taskCard.dataset.taskId);
    const task = taskManager.tasks.find(function (currentTask) {
        return currentTask.id === taskId;
    });

    if (!task) {
        return;
    }

    if (task.status !== 'COMPLETADA') {
        return;
    }

    document.querySelector('#deleteTaskName').textContent = task.name;
    document.querySelector('#confirmDeleteTask').dataset.taskId = taskId;
    const deleteModal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#deleteTaskModal'));
    deleteModal.show();
});

document.querySelector('#confirmDeleteTask').addEventListener('click', function (event) {
    const taskId = Number(event.currentTarget.dataset.taskId);

    if (taskManager.deleteTask(taskId)) {
        saveTasks();
        renderizarTareas();
        bootstrap.Modal.getInstance(document.querySelector('#deleteTaskModal')).hide();
    }
});

renderizarTareas();
