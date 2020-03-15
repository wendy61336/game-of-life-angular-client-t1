import { Component, ViewChildren, QueryList } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { SquareInfo } from '../../models/squareinfo';
import { GameService } from 'src/app/service/gameservice';


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers:  [GameService]
})
export class BoardComponent {
  @ViewChildren(SquareComponent) private squareList: QueryList<SquareComponent>;
  boardSize: number;
  boardSizeList: number[];
  squreMatrix: SquareComponent[][];

  currentPlayer: string = '';
  rgbColor: string = '';
  patterns = ['Single','Blinker','Block','Toad','Beehive'];
  clickPattern: string = 'Single';
  clickLocation: number[] = [];
  disable: boolean = false;
  

  private gameService: GameService;


  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit() {  
    this.gameService.initBoard();
    
    // 接收到消息
    this.gameService.socket.onmessage = (e) => this.onMessage(e);
    this.gameService.socket.onerror = (e) => console.log(JSON.stringify(e));

  }

  restart(){
    this.gameService.restart();
  }

  onMessage(ev: MessageEvent){
    let serverMessage = JSON.parse(ev.data);
    if(serverMessage.action === 'draw'){
      let squareInfoList:SquareInfo[] =  JSON.parse(serverMessage.content); 
      //console.log(squareInfoList);
      this.drawBoard(squareInfoList);
    }else if(serverMessage.action === 'init'){
      this.initBoard(serverMessage);
    }


  }

  drawBoard(squareInfoList:SquareInfo[]) {

    for(var s of squareInfoList){
      let currentSquare = this.getSquare(s.locationX,s.locationY);
      currentSquare.rgbColor = "rgb("+s.r+","+s.g+","+s.b+")";
      currentSquare.disable = false;
    }

  }

  handleSquareClick(squareLocation: number[]) {
    // call backend service 
      this.gameService.sendClick(squareLocation,this.clickPattern,this.currentPlayer);
      console.log(squareLocation[0] + " "+ squareLocation[1]);

  }

  
  private initBoard(serverMessage: any){
    this.boardSize = serverMessage.boardSize;
    this.currentPlayer = serverMessage.currentPlayer;
    this.rgbColor =  "rgb("+serverMessage.r+","+serverMessage.g+","+serverMessage.b+")";;
    this.boardSizeList = Array(this.boardSize);
    console.log(this.boardSize);
    console.log(this.currentPlayer);
    
  }

  private getSquare(locationX: number,locationY: number ): SquareComponent {
    // initialize squreMatrix
    if(this.squreMatrix === undefined){
      this.squreMatrix = new Array(this.boardSize);
      let index = 0;
      for(let s of this.boardSizeList){
        this.squreMatrix[index++] = new Array(this.boardSize);
      }
     // console.log(this.squreMatrix);
      this.squareList.forEach((square) => {
        this.squreMatrix[square.locationX][square.locationY] = square;
      });

    }

    return this.squreMatrix[locationX][locationY];
  }

 
}
