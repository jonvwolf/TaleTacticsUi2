import { Component, Input, OnInit } from '@angular/core';
import { IFormComponent } from '../../base-form-component';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss']
})
export class LoaderOverlayComponent implements OnInit {

  @Input() public formComponent:IFormComponent|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
