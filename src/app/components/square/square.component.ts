import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input('rgbColor') rgbColor: string;
  @Input('locationX') locationX: number = 0;
  @Input('locationY') locationY: number = 0;
  @Output('onSquareClick') onSquareClick: EventEmitter<number[]> = new EventEmitter();

  disable: boolean = false;
  

  handleClick() {
    if(!this.disable){
      let location = [this.locationX,this.locationY];
      this.onSquareClick.emit(location);
      this.disable = true;
    }else
      console.log("click too many time");

  }

}