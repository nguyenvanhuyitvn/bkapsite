import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule) },
  { path: 'xac-thuc', loadChildren: () => import('./common/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
