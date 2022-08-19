import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesEndpointsService } from 'src/app/core/api-endpoints/games-endpoints.service';
import { defaultReadGameStateModel, ReadGameStateModel } from 'src/app/core/api-models/read-game-state-model';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { HorrorMasterHubService, HubChangedEnum, listenReceiveLogHubName } from 'src/app/core/horror-master-hub.service';
import { htConstants } from 'src/app/core/ht-constants';
import { PlayerTextLogModel } from 'src/app/core/hub-models/player-text-log-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements } from 'src/app/ui-helpers/secured-app-ui.service';
import { SmallGameMenuComponent } from '../small-game-menu/small-game-menu.component';

const maxCurrentLogLines:number = 500;
const logLinesReduceTo:number = -20;

@Component({
  selector: 'app-game-story-dashboard',
  templateUrl: './game-story-dashboard.component.html',
  styleUrls: ['./game-story-dashboard.component.scss']
})
export class GameStoryDashboardComponent extends BaseFormComponent implements OnInit, OnDestroy {

  public scenePrefix = 'scene_';
  public gameCode:string = '';
  public gameState:ReadGameStateModel = defaultReadGameStateModel;
  public isConnected = false;
  public isReconnecting = false;

  public get canConnect():boolean { return !this.isConnected && !this.isReconnecting; }
  public get canDisconnect():boolean { return this.isConnected && !this.isReconnecting; }

  private logLines:string[] = [];
  public logText:string = '';

  @ViewChild('homebtn') homebtn:ElementRef|null = null;

  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Game dashboard'
  }; }

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private endpoints:GamesEndpointsService,
    private hub:HorrorMasterHubService, private sheet:MatBottomSheet) {
    super();
  }

  override ngOnDestroy():void{
    this.disconnectFromHub();

    super.ngOnDestroy();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.startLoadAndClearErrors();

    const gameCode = this.getStringParam(htConstants.gameGameCodeParamName, this.activatedRoute);
    const storyId = this.getNumberParam(htConstants.gameStoryIdParamName, this.activatedRoute);
    if(gameCode === null || storyId === null){
      this.router.navigate(htConstants.pathSecuredHome);
      return;
    }

    this.gameCode = gameCode;

    this.subs.add(this.hub.eventHubChanged.subscribe((args) => {
      switch(args.hubChanged){
        case HubChangedEnum.Connected:
          this.isConnected = true;
          this.isReconnecting = false;
          this.addLogText('OK. Connected to hub');
          break;
        case HubChangedEnum.Connecting:
          this.isConnected = false;
          this.isReconnecting = true;
          this.addLogText('--. Connecting to hub');
          break;
        case HubChangedEnum.Reconnecting:
          this.isConnected = false;
          this.isReconnecting = true;
          this.addLogText('--. Reconnecting to hub');
          break;
        case HubChangedEnum.Disconnected:
          this.isConnected = false;
          this.isReconnecting = false;
          this.addLogText('--. Disconnected to hub');
          break;
        default:
          console.error('Unkown hub changed enum: ', args.hubChanged);
          throw new Error('Unkown hub changed enum: ' + args.hubChanged);
      }
    }));

    this.subs.add(this.hub.eventReceivedData.subscribe((args) => {
      if(args.hubName === listenReceiveLogHubName){
        const model = args.data as PlayerTextLogModel;
        if(model === null || model.playerName === undefined){
          // todo: do not use console
          console.error('Invalid type returned by hub', args.data);
        }else{
          this.addLogText(model.playerName + ': ' + model.message)
        }
      }
    }));

    this.subs.add(this.endpoints.get(gameCode).subscribe({
      next: (data) => {
        this.gameState = data;
        this.endLoad();
        this.addLogText('OK. Got game state from endpoint');

        this.connectToHub();
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public disconnectFromHub():void {
    if(!this.canDisconnect){
      return;
    }

    // success or fail, assume the connection is dropped regardless
    this.hub.stopConnection();
  }

  public connectToHub():void {
    if(!this.canConnect){
      return;
    }

    this.hub.startConnection([listenReceiveLogHubName]);
  }

  private addLogText(log:string):void {
    const max = maxCurrentLogLines;
    const reduceTo = logLinesReduceTo;

    log += '\n';
    this.logLines.push(log);
    
    if(this.logLines.length >= max){
      this.logLines = this.logLines.slice(reduceTo);
      
      this.logText = '';
      for(let i = this.logLines.length - 1; i > 0; i--){
        this.logText += this.logLines[i];
      }
    }else{
      this.logText = log + this.logText;
    }
  }

  public goToTop():void{
    var sheetRef = this.sheet.open(SmallGameMenuComponent);
    // TODO: this.homebtn?.nativeElement.scrollIntoView({behaivor:'smooth'});
  }
  public goBack():void{
    // no need to disconnect, on ng destroy it disconnects
    this.router.navigate(htConstants.pathSecuredHome);
  }

  public goToScene(scene:ReadStorySceneModel):void{
    var elem = document.getElementById(this.scenePrefix + scene.id);
    if(elem){
      elem.scrollIntoView({behavior: 'smooth'});
    }
  }

  public sendCommand(scene:ReadStorySceneModel):void{

  }

  public clearScreen():void{

  }

  public stopSoundEffects():void{

  }

  public stopBgm():void{

  }
}
