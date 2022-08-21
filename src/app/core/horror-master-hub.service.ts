import { EventEmitter, Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { GameCodeModel } from './hub-models/game-code-model';
import { UserSessionService } from './user-session.service';

export const listenReceiveLogHubName = 'HmReceiveLog';
export const listenReceiveBackHmCommandHubName = 'HmReceiveBackHmCommand';
export const listenReceiveBackHmCommandPredefinedHubName = 'HmReceiveBackHmCommandPredefined';

export const actionJoinGameAsHm = 'JoinGameAsHm';
export const actionHmSendCommand = 'HmSendCommand';
export const actionHmSendCommandPredefined = 'HmSendCommandPredefined';

const hubRetries = [5, 10, 10];

export enum HubChangedEnum {
  None = 0,
  Connected,
  Connecting,
  Reconnecting,
  Disconnected
}

interface HubChangedEventArg {
  hubChanged:HubChangedEnum
}

interface HubReceivedDataEventArg {
  hubName:string,
  data:any
}

@Injectable({
  providedIn: 'root'
})
export class HorrorMasterHubService {

  private _eventReceivedData = new EventEmitter<HubReceivedDataEventArg>();
  public get eventReceivedData():EventEmitter<HubReceivedDataEventArg> { return this._eventReceivedData; }

  // TODO: is it better to use observables from rxjs?
  private _eventHubChanged = new EventEmitter<HubChangedEventArg>();
  public get eventHubChanged():EventEmitter<HubChangedEventArg> { return this._eventHubChanged; }

  private hub:HubConnection|null = null;
  private hubNames: string[] = [];

  private manualDisconnecting = false;

  constructor(private session:UserSessionService) {

  }

  // TODO: change to async?
  public startConnection(hubNames: string[]):Promise<void> {
    if(this.hub !== null){
      return new Promise(res => { res(); });
    }

    // Temp fix for when stop, start are called very fast
    this.manualDisconnecting = false;

    if(hubNames.length === 0){
      throw new Error('hubNames are required');
    }

    this.hubNames = hubNames;

    this.hub = new HubConnectionBuilder()
      .withUrl(environment.apiHost + '/game-hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        //accessTokenFactory: this.session.jwt
      })
      .withAutomaticReconnect(hubRetries)
      .build();

    // TODO: I think the callback references are marked as to be cleaned once `this.hub` is set to null
    this.hub.onreconnecting((err) => {
      // This is called only once (the first retry)
      console.error('Hub reconnecting', err);
      this._eventHubChanged.next({hubChanged: HubChangedEnum.Reconnecting});
    });

    this.hub.onreconnected((connId) => {
      this._eventHubChanged.next({hubChanged: HubChangedEnum.Connected});
    });

    this.hub.onclose((err) => {
      // This is called when it fails to reconnect or when calling disconnect
      if(this.manualDisconnecting === false){
        console.error('Error. Hub connection closed', err)
        this.resetConnection();
        this._eventHubChanged.next({hubChanged: HubChangedEnum.Disconnected});
      }
    });

    this._eventHubChanged.next({hubChanged: HubChangedEnum.Connecting});
    return this.hub.start()
      .then(() => {
        this.setupListeners();
        this._eventHubChanged.next({hubChanged: HubChangedEnum.Connected});
      })
      .catch((err) => {
        this.resetConnection();
        console.error('Error trying to start hub', err);
        this._eventHubChanged.next({hubChanged: HubChangedEnum.Disconnected});

        throw err;
      });
  }

  public stopConnection() : void {
    if(this.hub === null){
      return;
    }
    const stopHub = this.hub;

    // when calling `stop` it will still call `onclose` event, that's why `manualStop`
    this.manualDisconnecting = true;
    this.resetConnection();
    this._eventHubChanged.next({hubChanged: HubChangedEnum.Disconnected});

    stopHub.stop()
      .finally(() => {
        this.manualDisconnecting = false;  
      })
      .catch((err) => {
        //todo: do not use console.error
        console.error('Error trying to stop hub', err);
      });
  }

  public invoke(hubAction:string, gameCode:GameCodeModel, model?:any):Promise<any>{
    if(this.hub === null){
      return new Promise((res, rej) => { rej(); });
    }

    if(model !== undefined && model !== null){
      return this.hub.invoke(hubAction, gameCode, model);
    }

    return this.hub.invoke(hubAction, gameCode);
  }

  private resetConnection():void {
    if(this.hub === null){
      return;
    }
    this.removeListeners();
    this.hub = null;
  }

  private removeListeners():void {
    for(let hubName of this.hubNames){
      this.hub?.off(hubName);
    }
  }

  private setupListeners(){
    for(let hubName of this.hubNames){
      this.hub?.on(hubName, (data) => {
        this._eventReceivedData.next({hubName: hubName, data: data});
      });
    }
  }
}
