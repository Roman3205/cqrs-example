import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { TaskCompletedEvent } from '../events/task-completed.event.js';
import { SendNotificationCommand } from '../commands/send-notification.command.js';

@Injectable()
export class TasksSaga {
  @Saga()
  taskCompleted = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(TaskCompletedEvent),
      map((event) => new SendNotificationCommand(`Task ${event.taskId} is done!`)),
    );
}