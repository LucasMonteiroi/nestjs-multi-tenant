import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(private repository: TasksRepository) { }

    async createTask(
        params: { 
            title: Task[`title`]; 
            description: Task[`description`]; 
            userId: Task[`userId`] 
        }
    ) {
        const { title, description, userId } = params;

        const task = await this.repository.createTask({
            data: {
                title,
                description,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        });

        return task;
    }

    async updateTask(params: { 
        title: Task[`title`]; 
        description: Task[`description`]; 
        userId: Task[`userId`];
        id: Task[`id`]
    }
) {
    const { title, description, userId, id } = params;

        const task = await this.repository.updateTask({
            where: {
                id
            },
            data: {
                title,
                description,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        });

        return task;
    }

    async getTasks() {
        const tasks = await this.repository.getTasks({});

        return tasks;
    }

    async getFilteredTasks(searchString: string) {
        const tasks = await this.repository.getTasks({
            where: {
                OR: [
                    {
                        title: { contains: searchString }
                    },
                    {
                        description: { contains: searchString }
                    }
                ]
            }
        });

        return tasks;

    }

    async deleteTask(params: { taskId: Task['id'] }) {
        const { taskId } = params;
        const deleted = await this.repository.deleteTask({
            where: {
                id: taskId
            }
        });
        console.log(deleted);
    }
}