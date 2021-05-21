import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-box-component',
  templateUrl: './box-component.component.html',
  styleUrls: ['./box-component.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)',
  }
})

export class BoxComponentComponent implements OnInit {

  private readonly _addBoxFormBuilder = new FormBuilder();
  boxForm: FormGroup = this._addBoxFormBuilder.group({
    boxArray: this._addBoxFormBuilder.array([])
  });
  
  boxCount: number = 0;
  deletedBox: number = 0;

  constructor() { }

  ngOnInit(): void {}

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
    const moveBy = 8;
    const outerBoxWidth = document.querySelector<HTMLElement>(".outer")?.offsetWidth;
    const boxWidth = document.querySelector<HTMLElement>(".box")?.offsetWidth;
    const MaxWidth = Number(outerBoxWidth) - Number(boxWidth);
    const outerBoxHeight = document.querySelector<HTMLElement>(".outer")?.offsetHeight;
    const boxHeight = document.querySelector<HTMLElement>(".box")?.offsetHeight;
    const MaxHeight = Number(outerBoxHeight) - Number(boxHeight);
    selectedBoxes.forEach(element => {
      const id = element.value.id;
      const eleDoc = document.getElementById('box_' + (id));
      if(eleDoc){
        switch(moveDir){
          case "up":
            let currentUp = Number(eleDoc.style.top.replace(/\D/g, ""));
            eleDoc.style.top = currentUp > 0 ? String(currentUp-=moveBy) + "px": String(currentUp) + "px";
            break;
          case "down":
            let currentDown = Number(eleDoc.style.top.replace(/\D/g, ""));
            eleDoc.style.top = currentDown < (MaxHeight-moveBy) ? String(currentDown+=moveBy) + "px" : String(currentDown) + "px";;
            break;
          case "left":
            let currentLeft = Number(eleDoc.style.left.replace(/\D/g, ""))
            eleDoc.style.left = currentLeft > 0 ? String(currentLeft-=moveBy) + "px" : String(currentLeft) + "px";
            break;
          case "right":
            let currentRight = Number(eleDoc.style.left.replace(/\D/g, ""))
            eleDoc.style.left = currentRight < (MaxWidth-moveBy) ? String(currentRight+=moveBy) + "px" : String(currentRight) + "px";
            break;
        }
      }
    });
  }
}
