import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsComponent } from './layouts.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'trang-chu', pathMatch: 'prefix' },
      { path: 'trang-chu', component: DashboardComponent },
      { path: 'tin-tuc', loadChildren: () => import('./news/news.module').then(m => m.NewsModule), canActivate: [AuthGuard] },
      { path: 'tin-tuc', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
      { path: 'ho-tro-hoc-tap', loadChildren: () => import('./supports/supports.module').then(m => m.SupportsModule), canActivate: [AuthGuard] },
      // tslint:disable-next-line: max-line-length
      { path: 'tai-lieu-hoc-tap', loadChildren: () => import('./learning-document/learning-document.module').then(m => m.LearningDocumentModule), canActivate: [AuthGuard] },
      { path: 'gop-y', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule), canActivate: [AuthGuard] },
      // { path: 'gop-y', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)},
      { path: 'sinh-vien', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [AuthGuard] },
      // { path: 'sinh-vien', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
      { path: 'van-ban', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule), canActivate: [AuthGuard] },
      { path: 'thoi-khoa-bieu', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule), canActivate: [AuthGuard] },
      { path: 'lich-thi', loadChildren: () => import('./exam-schedule/exam-schedule.module').then(m => m.ExamScheduleModule), canActivate: [AuthGuard] },
      { path: 'thong-bao', loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule), canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
