import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutsComponent } from './layouts.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
// import { SearchComponent } from './components/search/search.component';
import { SidebarBoxComponent } from './components/sidebar-box/sidebar-box.component';
import { ComponentsModule } from './components/components.module';
import { PipeModule } from '../shared/pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  declarations: [DashboardComponent, LayoutsComponent, HeaderComponent, FooterComponent, CarouselComponent, SidebarBoxComponent],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    ComponentsModule,
    PipeModule,
    SharedModule,
    OwlModule

  ]
})
export class LayoutsModule { }
