import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-CameraLibrary';


  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }
  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.btnLabel = 'Re-Capture Image'
  }
  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width:500,
        height:500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = "My camera is connected"
      this.btnLabel = 'Capture image';
    }).catch(err =>{
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied, please try again'
      } else {
        this.status = 'No camera detected, please try again'
      }
    })
  }


  captureImage() {
    this.trigger.next();
  }

  proceed(){
    console.log(this.previewImage);
  }
}
