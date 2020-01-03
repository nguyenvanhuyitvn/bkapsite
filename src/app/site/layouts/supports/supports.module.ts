import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportsRoutingModule } from './supports-routing.module';
import { SupportsComponent } from './supports.component';
import { TtpmComponent } from './ttpm/ttpm.component';
import { BknetComponent } from './bknet/bknet.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule,MatFormFieldModule, MatButtonModule, MatIconModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from './../../shared/shared.module';
import { MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeModule } from '../../shared/pipe/pipe.module';
@NgModule({
  declarations: [SupportsComponent, TtpmComponent, BknetComponent],
  imports: [
    CommonModule,
    SupportsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatFormFieldModule,
    SharedModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    MatSelectModule
  ]
})
export class SupportsModule { }
