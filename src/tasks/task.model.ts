import { AggregateRoot } from '@nestjs/cqrs';
import { TaskCreatedEvent } from './events/task-created.event.js';
import { BadRequestException } from '@nestjs/common';
import { TaskCompletedEvent } from './events/task-completed.event.js';

export class Task extends AggregateRoot {
  constructor(
    public readonly id: string,
    public title: string,
    public done = false,
  ) {
    super()
  }

  create() {
    this.apply(new TaskCreatedEvent(this.id, this.title))
  }

  complete() {
    if (this.done) {
        throw new BadRequestException('Task is already done')
    }

    this.done = true
    this.apply(new TaskCompletedEvent(this.id))
  }
}