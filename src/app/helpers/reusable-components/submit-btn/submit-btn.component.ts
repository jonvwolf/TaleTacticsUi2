import { Component, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base-form-component';

export interface SubmitBtnOptions {
  enableFuncBtnDisable:boolean,
  btnText:string
};

const defaultSubmitBtnOptions:SubmitBtnOptions = {
  enableFuncBtnDisable: true,
  btnText: 'Submit'
};

export const createSubmitBtnOptions = (enableFuncBtnDisable:boolean, btnText:string):SubmitBtnOptions => {
  return {
    enableFuncBtnDisable,
    btnText,
  };
}

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent implements OnInit {

  @Input() public baseComponent:BaseFormComponent|null = null; 
  @Input() public options:SubmitBtnOptions = defaultSubmitBtnOptions;

  constructor() { }

  ngOnInit(): void {
  }

}
