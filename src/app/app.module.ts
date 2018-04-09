import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DrawZoneComponent } from './draw-zone/draw-zone.component';
import { SpeechDetectionComponent } from './speech-detection/speech-detection.component';
import {SpeechService} from "./services/speech/speech.service";


@NgModule({
  declarations: [
    AppComponent,
    DrawZoneComponent,
    SpeechDetectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
