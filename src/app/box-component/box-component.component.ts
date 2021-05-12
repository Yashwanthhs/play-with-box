import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
  }
})

export class BoxComponentComponent implements OnInit, AfterViewInit {
  private readonly _addBoxFormBuilder = new FormBuilder();
  boxForm: FormGroup = this._addBoxFormBuilder.group({
    boxArray: this._addBoxFormBuilder.array([])
  });
  
  boxCount: number = 0;
  deletedBox: number = 0;

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  addBox(){
    const boxgroup = {
      id: this.boxCount++,
      isSelected: false
    };
    const boxes = this.getBoxes();
    boxes.push(this._addBoxFormBuilder.control(boxgroup))
  }

  getBoxes(){
    return this.boxForm.get('boxArray') as FormArray;
  }

  deleteBox(){
    const boxes = this.getBoxes().controls;
    const selectedBoxes = boxes.filter(box => box.value.isSelected === true);
    selectedBoxes.forEach(box => {
      const index = boxes.findIndex(eleBox => eleBox.value.id == box.value.id);
      this.getBoxes().removeAt(index);
      this.deletedBox++;
    });
  }

  handleCheckBoxEvent(id: any){
    const boxes = this.getBoxes().controls;
    let selectedBox = boxes.find(box => box.value.id === id);
    if(selectedBox){
      const ele = selectedBox.value.isSelected;
      selectedBox.value.isSelected = ele ? false : true; 
    }
  }

  handleKeyboardEvents(event: any){
    const keys = event.code;
      switch(keys){
        case "ArrowRight":
        case "KeyD":
          this.updateLocationForSelectedBox("right");
          break;
        case "ArrowLeft":
        case "KeyA":
          this.updateLocationForSelectedBox("left");
          break;
        case "ArrowUp":
        case "KeyW":
          this.updateLocationForSelectedBox("up");
          break;
        case "ArrowDown":
        case "KeyS":
          this.updateLocationForSelectedBox("down");
          break; 
      }
  }

  private updateLocationForSelectedBox(moveDir: any){
    const boxes = this.getBoxes().controls;
    const selectedBoxes = boxes.filter(box => box.value.isSelected === true);
    selectedBoxes.forEach(element => {
      const id = element.value.id;
      const eleDoc = document.getElementById('box_' + (id));
      if(eleDoc){
        switch(moveDir){
          case "up":
            console.log("UP");
            const newUpLoc = this.getNewLocation(Number(eleDoc.style.top.replace(/\D/g, "")), false);
            eleDoc.style.top = newUpLoc;
            break;
          case "down":
            console.log("DOWN");
            const newDownLoc = this.getNewLocation(Number(eleDoc.style.top.replace(/\D/g, "")), true);
            eleDoc.style.top = newDownLoc;
            break;
          case "left":
            console.log("LEFT");
            const newLeftLoc = this.getNewLocation(Number(eleDoc.style.left.replace(/\D/g, "")), false);
            eleDoc.style.left = newLeftLoc;
            break;
          case "right":
            console.log("RIGHT");
            const newRightLoc = this.getNewLocation(Number(eleDoc.style.left.replace(/\D/g, "")), true);
            eleDoc.style.left = newRightLoc;
            break;
        }
      }
      console.log(eleDoc);
    });
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
