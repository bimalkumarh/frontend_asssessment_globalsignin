import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mygame-info',
  templateUrl: './mygame-info.component.html',
  styleUrls: ['./mygame-info.component.css']
})
export class MygameInfoComponent implements OnInit {

  gameuid:string;
  gameId:number;
  gameInfo:any;
  playerOneLifeValue:number;
  playerTwoLifeValue:number;
  playerOneName:string;
  playerTwoName:string;
  recorder:Array<string> = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.gameId = params.id;
      }
    );
    this.mygameinfo({id:this.gameId});
  }

  mygameinfo(game) {
    this.userService.mygameinfo(game).subscribe(game => {
      this.gameuid = game.game_id;
      this.playerOneLifeValue = game.playerOneLifeValue;
      this.playerTwoLifeValue = game.playerTwoLifeValue;
      this.playerOneName = game.playerOneName;
      this.playerTwoName =game.playerTwoName;
      this.recorder = game.recorder;
    }, error => { });
  }
}
