import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule
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
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule
];

@NgModule({

  imports: modules,
  exports: modules
})
export class MaterialModule {
}
