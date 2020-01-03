import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PipeModule } from '../../shared/pipe/pipe.module';


@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    NoticeRoutingModule,
    PipeModule
  ]
})
export class NoticeModule { }
