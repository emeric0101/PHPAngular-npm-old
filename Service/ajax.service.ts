import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class AjaxService {
  constructor (private http: Http) {}
    public get<T>(
        url : string
    ): Observable<T> {
        return this.http
        .get(url)
        .map(this.extractData)
        .catch(this.handleError);
    }

  public post<T> (
      url: string,
      args
  ): Observable<T> {
     let body = JSON.stringify(args);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

     return this.http.post(url, body, options)
                     .map(this.extractData)
                     .catch(this.handleError);
   }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
