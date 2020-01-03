import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningDocumentComponent } from './learning-document.component';
import { DocsDetailsComponent } from './docs-details/docs-details.component';
import { ExcerciseComponent } from './excercise/excercise.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
         path: 'danh-muc/:id',
         component: LearningDocumentComponent
      },
      {
        path: 'danh-muc/bai-viet/:id',
        component: DocsDetailsComponent
      },
      {
        path: 'nop-bai-tap',
        component: ExcerciseComponent
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningDocumentRoutingModule { }
