import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
  }
})

export class BoxComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('box') box: ElementRef | undefined;

  boxArray: Array<number> = [];

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  addBox(){
    const id = this.boxArray.length;
    this.boxArray.push(id);
  }

  deleteBox(){
    this.boxArray.pop();
  }

  handleKeyboardEvents(event: any){
    const keys = event.code;
    if(this.box){
      switch(keys){
        case "ArrowRight":
        case "KeyD":
          const newLeftLoc = this.getNewLocation(Number(this.box.nativeElement.style.left.replace(/\D/g, "")), true);
          this.box.nativeElement.style.left = newLeftLoc;
          break;
        case "ArrowLeft":
        case "KeyA":
          const newRightLoc = this.getNewLocation(Number(this.box.nativeElement.style.left.replace(/\D/g, "")), false);
          this.box.nativeElement.style.left = newRightLoc;
          break;
        case "ArrowUp":
        case "KeyW":
          const newUpLoc = this.getNewLocation(Number(this.box.nativeElement.style.top.replace(/\D/g, "")), false);
          this.box.nativeElement.style.top = newUpLoc;
          break;
        case "ArrowDown":
        case "KeyS":
          const newDownLoc = this.getNewLocation(Number(this.box.nativeElement.style.top.replace(/\D/g, "")), true);
          this.box.nativeElement.style.top = newDownLoc;
          break; 
      }
    }
  }

  private getNewLocation(currentLocation: number, add:boolean){
    let newLoc;
    if(add){
      newLoc = String(currentLocation+=5) + "px";
    }
    else{
      newLoc = String(currentLocation-=5) + "px";
    }
    return newLoc;
  }

}
