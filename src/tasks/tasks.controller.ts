import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command.js';
import { GetTasksQuery } from './queries/get-tasks.query.js';
import { CompleteTaskCommand } from './commands/complete-task.command.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body('title') title: string) {
    return this.commandBus.execute(new CreateTaskCommand(title))
  }

  @Get()
  findAll(@Query('done') done?: string) {
    const onlyDone = done === undefined ? undefined : done === 'true'
    return this.queryBus.execute(new GetTasksQuery(onlyDone))
  }

  @Post(':id/complete')
  @HttpCode(204)
  complete(@Param('id') id: string) {
    return this.commandBus.execute(new CompleteTaskCommand(id))
  }
}