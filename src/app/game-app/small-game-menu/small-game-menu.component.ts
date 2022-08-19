import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export interface SmallGameMenuResult {
  stopAllAudio?: boolean,
  clearScreen?: boolean,
  goToTop?: boolean
}

export const checkIfSmallGameMenuResult = (obj:any): obj is SmallGameMenuResult => {
  return obj && ('stopAllAudio' in obj || 'clearScreen' in obj || 'goToTop' in obj);
};

@Component({
  selector: 'app-small-game-menu',
  templateUrl: './small-game-menu.component.html',
  styleUrls: ['./small-game-menu.component.scss']
})
export class SmallGameMenuComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<SmallGameMenuComponent>) {

  }

  ngOnInit(): void {
  }

  public stopAllAudio(event:MouseEvent):void{
    event.preventDefault();

    const result:SmallGameMenuResult = {
      stopAllAudio: true
    };
    this.bottomSheetRef.dismiss(result);
  }
  public clearScreen(event:MouseEvent):void{
    event.preventDefault();

    const result:SmallGameMenuResult = {
      clearScreen: true
    };
    this.bottomSheetRef.dismiss(result);
  }
  public goToTop(event:MouseEvent):void{
    event.preventDefault();

    const result:SmallGameMenuResult = {
      goToTop: true
    };
    this.bottomSheetRef.dismiss(result);
  }
}
