import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportsComponent } from './supports.component';
import { TtpmComponent } from './ttpm/ttpm.component';
import { BknetComponent } from './bknet/bknet.component';


const routes: Routes = [
  { path: '',
    children: [
      {
          path:'',
          component: SupportsComponent
      },
      {
        path: 'ttpm',
        component: TtpmComponent
      },
      {
        path: 'bknet',
        component: BknetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportsRoutingModule { }
