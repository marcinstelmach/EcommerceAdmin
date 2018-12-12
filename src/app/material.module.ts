import {NgModule} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
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
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
];

@NgModule({

  imports: modules,
  exports: modules,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl'},
  ]
})
export class MaterialModule {
}
