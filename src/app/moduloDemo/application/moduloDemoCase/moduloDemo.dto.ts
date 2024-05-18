
export class ModuloDemoDTO {
  private id: string
  private name: string
  private description: string

  constructor(data: any) {
    this.id=data.id
    this.name=data.name
    this.description=data.description
  }

  getId(): string { return this.id }
  getName(): string { return this.name }
  getDescription(): string { return this.description }

  serialize() {
    return {
      id: this.getId(),
      name: this.getName(),
      description: this.getDescription()
    }
  }
}