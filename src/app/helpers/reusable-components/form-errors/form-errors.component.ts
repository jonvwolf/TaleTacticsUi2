import { Component, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base-form-component';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input() public baseComponent:BaseFormComponent|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
