import { Injectable } from '@angular/core';
import { InitBoardInfo } from '../models/initboardinfo';
import { SquareInfo } from '../models/squareinfo';


const SERVER_URL = 'ws://calm-depths-57678.herokuapp.com';

@Injectable()
export class GameService {

     socket: WebSocket;
     
     initBoard(): void {
        this.initSocket();
     }
     private initSocket(): void {
        this.socket = new WebSocket(SERVER_URL);
        this.socket.onopen = function () {
            console.log('websocket is connected ...');
            let returnMessage = {
                action: 'init'
            };
            this.send(JSON.stringify(returnMessage));
        }

    }


    sendClick(clickLocation1: number[], clickPattern1: string, currentPlayer1: string): void {
        let returnMessage = {
            action: 'click',
            clickLocation: clickLocation1,
            clickPattern: clickPattern1,
            currentPlayer: currentPlayer1
        };
    
        this.socket.send(JSON.stringify(returnMessage));
    }

    restart(){
        let returnMessage = {
            action: 'restart',
        };

        this.socket.send(JSON.stringify(returnMessage));
    }




    

  
}
