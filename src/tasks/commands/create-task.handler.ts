import { randomUUID } from 'node:crypto';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command.js';
import { TaskRepository } from '../task.repository.js';
import { Task } from '../task.model.js';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly repository: TaskRepository, private readonly publisher: EventPublisher) {}

  async execute(command: CreateTaskCommand) {
    const task = this.publisher.mergeObjectContext(new Task(randomUUID(), command.title));
    task.create();
    this.repository.save(task);
    task.commit();
    return { id: task.id };
  }
}