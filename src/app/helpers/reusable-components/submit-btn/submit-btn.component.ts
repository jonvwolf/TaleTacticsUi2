import { Component, Input, OnInit } from '@angular/core';
import { IFormComponent } from '../../base-form-component';

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

  @Input() public formComponent:IFormComponent|null = null; 
  @Input() public options:SubmitBtnOptions = defaultSubmitBtnOptions;

  public get isBtnDisabled():boolean { 
    if(this.formComponent === null)
      return false;
    return this.options.enableFuncBtnDisable && this.formComponent.isSubmitBtnDisabled; 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
