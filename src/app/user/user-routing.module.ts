import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { MygamesComponent } from './mygames/mygames.component';
import { MygameInfoComponent } from './mygame-info/mygame-info.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: HomeComponent },
      { path: 'play', component: PlayComponent },
      { path: 'my-games', component: MygamesComponent },
      { path: 'my-game-info', component: MygameInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
