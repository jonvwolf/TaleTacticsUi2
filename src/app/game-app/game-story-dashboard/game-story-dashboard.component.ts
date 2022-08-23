import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesEndpointsService } from 'src/app/core/api-endpoints/games-endpoints.service';
import { defaultReadGameStateModel, ReadGameStateModel } from 'src/app/core/api-models/read-game-state-model';
import { ReadStorySceneCommandModel } from 'src/app/core/api-models/read-story-scene-command-model';
import { ReadStorySceneModel } from 'src/app/core/api-models/read-story-scene-model';
import { actionHmSendCommand, actionHmSendCommandPredefined, actionJoinGameAsHm, HorrorMasterHubService, HubChangedEnum, listenReceiveBackHmCommandHubName, listenReceiveBackHmCommandPredefinedHubName, listenReceiveLogHubName } from 'src/app/core/horror-master-hub.service';
import { htConstants } from 'src/app/core/ht-constants';
import { emptyGameCodeModel, GameCodeModel } from 'src/app/core/hub-models/game-code-model';
import { checkIfHmCommandModel, HmCommandModel } from 'src/app/core/hub-models/hm-command-model';
import { checkIfHmCommandPredefinedModel, HmCommandPredefinedModel } from 'src/app/core/hub-models/hm-command-predefined-model';
import { checkIfTextLogModel } from 'src/app/core/hub-models/player-text-log-model';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements } from 'src/app/ui-helpers/secured-app-ui.service';
import { checkIfSmallGameMenuResult, SmallGameMenuComponent } from '../small-game-menu/small-game-menu.component';

const maxCurrentLogLines:number = 500;
const logLinesReduceTo:number = -20;

