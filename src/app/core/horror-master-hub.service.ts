import { EventEmitter, Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

export const listenReceiveLogHubName = 'HmReceiveLog';

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

  constructor() {

  }

  // TODO: change to async?
  public startConnection(hubNames: string[]):Promise<void> {
    if(this.hub !== null){
      return new Promise(res => { res(); });
    }

    if(hubNames.length === 0){
      throw new Error('hubNames are required');
    }

    this.hubNames = hubNames;

    this.hub = new HubConnectionBuilder()
      .withUrl(environment.apiHost + '/game-hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
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
      // This is called when it fails to reconnect
      this.resetConnection();
      console.error('Error. Hub connection closed', err)
      this._eventHubChanged.next({hubChanged: HubChangedEnum.Disconnected});
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
    this.resetConnection();
    this._eventHubChanged.next({hubChanged: HubChangedEnum.Disconnected});

    stopHub.stop()
      .catch((err) => {
        //todo: do not use console.error
        console.error('Error trying to stop hub', err);
      });
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
