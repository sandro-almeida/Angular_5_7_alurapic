import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    RouterModule
  ],
  declarations: [
    SigninComponent, 
    SignupComponent,
    HomeComponent
  ]
})
export class HomeModule { }
