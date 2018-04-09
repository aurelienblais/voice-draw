import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {SpeechService} from "../services/speech/speech.service";
import {Canvas} from "../classes/canvas";
import {Command} from "../classes/command";

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.css']
})
export class DrawZoneComponent implements AfterViewInit {
  @ViewChild('drawZone') drawZone;
  @ViewChild('historyBox') historyBox;

  private subscription: Subscription;
  private canvas: Canvas;

  constructor(private speechService: SpeechService) {
    this.subscription = this.speechService.lastCommand$.subscribe(
      value => {
        this.canvas.execute(value);
        this.historyBox.nativeElement.innerHTML = value.toString() + '<br />' + this.historyBox.nativeElement.innerHTML;
      });
  }

  ngAfterViewInit() {
    this.canvas = new Canvas(this.drawZone.nativeElement);
    this.canvas.execute(new Command('background', 'white'));
  }

}
