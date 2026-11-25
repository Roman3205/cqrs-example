import { Query } from '@nestjs/cqrs';

export interface TaskDto {
  id: string;
  title: string;
  done: boolean;
}

export class GetTasksQuery extends Query<TaskDto[]> {
  constructor(public readonly onlyDone?: boolean) {
    super();
  }
}