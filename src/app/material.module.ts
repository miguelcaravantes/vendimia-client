import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatRadioModule,
  ],
  exports:
    [
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatDialogModule,
      MatMenuModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatAutocompleteModule,
    MatRadioModule,


    ],
  declarations: []
})
export class MaterialModule { }
