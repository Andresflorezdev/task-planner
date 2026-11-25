const taskManager = new TaskManager();

// Tareas de prueba existentes: se conservan y se cargan en TaskManager.
const tareasIniciales = [
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

tareasIniciales.forEach((tarea) => {
    taskManager.addTask(
        tarea.nombre,
        tarea.descripcion,
        tarea.fecha,
        'PORHACER',
        tarea.categoria
    );
});
