import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response, URLSearchParams, Jsonp, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class PrivateParkingService {
   

    constructor(private http: Http) {
      
   
    }


    //Extract result json data in specified format of rxjsObservable.
    private extractData(res: Response) {
       
        let results = res.json();

        let body = { "results": results }

        return body.results["result-set"].docs || {};
    }

    //Handle error if any.
    private handleError(error: Response | any) {
      
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.err || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }

    //Gets columns of alert explorer.
    getPrivateParkings(): Observable<any> {
        
        return this.http.get("http://localhost:5000/getPrivateParkings")
        .map(res => res.json())
            .map((res) => {
                
                return res;
            })

           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
           .catch(this.handleError)
    }



    //extract settings data
    private extractSettingData(res: Response) {

        let results = res.json();

        let body = { "results": results }

        return body.results || {};
    }
    logout() {
        localStorage.removeItem("Username");
        this.loggedIn = false;
      }
    
      isLoggedIn() {
        return this.loggedIn;
      }


}
