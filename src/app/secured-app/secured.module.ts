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
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SecureAppComponent } from './secured-app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CreateStoryComponent } from './create-story/create-story.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CutTextPipe } from '../ui-helpers/pipes/cut-text.pipe';
import { ConvertToBrPipe } from '../ui-helpers/pipes/convert-to-br.pipe';
import { UpdateStoryComponent } from './update-story/update-story.component';
import { StoryScenesEditorComponent } from './story-scenes-editor/story-scenes-editor.component';
import { GameStoryDashboardComponent } from './game-story-dashboard/game-story-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StartGameDialogComponent } from '../ui-helpers/dialogs/start-game-dialog/start-game-dialog.component';
import { FilesManagerComponent } from '../files-manager/files-manager.component';
import { EditFileDialogComponent } from '../ui-helpers/dialogs/edit-file-dialog/edit-file-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreateStorySceneComponent } from './story-scenes-editor/create-story-scene/create-story-scene.component';
import { EditStorySceneComponent } from './story-scenes-editor/edit-story-scene/edit-story-scene.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateCommandDialogComponent } from './story-scenes-editor/create-command-dialog/create-command-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GameListComponent } from './game-list/game-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    HomeComponent,
    SecureAppComponent,
    CreateStoryComponent,
    CutTextPipe,
    ConvertToBrPipe,
    UpdateStoryComponent,
    StoryScenesEditorComponent,
    GameStoryDashboardComponent,
    StartGameDialogComponent,
    FilesManagerComponent,
    EditFileDialogComponent,
    CreateStorySceneComponent,
    EditStorySceneComponent,
    CreateCommandDialogComponent,
    GameListComponent
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
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatExpansionModule
  ],
  providers: []
})
export class SecureModule { }
