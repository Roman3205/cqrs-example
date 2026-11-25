import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery, TaskDto } from './get-tasks.query.js';
import { TaskRepository } from '../task.repository.js';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly repository: TaskRepository) {}

  async execute({ onlyDone }: GetTasksQuery): Promise<TaskDto[]> {
    return this.repository
      .findAll()
      .filter((t) => t.done === onlyDone || onlyDone === undefined)
      .map(({ id, title, done }) => ({ id, title, done }));
  }
}