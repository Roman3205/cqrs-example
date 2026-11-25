import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [CqrsModule.forRoot(), TasksModule],
})
export class AppModule {}