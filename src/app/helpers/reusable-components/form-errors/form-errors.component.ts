import { Component, Input, OnInit } from '@angular/core';
import { IFormComponent } from '../../base-form-component';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input() public formComponent:IFormComponent|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
