import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthStateService } from '../../services/auth-state.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSignedIn: boolean;
  errors = null;
  full_name: string;
  email:string;
  avathar:string;

  constructor(private userService: UserService,
    private auth: AuthStateService,
    public router: Router,
    private token: TokenService) { }

  ngOnInit(): void {
    this.setState();
    this.checkLogin();
    this.getprofile();
  }

  setState() {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  checkLogin() {
    if (!this.isSignedIn) {
      this.router.navigate(['login']);
    }
  }

  getprofile() {
    this.userService.userprofile().subscribe(user => {
      console.log('user',user);
      this.full_name = user.full_name;
      this.email = user.email;
      this.avathar = `${environment.server_base_url}/storage/app/${user.avathar}`;
    }, error => {
      this.errors = error.error;
    });
  }

}
