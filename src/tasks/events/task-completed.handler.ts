import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TaskCompletedEvent } from './task-completed.event.js';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedHandler implements IEventHandler<TaskCompletedEvent> {
    private readonly logger = new Logger(TaskCompletedHandler.name);

    handle(event: TaskCompletedEvent) {
        this.logger.log(`Task completed "${event.taskId}"`);
    }
}