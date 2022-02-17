import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secured-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecureAppComponent } from './secured-app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    SecureAppComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
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
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: []
})
export class SecureModule { }
