import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatProgressBarModule
];

@NgModule({

  imports: modules,
  exports: modules
})
export class MaterialModule {
}
