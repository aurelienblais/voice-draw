export class Command {
  constructor(
    public target: string,
    public value: string
  ) {}


  public toString() {
    return this.target + ': ' + this.value;
  }

  public execute(element) {
    let canvas = element.getContext("2d");
    let width = element.width;
    let height = element.height;

    if (this.target === 'background') {
      canvas.fillStyle = this.value;
      canvas.fillRect(0,0, width, height);
    }

    this.drawGrid(element);
  }

  private drawGrid(element) {
    let context = element.getContext("2d");
    let width = element.width;
    let height = element.height;

    let squareSize = Math.round((width + height) / 100);

    for (var x = 0.5; x < width; x += squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }

    for (var y = 0.5; y < height; y += squareSize) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }

    context.strokeStyle = "#d1d1d1";
    context.lineWidth = 1;
    context.stroke();

  }
}
