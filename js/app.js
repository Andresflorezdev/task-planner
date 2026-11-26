import { cargarModales, inicializarModales } from './inicializar.js';

const contenedorTareas = document.querySelector("#taskContainer");

function obtenerFechaActual() {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    return anio + '-' + mes + '-' + dia;
}

function validarTarea(tarea, alertaError) {
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

async function iniciarModales() {
    await cargarModales();

    inicializarModales({
        fechaMinima: obtenerFechaActual(),
        validarTarea: validarTarea,
        onCrearTarea: function (datosTarea) {
            taskManager.addTask(
                datosTarea.nombre.trim(),
                datosTarea.descripcion.trim(),
                datosTarea.fecha,
                'PORHACER',
                datosTarea.categoria
            );

            console.info('Tarea registrada. Estado actual de TaskManager:');
            console.table(taskManager.tasks);

            taskManager.render();
            taskManager.save();
        },
        onEliminarTarea: function (taskId) {
            taskManager.deleteTask(taskId);
            taskManager.save();
            taskManager.render();
        }
    });
}

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
                <div class="task-actions">
                    <button type="button" class="btn btn-view-task view-button" aria-label="Ver tarea completa ${tarea.name}">
                        <i class="bi bi-eye"></i>
                        <span>Ver tarea</span>
                    </button>
                    <button type="button" class="btn btn-delete-task delete-button" aria-label="Eliminar ${tarea.name}">
                        <i class="bi bi-trash3"></i>
                        <span>Eliminar</span>
                    </button>
                </div>
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
            taskManager.save();
        });

        if (tarea.status === 'COMPLETADA') {
            columnaTarea.classList.add('task-completed');
            columnaTarea.classList.add('is-completed');
        }

        contenedorTareas.appendChild(columnaTarea);
    });
}

contenedorTareas.addEventListener('click', function (event) {
    const viewButton = event.target.closest('.view-button');
    if (viewButton) {
        const taskCard = viewButton.closest('[data-task-id]');
        if (!taskCard) return;

        const taskId = Number(taskCard.dataset.taskId);
        const task = taskManager.tasks.find(function (currentTask) {
            return currentTask.id === taskId;
        });

        if (!task) return;

        document.querySelector('#viewTaskModalLabel').textContent = task.name;
        document.querySelector('#viewTaskDesc').textContent = task.description;
        document.querySelector('#viewTaskDate').textContent = task.dueDate;

        const viewCategory = document.querySelector('#viewTaskCategory');
        viewCategory.textContent = task.category;
        let badgeClass = 'bg-secondary';
        if (task.category === 'Urgente') badgeClass = 'bg-danger';
        else if (task.category === 'Estudio') badgeClass = 'bg-success';
        else if (task.category === 'Personal') badgeClass = 'bg-info';
        else if (task.category === 'Trabajo') badgeClass = 'bg-primary';
        viewCategory.className = `badge view-modal-badge ${badgeClass} text-white`;

        const viewStatus = document.querySelector('#viewTaskStatus');
        if (task.status === 'COMPLETADA') {
            viewStatus.textContent = 'Completada';
            viewStatus.className = 'badge view-modal-badge badge-status-completed';
        } else {
            viewStatus.textContent = 'Por hacer';
            viewStatus.className = 'badge view-modal-badge badge-status-pending';
        }

        const viewModal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#viewTaskModal'));
        viewModal.show();
        return;
    }

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

    document.querySelector('#deleteTaskName').textContent = task.name;
    document.querySelector('#confirmDeleteTask').dataset.taskId = taskId;
    const deleteModal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#deleteTaskModal'));
    deleteModal.show();
});

taskManager.render = renderizarTareas;
taskManager.render();
iniciarModales();
