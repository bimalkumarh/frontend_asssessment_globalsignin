import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthStateService } from '../../services/auth-state.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.css']
})
export class MygamesComponent implements OnInit {

  mygames: any = [];

  constructor(
    private userService: UserService,
    private auth: AuthStateService,
    public router: Router,
    private token: TokenService) { }

  ngOnInit(): void {
    this.getmygames();
  }

  getmygames() {
    this.userService.mygames().subscribe(games => {
      this.mygames = games;
    }, error => { });
  }

}
