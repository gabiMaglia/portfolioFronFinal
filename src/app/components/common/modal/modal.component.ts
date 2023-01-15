import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: String = ""
  @Input() form?:FormGroup 
  public obj?: any

  modalSwitch:Boolean = false;
  
  constructor() { 
    
  }
  
  ngOnInit(): void {
    
  }

  openModal (obj: any):void {
    this.obj = obj
    this.modalSwitch = true
  }

  closeModal ():void {
    this.modalSwitch = false
  }
}
