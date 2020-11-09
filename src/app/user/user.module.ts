import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PlayComponent } from './play/play.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MygamesComponent } from './mygames/mygames.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CounterDirective } from '../services/counter.directive';
import { MygameInfoComponent } from './mygame-info/mygame-info.component';

@NgModule({
  declarations: [
    MygameInfoComponent,
    LoginComponent, 
    MygamesComponent, 
    RegisterComponent, 
    HomeComponent, 
    SidenavComponent, 
    PlayComponent, 
    CounterDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
