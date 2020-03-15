# GameOfLifeAngularClientT1

live demo on heroku
https://powerful-garden-29441.herokuapp.com/

## Development server
Run `ng install` to download dependency files, then
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

to Change server url, under src/app/service/gameservice.ts, 
const SERVER_URL = 'wss://calm-depths-57678.herokuapp.com';  --> you can change to localhost for development here


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Coding concept
When a new user enter this application, 
1. initialization, ask server side userid, userColor, boardSize(n*n checkerboard) --> render the page & websocket connection established

2. Radio box for predefined patterns, default is single point. When user clicks on the checkerboard, send a message back to server { clickPattern(base on radio box), clickLocation, userId }

3. server provides checkerboard color info once per second by websocket connection, when client app receive the color info, rerender the page (draw).

## Coding files

/src/app/components/board/board.component.ts 
 --> contains must of the logic operations 
 1. receive from server, init & draw 
 2. send to server,  init & click & restart
 
/src/app/service/gameservice.ts  
--> interact with server by websocket

/src/app/models/
--> models
1.InitBoardInfo { 
    currentPlayer: string; 
    boardSize: number;
 }
2.SquareInfo {
    r: number;
    g: number;
    b: number;
    locationX: number;
    locationY: number;
 }



## unFinish part
1. unit test
2. some features: stop, restart
3. display other users info
