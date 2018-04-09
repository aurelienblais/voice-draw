import {Component, NgZone, OnInit} from '@angular/core';

import {SpeechService} from "../services/speech/speech.service";
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-speech-detection',
  templateUrl: './speech-detection.component.html',
  styleUrls: ['./speech-detection.component.css'],
  providers: [SpeechService]
})
export class SpeechDetectionComponent implements OnInit {
  public isVoiceRecognitionActive: boolean;

  private subscription: Subscription;


  constructor(private speechService: SpeechService) {
    this.subscription = this.speechService.isActive$.subscribe(
      value => {
        this.isVoiceRecognitionActive = value;
      });

  }

  ngOnInit() {

  }

  startVoiceRecognition() {
    this.speechService.startVoiceRecognition();
  }

  stopVoiceRecognition() {
    this.speechService.stopVoiceRecognition();
  }


}
