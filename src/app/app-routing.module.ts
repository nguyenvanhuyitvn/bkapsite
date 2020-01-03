import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) },
];

@NgModule({
  imports: [BrowserModule,
            CommonModule,
            RouterModule.forRoot(routes)],
  exports: [RouterModule, CommonModule]
})
export class AppRoutingModule { }
