import { Command } from '@nestjs/cqrs';

export class CreateTaskCommand extends Command<{ id: string }> {
  constructor(public readonly title: string) {
    super();
  }
}