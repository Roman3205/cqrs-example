import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TaskRepository } from './task.repository.js';
import { CreateTaskHandler } from './commands/create-task.handler.js';
import { GetTasksHandler } from './queries/get-tasks.handler.js';
import { TaskCreatedHandler } from './events/task-created.handler.js';
import { CompleteTaskHandler } from './commands/complete-task.handler.js';
import { TaskCompletedHandler } from './events/task-completed.handler.js';
import { TasksSaga } from './sagas/tasks.saga.js';
import { SendNotificationHandler } from './commands/send-notification.handler.js';

@Module({
  controllers: [TasksController],
  providers: [
    TaskRepository,
    CreateTaskHandler,
    GetTasksHandler,
    TaskCreatedHandler,
    CompleteTaskHandler,
    TaskCompletedHandler,
    TasksSaga,
    SendNotificationHandler
  ],
})
export class TasksModule {}