enum ComponentState {
  Working = 1,
  Ok = 2,
  Error = 3
}

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

  // indicator how many players have sent back command
  public playersReceivedCount = 0;
  // indicator for when HM is sending a command
  public commandSent:ComponentState = ComponentState.Working;
  // indicator for hub connection
  public hubConnection:ComponentState = ComponentState.Working;
  // make sure all players got the commands
  public playerReceived:ComponentState = ComponentState.Working;

  public errorState:ComponentState = ComponentState.Error;
  public okState:ComponentState = ComponentState.Ok;
  public workingState:ComponentState = ComponentState.Working;

  private gameCodeModel:GameCodeModel = emptyGameCodeModel;

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
    this.gameCodeModel = {
      gameCode: gameCode
    };

    this.subs.add(this.hub.eventHubChanged.subscribe((args) => {
      switch(args.hubChanged){
        case HubChangedEnum.Connected:
          this.isConnected = true;
          this.isReconnecting = false;
          this.hubConnection = ComponentState.Ok;
          this.addLogText('OK. Connected to hub');
          break;
        case HubChangedEnum.Connecting:
          this.isConnected = false;
          this.isReconnecting = true;
          this.hubConnection = ComponentState.Working;
          this.addLogText('--. Connecting to hub');
          break;
        case HubChangedEnum.Reconnecting:
          this.isConnected = false;
          this.isReconnecting = true;
          this.hubConnection = ComponentState.Working;
          this.addLogText('--. Reconnecting to hub');
          break;
        case HubChangedEnum.Disconnected:
          this.isConnected = false;
          this.isReconnecting = false;
          this.hubConnection = ComponentState.Error;
          this.addLogText('--. Disconnected to hub');
          break;
        default:
          this.hubConnection = ComponentState.Error;
          console.error('Unkown hub changed enum: ', args.hubChanged);
          throw new Error('Unkown hub changed enum: ' + args.hubChanged);
      }
    }));

    this.subs.add(this.hub.eventReceivedData.subscribe((args) => {
      if(args.hubName === listenReceiveLogHubName && checkIfTextLogModel(args.data)){
        this.addLogText(args.data.from + ': ' + args.data.message);
        return;
      }

      if(args.hubName === listenReceiveBackHmCommandHubName && checkIfHmCommandModel(args.data)){
        this.playersReceivedCount++;
        this.playerReceived = ComponentState.Ok;
        return;
      }
      
      if(args.hubName === listenReceiveBackHmCommandPredefinedHubName && checkIfHmCommandPredefinedModel(args.data)){
        this.playersReceivedCount++;
        this.playerReceived = ComponentState.Ok;
        return;
      }

      console.error('Invalid type returned by hub', args.data);
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

    this.hub.startConnection([listenReceiveLogHubName, listenReceiveBackHmCommandHubName, listenReceiveBackHmCommandPredefinedHubName]).then(() => {
      this.hub.invoke(actionJoinGameAsHm, this.gameCodeModel).then(() => {
        this.addLogText('OK. Joined as HM');
      }).catch((err) => {
        this.addLogText('ERR. Could not join as HM. Check console logs');
        console.error('Error trying to send command', err);
      });
    });
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

  public openMenu():void{
    var sheetRef = this.sheet.open(SmallGameMenuComponent);
    this.subs.add(sheetRef.afterDismissed().subscribe({
      next: (data) => {
        if(checkIfSmallGameMenuResult(data)){
          if(data.clearScreen){
            this.clearScreen();
          }else if(data.goToTop){
            // smooth not working
            this.homebtn?.nativeElement.scrollIntoView({behaivor:'smooth'});
          }else if(data.stopAllAudio){
            this.stopSoundEffects();
            this.stopBgm();
          }
        }else if(data === null || data === undefined){
          // do nothing
        }else{
          console.error('Invalid data for small game menu');
        }
      }
    }));
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

  public sendCommand(cmd:ReadStorySceneCommandModel):void{
    if(!this.isConnected){
      this.commandSent = ComponentState.Error;
      return;
    }

    const model:HmCommandModel = {};

    if(cmd.audios.length > 0){
      model.audioIds = cmd.audios.map((x) => x.id);
    }

    if(cmd.images.length > 0){
      model.imageId = cmd.images[0].id;
    }

    if(cmd.minigames.length > 0){
      model.minigameId = cmd.minigames[0].id;
    }

    if(cmd.timers.length > 0){
      model.timer = cmd.timers[0];
    }

    if(cmd.texts !== null && cmd.texts.length > 0){
      model.text = cmd.texts;
    }

    this.commandSent = ComponentState.Working;
    this.playerReceived = ComponentState.Working;
    this.playersReceivedCount = 0;

    this.hub.invoke(actionHmSendCommand, this.gameCodeModel, model).then((data) => {
      this.commandSent = ComponentState.Ok;
    }).catch((err) => {
      this.commandSent = ComponentState.Error;
      this.addLogText('ERR. Command was not sent. Check console logs');
      console.error('Error trying to send command', err);
    });
  }

  public clearScreen():void{
    const model:HmCommandPredefinedModel = {
      clearScreen: true
    };

    this.sendCommandPredefined(model);
  }

  public stopSoundEffects():void{
    const model:HmCommandPredefinedModel = {
      stopSoundEffects: true
    };

    this.sendCommandPredefined(model);
  }

  public stopBgm():void{    
    const model:HmCommandPredefinedModel = {
      stopBgm: true
    };

    this.sendCommandPredefined(model);
  }

  private sendCommandPredefined(model:HmCommandPredefinedModel):void{
    if(!this.isConnected){
      this.commandSent = ComponentState.Error;
      return;
    }

    this.commandSent = ComponentState.Working;
    this.playerReceived = ComponentState.Working;
    this.playersReceivedCount = 0;

    this.hub.invoke(actionHmSendCommandPredefined, this.gameCodeModel, model).then((data) => {
      this.commandSent = ComponentState.Ok;
    }).catch((err) => {
      this.commandSent = ComponentState.Error;
      this.addLogText('ERR. Command was not sent. Check console logs');
      console.error('Error trying to send command', err);
    });
  }
}
