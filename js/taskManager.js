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
        const task = this.tasks.find(function (currentTask) {
            return currentTask.id === taskId;
        });

        if (!task || task.status !== 'COMPLETADA') {
            return false;
        }

        const newTasks = [];

        for (let currentTask of this.tasks) {
            if (currentTask.id !== taskId) {
                newTasks.push(currentTask);
            }
        }

        this.tasks = newTasks;
        return true;
    }
}
