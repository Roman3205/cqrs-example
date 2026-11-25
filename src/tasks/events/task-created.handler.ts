import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskCreatedEvent } from './task-created.event.js';

@EventsHandler(TaskCreatedEvent)
export class TaskCreatedHandler implements IEventHandler<TaskCreatedEvent> {
    private readonly logger = new Logger(TaskCreatedHandler.name);

    handle(event: TaskCreatedEvent) {
        this.logger.log(`Task created "${event.title}" - "${event.taskId}"`);
    }
}