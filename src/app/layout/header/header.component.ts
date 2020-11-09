import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedIn: boolean;

  constructor(private auth: AuthStateService, public router: Router, private token: TokenService) { }

  ngOnInit(): void {
    this.setState();
  }

  setState() {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
