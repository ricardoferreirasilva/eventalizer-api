import { Module } from '@nestjs/common';
import {ScheduleModule} from "nest-schedule";
import { JobsService } from './jobs.service';

@Module({
  imports: [    ScheduleModule.register()],
  providers: [JobsService]
})
export class JobsModule {}
