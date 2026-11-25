import { Command } from '@nestjs/cqrs';

export class SendNotificationCommand extends Command<void> {
  constructor(public readonly message: string) {
    super();
  }
}