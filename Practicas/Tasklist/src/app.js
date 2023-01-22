const fs = require("fs");
const path = "src/task.txt"

class TaskManager {

    constructor(task) {
        this.task = task;
    }

    async getTask() {
        try {
            const data = await fs.promises.readFile(path, "utf-8");
            const jsonData = JSON.parse(data);
            return jsonData;
        }
        catch (error) {
            return console.error(error);
        }
    }

    async addTask(task) {
        try {
            const jsonData = await this.getTask();
            let newJsonData;
            if (jsonData.length === 0) {
                task.id = jsonData.length + 1;
            }
            else {
                if (jsonData[jsonData.length - 1].id == jsonData.length) {
                    task.id = jsonData.length + 1;
                }
                else {
                    task.id = jsonData[jsonData.length - 1].id + 1;
                }
            }
            newJsonData = JSON.stringify([...jsonData, task]);
            await fs.promises.writeFile(path, newJsonData);
            return console.error("Task added successfully");
        }
        catch (error) {
            console.error(error);
        }
    }

    async getTaskById(id) {
        try {
            const jsonData = await this.getTask();
            const itemId = Object.values(jsonData).find((e) => e.id === id);
            if (itemId === undefined) {
                return console.error("Not Found");
            } else {
                return itemId;
            }
        }
        catch (error) {
            return console.error(error);
        }
    }

    async deleteById(id) {
        try {
            const jsonData = await this.getTask();
            const task = Object.values(jsonData).find((e) => e.id === id);
            if (task) {
                let newJsonData = jsonData.filter((task) => task.id !== id);
                await fs.promises.writeFile(path, JSON.stringify(newJsonData));
                return console.log("Removed product successfully");
            } else {
                return console.error("Not Found");
            }
        }
        catch (error) {
            return console.error(error);
        }
    }

    async updateTask(id, newTask) {
        try {
            const jsonData = await this.getTask();
            const itemId = Object.values(jsonData).find((e) => e.id === id);

            if (itemId === undefined) {
                return console.error("Not Found");
            } else {
                itemId.task = newTask;
                await fs.promises.writeFile(path, JSON.stringify(jsonData));
                return console.log("updated product successfully");
            }
        }
        catch (error) {
            return console.error(error);
        }
    }
}


const listaPendientes = new TaskManager("src/task.txt");

const taskPrint = async () => {
    console.log(await listaPendientes.getTask());
}
taskPrint();

const taskIdPrint = async (id) => {
    console.log(await listaPendientes.getTaskById(id));
}
//taskIdPrint(3);

const deleteTaskById = async (id) => {
    console.log(await listaPendientes.deleteById(id));
}
//deleteTaskById(3);

const updateTaskById = async (id, Newtask) => {
    console.log(await listaPendientes.updateTask(id, Newtask));
}
//updateTaskById(1,"Lavar la ropa de color");
//updateTaskById(2,"Pasear a balu y a mama");


//listaPendientes.addTask({task: "Pasear a balu"});

