
export class ModuloDemoDTO {
  private value: string

  constructor(data: any) {
    this.value=data.value
  }

  getValue(): string {
    return this.value
  }

  serialize() {
    return {
      value: this.getValue()
    }
  }
}