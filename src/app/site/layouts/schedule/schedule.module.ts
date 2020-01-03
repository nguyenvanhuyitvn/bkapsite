import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PipeModule } from '../../shared/pipe/pipe.module';
import { MatPaginatorModule } from '@angular/material';
@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    PipeModule,
    MatPaginatorModule
  ]
})
export class ScheduleModule { }
