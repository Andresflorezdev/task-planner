class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, status = 'PORHACER', category = 'Urgente') {
        this.currentId++;

        const task = {
            id: this.currentId,
            name,
            description,
            dueDate,
            category,
            status
        };

        this.tasks.push(task);
        return task;
    }

    setTaskStatus(taskId, status) {
        let taskFound = false;

        for (let task of this.tasks) {
            if (task.id === taskId) {
                task.status = status;
                taskFound = true;
                break;
            }
        }

        return taskFound;
    }

    deleteTask(taskId) {
        const idToNumber = Number(taskId);
        const newTasks = [];

        for (let currentTask of this.tasks) {
            if (currentTask.id !== idToNumber) {
                newTasks.push(currentTask);
            }
        }

        this.tasks = newTasks;
        return true;
    }

    save() {
        localStorage.setItem('taskPlannerTasks', JSON.stringify(this.tasks));
    }

    render() {
        if (typeof renderizarTareas === 'function') {
            renderizarTareas();
        }
    }
}
