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
}
