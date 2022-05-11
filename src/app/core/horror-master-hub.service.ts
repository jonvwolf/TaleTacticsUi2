import { EventEmitter, Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { PlayerTextLogModel } from './hub-models/player-text-log-model';

const listenReceiveLogHubName = 'HmReceiveLog';
const hubRetries = [5, 10, 10];
@Injectable({
  providedIn: 'root'
})
export class HorrorMasterHubService {

  // TODO: is it better to use observables from rxjs?
  private internalEventReceiveLog = new EventEmitter<PlayerTextLogModel>();
  public get eventReceiveLog():EventEmitter<PlayerTextLogModel> { return this.internalEventReceiveLog; }

  private internalEventHubClosed = new EventEmitter<any>();
  public get eventHubClosed():EventEmitter<any> { return this.internalEventHubClosed; }

  private internalEventHubReconnecting = new EventEmitter<any>();
  public get eventHubReconnecting():EventEmitter<any> { return this.internalEventHubReconnecting; }

  private internalEventHubReconnected = new EventEmitter<any>();
  public get eventHubReconnected():EventEmitter<any> { return this.internalEventHubReconnected; }

  private hub:HubConnection|null = null;

  constructor() {

  }

  public startConnection():Promise<void> {
    if(this.hub !== null){
      return new Promise(res => { res(); });
    }

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
      this.internalEventHubReconnecting.next('');
    });

    this.hub.onreconnected((connId) => {
      this.internalEventHubReconnected.next(connId);
    });

    this.hub.onclose((err) => {
      // This is called when it fails to reconnect
      this.resetConnection();
      console.error('Error. Hub connection closed', err)
      this.internalEventHubClosed.next('');
    });

    return this.hub.start()
      .then(() => {
        this.listenOnReceiveLog();
      })
      .catch((err) => {
        this.resetConnection();
        console.error('Error trying to start hub', err);
      });
  }

  // TODO: change to async?
  public stopConnection(): Promise<void> {
    if(this.hub === null){
      return new Promise(res => { res(); });
    }
    const stopHub = this.hub;
    this.resetConnection();
    return stopHub.stop()
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
    this.hub?.off(listenReceiveLogHubName);
  }

  private listenOnReceiveLog(){
    this.hub?.on(listenReceiveLogHubName, (data) => {
      const model = data as PlayerTextLogModel;
      if(model === null || model.playerName === undefined){
        // todo: do not use console
        console.error('Invalid type returned by hub', data);
      }
      
      this.internalEventReceiveLog.next(model);
    });
  }
}
