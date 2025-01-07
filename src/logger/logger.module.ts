import { Global, Module } from '@nestjs/common';
import { winstonLogger } from 'src/config/winston/winston.config';

@Global()
@Module({
  providers: [
    {
      provide: 'winston',
      useValue: winstonLogger,
    },
  ],
  exports: ['winston'],
})
export class LoggingModule {}
