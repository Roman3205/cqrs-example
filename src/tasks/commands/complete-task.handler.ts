import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTaskCommand } from './complete-task.command.js';
import { TaskRepository } from '../task.repository.js';

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ taskId }: CompleteTaskCommand) {
    const found = this.repository.findById(taskId);
    if (!found) {
      throw new NotFoundException(`Task ${taskId} not found`);
    }

    const task = this.publisher.mergeObjectContext(found);
    task.complete();
    this.repository.save(task);
    task.commit();
  }
}