import { Component, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../base-form-component';

@Component({
  selector: 'app-loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.scss']
})
export class LoaderOverlayComponent implements OnInit {

  @Input() public baseComponent:BaseFormComponent|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
