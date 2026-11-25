import { Command } from "@nestjs/cqrs";

export class CompleteTaskCommand extends Command<void> {
  constructor(public readonly taskId: string) {
    super();
  }
}