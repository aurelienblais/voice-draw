import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Command} from "../../classes/command";

declare let annyang: any;

@Injectable()
export class SpeechService {
  private isVoiceRecognitionActive = new Subject<boolean>();
  private lastValue = new Subject<Command>();

  public isActive$ = this.isVoiceRecognitionActive.asObservable();
  public lastCommand$ = this.lastValue.asObservable();

  private commands = {
    'up': () => {
      this.setCommand('stroke', 'up')
    },
    'down': () => {
      this.setCommand('stroke', 'down')
    },
    'left': () => {
      this.setCommand('stroke', 'left')
    },
    'right': () => {
      this.setCommand('stroke', 'right')
    },
    'draw :status': (status) => {
      this.setCommand('draw', status)
    }
    'background :value': (value) => {
      this.setCommand('background', value)
    }
  };

  constructor() {
    annyang.debug(true);
    annyang.addCommands(this.commands);
    annyang.start({ paused: true });
  }

  public startVoiceRecognition() {
    annyang.resume();
    this.isVoiceRecognitionActive.next(true);
  }

  public stopVoiceRecognition() {
    annyang.pause();
    this.isVoiceRecognitionActive.next(false);
  }

  private setCommand(target, value) {
    this.lastValue.next(new Command(target, value));
  }

}
