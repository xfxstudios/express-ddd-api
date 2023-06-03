
export class TesterrorDTO {
  private url: string

  constructor(data: any) {
    this.url=data.url
  }

  getUrl(): string {
    return this.url
  }

  serialize() {
    return {
      url: this.getUrl()
    }
  }
}