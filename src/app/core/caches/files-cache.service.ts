import { Injectable } from '@angular/core';
import { Observable, of, Subscription, tap } from 'rxjs';
import { FilesEndpointsService } from 'src/app/files-endpoints.service';
import { ReadAudioModel } from '../api-models/read-audio-model';
import { ReadImageModel } from '../api-models/read-image-model';

@Injectable({
  providedIn: 'root'
})
export class FilesCacheService {

  private images:ReadImageModel[]|null = null;
  private audios:ReadAudioModel[]|null = null;

  constructor(private endpoints:FilesEndpointsService) {

  }

  public getImages(forceCall:boolean):Observable<ReadImageModel[]> {
    if(this.images !== null && !forceCall){
      return of(this.images);
    }
    return this.endpoints.getAllImages().pipe(tap(data => {
      this.images = data;
    }));
  }

  public getAudios(forceCall:boolean):Observable<ReadAudioModel[]> {
    if(this.audios !== null && !forceCall){
      return of(this.audios);
    }
    return this.endpoints.getAllAudios().pipe(tap(data => {
      this.audios = data;
    }));
  }
}
