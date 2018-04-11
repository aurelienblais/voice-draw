export class Canvas {
  private baseUnit;

  private canvas;
  private context;

  public displayGrid = false;

  private width;
  private height;
  private ratio;

  private commands;

  public currentX;
  public currentY;

  constructor(public elem) {
    this.canvas = elem;
    this.context = this.canvas.getContext('2d');

    this.commands = [];

    this.setSize();
  }

  public execute(command) {
    this.commands.push(command);
    this.redraw();
  }

  public setSize() {
    devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio || 1;

    this.ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      let oldWidth = this.canvas.parentElement.offsetWidth * 0.6;
      let oldHeight = this.canvas.parentElement.offsetWidth * 0.6;

      this.canvas.width = oldWidth * this.ratio;
      this.canvas.height = oldHeight * this.ratio;

      this.canvas.style.width = oldWidth + 'px';
      this.canvas.style.height = oldHeight + 'px';

      this.context.scale(this.ratio, this.ratio);
    }

    this.baseUnit = 5 * this.ratio;
    this.redraw();

  }

  public setDisplayGrid(displayGrid) {
    this.displayGrid = displayGrid;
    this.redraw();
  }

  public redraw() {
    this.currentX = this.canvas.width / (2 * this.ratio);
    this.currentY = this.canvas.height / (2 * this.ratio);

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.displayGrid)
      this.drawGrid();

    let that = this;
    this.commands.forEach(function (command) {
      that.draw(command);
    });

    this.drawCross(this.currentX, this.currentY);
  }

  private draw(command) {
    console.log('Drawing: ' + command.toString());

    if (command.target === 'background') {
      this.drawRectangle(command.value, 0, 0, this.width, this.height);
    }

    if (command.target === 'stroke') {
      if (command.value === 'up') {
        let oldY = this.currentY;

        if (this.currentY - 5 > 0)
          this.currentY -= this.baseUnit;
        this.drawLine(this.currentX, oldY, this.currentX, this.currentY);
      }

      if (command.value === 'down') {
        let oldY = this.currentY;

        if (this.currentY + this.baseUnit < this.canvas.height)
          this.currentY += this.baseUnit;
        this.drawLine(this.currentX, oldY, this.currentX, this.currentY);
      }

      if (command.value === 'left') {
        let oldX = this.currentX;

        if (this.currentX - this.baseUnit > 0)
          this.currentX -= this.baseUnit;
        this.drawLine(oldX, this.currentY, this.currentX, this.currentY);
      }

      if (command.value === 'right') {
        let oldX = this.currentX;

        if (this.currentX + this.baseUnit < this.canvas.width)
          this.currentX += this.baseUnit;
        this.drawLine(oldX, this.currentY, this.currentX, this.currentY);
      }
    }

    if (command.target === 'circle') {
      this.drawCircle(this.currentX, this.currentY, command.value);
    }
  }

  private drawRectangle(color, minX, minY, maxX, maxY) {
    this.context.fillStyle = color;
    this.context.fillRect(minX, minY, maxX, maxY);
  }

  private drawCross(posX, posY) {
    this.drawLine(posX - this.baseUnit, posY, posX + this.baseUnit, posY, '#b9b9b9');
    this.drawLine(posX, posY - this.baseUnit, posX, posY + this.baseUnit, '#b9b9b9');
  }

  private drawLine(minX, minY, maxX, maxY, color = 'black') {
    this.context.beginPath();
    this.context.strokeStyle = color;

    this.context.moveTo(minX, minY);
    this.context.lineTo(maxX, maxY);

    this.context.stroke();
    this.context.closePath();
  }

  private drawCircle(posX, posY, radius, color = 'black') {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.arc(posX, posY, radius * this.ratio, 0, 2 * Math.PI, false);
    this.context.stroke();
    this.context.closePath();
  }

  private drawGrid() {
    for (let x = 0; x <= this.elem.width; x += this.baseUnit) {
      this.drawLine(x, 0, x, this.elem.height, '#f0f0f0');
    }

    for (var y = 0; y <= this.elem.height; y += this.baseUnit) {
      this.drawLine(0, y, this.elem.width, y, '#f0f0f0');
    }
  }
}
