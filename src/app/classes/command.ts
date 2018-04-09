export class Command {
  constructor(
    public target: string,
    public value: string
  ) {}


  public toString() {
    return this.target + ': ' + this.value;
  }

}
