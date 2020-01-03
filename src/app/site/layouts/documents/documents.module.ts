import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule} from '@angular/material/card';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { PipeModule } from '../../shared/pipe/pipe.module';
@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    MatToolbarModule,
    SharedModule,
    PipeModule
  ]
})
export class DocumentsModule { }
