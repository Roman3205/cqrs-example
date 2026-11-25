import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendNotificationCommand } from './send-notification.command.js';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<SendNotificationCommand> {
  private readonly logger = new Logger('Notification');

  async execute({ message }: SendNotificationCommand) {
    this.logger.log(`📨 ${message}`);
  }
}