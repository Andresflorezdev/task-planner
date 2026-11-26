// js/inicializar.js
// Módulo para cargar e inicializar los modales de la aplicación

export async function cargarModales(ruta = 'html/modals.html') {
    try {
        const respuesta = await fetch(ruta);
        if (!respuesta.ok) {
            throw new Error(`HTTP error ${respuesta.status}`);
        }
        const htmlModales = await respuesta.text();
        const contenedorModales = document.querySelector("#modalsContainer");
        if (contenedorModales) {
            contenedorModales.innerHTML = htmlModales;
        }
    } catch (error) {
        console.warn(`Aviso: ${ruta} se carga por fetch; asegúrate de abrir el proyecto con Live Server.`, error);
    }
}

export function inicializarModales({ onCrearTarea, onEliminarTarea, fechaMinima, validarTarea }) {
    const formularioNuevaTarea = document.querySelector("#newTaskForm");
    const alertaError = document.querySelector("#alertError");
    const campoFechaTarea = document.querySelector("#newTaskDateInput");

    if (campoFechaTarea && fechaMinima) {
        campoFechaTarea.min = fechaMinima;
    }

    if (formularioNuevaTarea) {
        formularioNuevaTarea.addEventListener('submit', function (event) {
            event.preventDefault();

            const datosTarea = {
                nombre: document.querySelector("#newTaskNameInput").value,
                descripcion: document.querySelector("#newTaskDescInput").value,
                fecha: document.querySelector("#newTaskDateInput").value,
                categoria: document.querySelector("#newTaskCategoryInput").value
            };

            if (validarTarea && !validarTarea(datosTarea, alertaError)) {
                alertaError.classList.remove('d-none');
                return;
            }

            if (alertaError) {
                alertaError.classList.add('d-none');
            }

            if (typeof onCrearTarea === 'function') {
                onCrearTarea(datosTarea);
            }

            formularioNuevaTarea.reset();

            const elementoModal = document.querySelector("#newTaskModal");
            const instanciaModal = bootstrap.Modal.getInstance(elementoModal);
            if (instanciaModal) {
                const botonNuevaTarea = document.querySelector('[data-bs-target="#newTaskModal"]');
                elementoModal.addEventListener('hidden.bs.modal', function devolverFoco() {
                    if (botonNuevaTarea) botonNuevaTarea.focus();
                }, { once: true });

                if (elementoModal.contains(document.activeElement)) {
                    document.activeElement.blur();
                }

                instanciaModal.hide();
            }
        });
    }

    const botonConfirmarEliminar = document.querySelector('#confirmDeleteTask');
    if (botonConfirmarEliminar) {
        botonConfirmarEliminar.addEventListener('click', function (event) {
            const taskId = Number(event.currentTarget.dataset.taskId);

            if (typeof onEliminarTarea === 'function') {
                onEliminarTarea(taskId);
            }

            const deleteModalElement = document.querySelector('#deleteTaskModal');
            const deleteModalInstance = bootstrap.Modal.getInstance(deleteModalElement);
            if (deleteModalInstance) {
                deleteModalInstance.hide();
            }
        });
    }
}
