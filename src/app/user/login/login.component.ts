import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors = null;
  formLogin: FormGroup;
  submitted = false;

  constructor(
    public router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private token: TokenService,
    private authState: AuthStateService) { }

  ngOnInit(): void {
    this.initializeFields();
  }

  onSubmit(loginData) {
    if (this.formLogin.valid) {
      this.userService.login(loginData).subscribe(user => {
        this.responseHandler(user)
      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.formLogin.reset()
        this.router.navigate(['dashboard']);
      });
    }
    this.submitted = true;
  }

  get f() { return this.formLogin.controls; }

  initializeFields() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  responseHandler(data){
    this.token.handleData(data.access_token);
  }

}
