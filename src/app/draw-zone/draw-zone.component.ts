import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {SpeechService} from "../services/speech/speech.service";
import {Canvas} from "../classes/canvas";
import {Command} from "../classes/command";

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class DrawZoneComponent implements AfterViewInit {
  @ViewChild('drawZone') drawZone;
  @ViewChild('historyBox') historyBox;

  private subscription: Subscription;
  private canvas: Canvas;

  public displayGrid: boolean;

  private words: string[] = [
    'Fireworks',
    'Flower',
    'Pumpkin',
    'Castle',
    'Cat',
    'Truck',
    'Car',
    'Computer',
    'Space',
    'House'
  ];

  public currentWord: string = this.words[Math.floor(Math.random() * this.words.length)];

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

  public toggleGrid() {
    this.displayGrid = !this.displayGrid;
    this.canvas.setDisplayGrid(this.displayGrid);
  }

  private onResize(event) {
    this.canvas.setSize();
  }

}
