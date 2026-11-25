import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UnhandledExceptionBus } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class ErrorsListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('CQRS Errors');
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly unhandledExceptionBus: UnhandledExceptionBus) {}

  onModuleInit() {
    this.unhandledExceptionBus
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ cause, exception }) => {
        this.logger.error(
          `Error: ${cause.constructor.name}: ${(exception as Error).message}`,
        );
      });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}