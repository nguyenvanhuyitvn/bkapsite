import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StdInfoComponent } from './std-info/std-info.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { CheckscoresComponent } from './checkscores/checkscores.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'thong-tin',
        component: StdInfoComponent
      },
      {
        path: 'sua-thong-tin',
        component: EditInfoComponent
      },
      {
        path: 'doi-mat-khau',
        component: ChangePassComponent
      },
      {
        path: 'tra-cuu-diem-thi',
        component: CheckscoresComponent
      },
      {
        path: 'quen-mat-khau',
        component: ForgotPassComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
