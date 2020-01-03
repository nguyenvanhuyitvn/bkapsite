import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StdInfoComponent } from './std-info/std-info.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
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
import { MatRadioModule } from '@angular/material/radio';
import { CheckscoresComponent } from './checkscores/checkscores.component';
import { PipeModule } from '../../shared/pipe/pipe.module';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
@NgModule({
  declarations: [StdInfoComponent, EditInfoComponent, ChangePassComponent, CheckscoresComponent, ForgotPassComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
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
    MatSelectModule,
    MatRadioModule,
    PipeModule
  ]
})
export class StudentModule { }
