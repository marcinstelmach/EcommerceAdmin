import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule
];

@NgModule({

  imports: modules,
  exports: modules
})
export class MaterialModule {
}
