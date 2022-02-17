import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from '../ui-helpers/reusable-components/form-errors/form-errors.component';
import { LoaderOverlayComponent } from '../ui-helpers/reusable-components/loader-overlay/loader-overlay.component';
import { SubmitBtnComponent } from '../ui-helpers/reusable-components/submit-btn/submit-btn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    FormErrorsComponent,
    LoaderOverlayComponent,
    SubmitBtnComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormErrorsComponent,
    LoaderOverlayComponent,
    SubmitBtnComponent
  ],
})
export class SharedModule { }
