export interface IRequestService {
  setProvider(data:string): any;
  setMethod(data:string|boolean): any;
  setUrl(data:string): any;
  setHeaders(data:object): any;
  setBody(data:any, qs:boolean): any;
  setQuery(data:any, qs:boolean): any;
  doRequest(data:any, qs:boolean): Promise<any>;
}