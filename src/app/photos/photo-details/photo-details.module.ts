import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PhotoDetailsComponent ],
  exports: [ PhotoDetailsComponent ]
})
export class PhotoDetailsModule { }
