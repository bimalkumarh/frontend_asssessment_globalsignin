import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthStateService } from '../../services/auth-state.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  isSignedIn: boolean;
  errors = null;
  isPlayStart: boolean = false;

  defaultLimit: number = 10;
  counterLimit: number = this.defaultLimit;
  counter: number;
  interval: any;

  user_id: string;
  isPlayerOnesTurn: boolean;
  isOver: boolean = false;
  playerOneLifeValue: number = 100;
  playerTwoLifeValue: number = 100;
  playerOneName: string = '';
  playerTwoName: string = 'Dragon';
  recorder: Array<string>;

  constructor(
    private userService: UserService,
    private auth: AuthStateService,
    public router: Router,
    private token: TokenService) { }

  ngOnInit(): void {
    this.setState();
    this.checkLogin();
    this.getprofile();
  }

  getprofile() {
    this.userService.userprofile().subscribe(user => {
      this.playerOneName = user.full_name;
    }, error => {
      this.errors = error.error;
    });
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

  startPlay() {
    this.isPlayStart = true;
    this.initPlay();
    this.startTimer();
  }

  startTimer() {

    this.counter = this.counterLimit;
    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.finishGame()
      }
    }, 1000)
  }

  finishGame() {
    this.saveGame();
    this.isOver = true;
    this.recorder = [];
    this.counterLimit = this.defaultLimit;
    this.isPlayStart = false;
    clearInterval(this.interval);
  }

  attack() {
    this.playTurn();
  }

  initPlay() {
    this.userService.initPlay().subscribe(game => {
      console.log('game', game);

      this.user_id = game.user_id;
      this.isPlayerOnesTurn = game.isPlayerOnesTurn;
      this.isOver = game.isOver;
      this.playerOneLifeValue = game.playerOneLifeValue;
      this.playerTwoLifeValue = game.playerTwoLifeValue;
      this.playerOneName = game.playerOneName;
      this.playerTwoName = game.playerTwoName;
      this.recorder = game.recorder;
    },
      error => {
        this.errors = error.error;
      });
  }

  playTurn() {
    this.userService.playTurn({
      user_id: this.user_id, isPlayerOnesTurn: this.isPlayerOnesTurn, isOver: this.isOver, playerOneLifeValue: this.playerOneLifeValue,
      playerTwoLifeValue: this.playerTwoLifeValue, playerOneName: this.playerOneName, playerTwoName: this.playerTwoName,
      recorder: this.recorder
    }).subscribe(game => {
      console.log('game', game);

      this.user_id = game.user_id;
      this.isPlayerOnesTurn = game.isPlayerOnesTurn;
      this.isOver = game.isOver;
      this.playerOneLifeValue = game.playerOneLifeValue;
      this.playerTwoLifeValue = game.playerTwoLifeValue;
      this.playerOneName = game.playerOneName;
      this.playerTwoName = game.playerTwoName;
      this.recorder = game.recorder;
    },
      error => {
        this.errors = error.error;
      });
  }

  giveup() {
    this.playerOneLifeValue = 0;
    this.recorder.push(`${this.playerOneName} give up`);
    this.finishGame();
  }

  heal() {
    let healingpPotion: number = Math.floor((Math.random() * 10) + 1);
    this.playerOneLifeValue = this.playerOneLifeValue + healingpPotion;
    this.recorder.push(`${this.playerOneName}'s health is increased by ${healingpPotion}`);
  }

  saveGame() {
    this.userService.saveGame({
      user_id: this.user_id, playerOneLifeValue: this.playerOneLifeValue, playerTwoLifeValue: this.playerTwoLifeValue,
      playerOneName: this.playerOneName, playerTwoName: this.playerTwoName,
      recorder: this.recorder
    }).subscribe(game => {
      console.log('game', game);
    },
      error => {
        this.errors = error.error;
      });
  }
}
