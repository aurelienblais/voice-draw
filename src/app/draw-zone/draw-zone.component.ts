import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {SpeechService} from "../services/speech/speech.service";

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.css']
})
export class DrawZoneComponent implements AfterViewInit {
  @ViewChild('drawZone') drawZone;

  public lastCommand: boolean;

  private subscription: Subscription;

  constructor(private speechService: SpeechService) {
    this.subscription = this.speechService.lastCommand$.subscribe(
      value => {
        this.lastCommand = value.toString();
        value.execute(this.drawZone.nativeElement);
      });
  }

  ngAfterViewInit() {}




}
