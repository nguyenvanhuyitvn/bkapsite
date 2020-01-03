import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipeModule } from '../../shared/pipe/pipe.module';

@NgModule({
  declarations: [NewsListComponent, NewsDetailComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatPaginatorModule,
    PipeModule
  ]
})
export class NewsModule { }
