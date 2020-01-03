import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'danh-muc/:id',
        component: NewsListComponent
      },
      {
        path: 'bai-viet/:NewsId',
        component: NewsDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
