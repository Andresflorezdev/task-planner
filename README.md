# Task Planner

Aplicación web para registrar, organizar y visualizar tareas personales mediante una interfaz sencilla e intuitiva.

## Objetivo

Construir una aplicación web que facilite la planificación y gestión de tareas, incorporando funcionalidades de manera progresiva.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Java
- Spring Boot


## Diseño y planificación

- **Trello:** [Ver tablero del proyecto](https://trello.com/invite/b/6ae2525645324e28b9cb17ab/ATTI521bd3db2d9328029cd6596027c618e2AF54FCFF/planificador-tareas-task-planner)
- **Figma:** [Ver wireframe del proyecto](https://www.figma.com/design/QbuCodBuIOOfRuXC9DQ6nE/Proyecto-individual?node-id=0-1&t=J5gTuJ2edadcTTSy-1)


## Estructura del Proyecto (Sprint 1)

```text
task-planner/
├── css/
│   └── styles.css
└── index.html
```


## Estructura del proyecto (Sprint 2)
```text
task-planner/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── index.js
│   └── taskManager.js
└── index.html
```

## Sprint 2 – JavaScript y gestión de tareas

- La clase `TaskManager`, definida en `js/taskManager.js`, administra la colección de tareas en `tasks`.
- `TaskManager` conserva `currentId` para asignar un identificador consecutivo a cada tarea.
- El método `addTask(name, description, dueDate, status, category)` registra una tarea y devuelve el objeto creado.
- Las tareas nuevas comienzan con el estado `PORHACER`.
- Las seis tareas de prueba del proyecto se conservan y se cargan en `TaskManager` desde `js/index.js` al iniciar la página.
- El formulario de `index.html` se valida y se procesa desde `js/app.js`; después de registrar una tarea, la lista se vuelve a dibujar y el formulario se limpia.
- La lista visible se genera desde `taskManager.tasks`. Las tarjetas muestran nombre, descripción, fecha y categoría.
- Los datos se guardan solo en memoria: al recargar la página vuelven a cargarse las seis tareas de prueba y se pierden las tareas agregadas durante la sesión.

### Ver las tareas en la consola del navegador

1. Abre la aplicación en el navegador.
2. Abre las herramientas de desarrollador con `F12` o `Ctrl + Shift + I` y selecciona la pestaña **Consola**.
3. Escribe `taskManager.tasks` y presiona `Enter` para inspeccionar el arreglo, o `console.table(taskManager.tasks)` para verlo como tabla.

La consola también muestra la tabla al cargar las seis tareas de prueba y después de cada registro desde el formulario. Cada tarea incluye `id`, `name`, `description`, `dueDate`, `category` y `status`.
