import { Injectable } from '@nestjs/common';
import { Task } from './task.model.js';

@Injectable()
export class TaskRepository {
  private readonly tasks = new Map<string, Task>()

  save(task: Task) {
    this.tasks.set(task.id, task);
  }

  findById(id: string) {
    return this.tasks.get(id);
  }

  findAll() {
    return [...this.tasks.values()];
  }
}