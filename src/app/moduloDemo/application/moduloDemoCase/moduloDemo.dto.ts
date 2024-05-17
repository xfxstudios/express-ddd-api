
export class ModuloDemoDTO {
  private id: string
  private name: string

  constructor(data: any) {
    this.id=data.id
    this.name=data.name
  }

  getId(): string { return this.id }
  getName(): string { return this.name }

  serialize() {
    return {
      id: this.getId(),
      name: this.getName()
    }
  }
}