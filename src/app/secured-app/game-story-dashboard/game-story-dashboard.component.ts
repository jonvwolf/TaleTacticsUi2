import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesEndpointsService } from 'src/app/core/api-endpoints/games-endpoints.service';
import { StoriesEndpointsService } from 'src/app/core/api-endpoints/stories-endpoints.service';
import { defaultReadStoryModel, ReadStoryModel } from 'src/app/core/api-models/read-story-model';
import { HorrorMasterHubService } from 'src/app/core/horror-master-hub.service';
import { htConstants } from 'src/app/core/ht-constants';
import { BaseFormComponent } from 'src/app/ui-helpers/base-form-component';
import { SecuredAppUiGeneralElements, SecuredAppUiService } from 'src/app/ui-helpers/secured-app-ui.service';

const maxCurrentLogLines:number = 500;
const logLinesReduceTo:number = -20;

@Component({
  selector: 'app-game-story-dashboard',
  templateUrl: './game-story-dashboard.component.html',
  styleUrls: ['./game-story-dashboard.component.scss']
})
export class GameStoryDashboardComponent extends BaseFormComponent implements OnInit {

  public gameCode:string = '';
  public story:ReadStoryModel = defaultReadStoryModel;
  public isConnected = false;
  public isConnecting = false;
  public isDisconnecting = false;

  private logLines:string[] = [];
  public logText:string = '';

  public override get initialGeneralElements():SecuredAppUiGeneralElements { return {
    headerTitle: 'Game dashboard'
  }; }

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private endpoints:GamesEndpointsService,
    private hub:HorrorMasterHubService) {
    super();
  }

  override ngOnInit(): void {
    this.subs.add(this.hub.eventHubClosed.subscribe(() => {
      this.addLogText('Reconnection to hub failed. ERR');
      this.isConnected = false;
      this.isConnecting = false;
    }));

    this.subs.add(this.hub.eventHubReconnected.subscribe(() => {
      this.addLogText('Reconnection to hub was a success. OK');
      this.isConnecting = false;
      this.isConnected = true;
    }));

    this.subs.add(this.hub.eventHubReconnecting.subscribe(() => {
      this.isConnecting = true;
      this.isConnected = true;
      this.addLogText('Connection to hub lost Reconnecting...');
    }));

    this.startLoadAndClearErrors();

    const gameCode = this.getStringParam(htConstants.gameGameCodeParamName, this.activatedRoute);
    const storyId = this.getNumberParam(htConstants.gameStoryIdParamName, this.activatedRoute);
    if(gameCode === null || storyId === null){
      this.router.navigate(htConstants.pathSecuredHome);
      return;
    }

    this.gameCode = gameCode;

    this.subs.add(this.endpoints.get(gameCode).subscribe({
      next: (data) => {
        this.connectToHub();
        this.story = data;
        this.endLoad();
        this.addLogText('Got story from endpoint. OK');
      },
      error: (err) => {
        this.endLoadAndHandleError(err);
      }
    }));
  }

  public disconnectFromHub():void {
    if(!this.isConnected){
      this.addLogText('Connection to hub does not exist. Connect first.');
      return;
    }
    if(this.isConnecting){
      this.addLogText('Reconnectiong is in progress. Please wait...');
      return;
    }
    if(this.isDisconnecting){
      this.addLogText('Disconnecting is in progress. Please wait...');
      return;
    }
    this.isDisconnecting = true;
    // success or fail, assume the connection is dropped regardless
    this.hub.stopConnection()
      .then(() => {
        this.isConnected = false;
        this.isConnecting = false;
        this.isDisconnecting = false;
        this.addLogText('Disconnected from hub. OK');
      }).catch(() => {
        this.isConnected = false;
        this.isConnecting = false;
        this.isDisconnecting = false;
        this.addLogText('Disconnected from hub but there was an error. ERR');
      });
  }

  public connectToHub():void {
    if(this.isConnected){
      this.addLogText('Connection to hub is OK. Disconnect first.');
      return;
    }
    if(this.isConnecting){
      this.addLogText('Reconnectiong is in progress. Please wait...');
      return;
    }
    // TODO: isConnected/isConnecting should go inside the hub service
    this.isConnected = false;
    this.isConnecting = true;
    this.addLogText('Connecting to hub...');
    
    this.hub.startConnection()
      .then(() => {
        this.addLogText('Connected to hub. OK')
        this.isConnected = true;
        this.isConnecting = false;
      })
      .catch(() => {
        this.addLogText('Error starting connection to hub. ERR');
        this.isConnected = false;
        this.isConnecting = false;
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
}
