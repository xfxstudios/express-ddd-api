export class Account {
  constructor(public id: string, public name: string) {}

  public changeName(newName: string): void {
    this.name = newName;
  }
}