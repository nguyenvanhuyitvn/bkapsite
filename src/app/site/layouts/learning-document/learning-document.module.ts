import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningDocumentRoutingModule } from './learning-document-routing.module';
import { DocsDetailsComponent } from './docs-details/docs-details.component';
import { ExcerciseComponent } from './excercise/excercise.component';
import { LearningDocumentComponent } from './learning-document.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule} from '@angular/material/card';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeModule } from '../../shared/pipe/pipe.module';
import { ComponentsModule } from '../components/components.module';
// import { ngxSummernote }
@NgModule({
  declarations: [DocsDetailsComponent, ExcerciseComponent, LearningDocumentComponent],
  imports: [
    CommonModule,
    LearningDocumentRoutingModule,
    MatPaginatorModule,
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
    PipeModule,
    ComponentsModule
  ]
})
export class LearningDocumentModule { }
