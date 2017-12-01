import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response, URLSearchParams, Jsonp, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('Username');
   
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
    getUserCredentials(usernmame: string,password:string): Observable<any> {
        
        return this.http.get("http://localhost:5000/getUserParkMe?Username="+usernmame+"&Password=" + password)
        .map(res => res.json())
            .map((res) => {
                
                if(res != false) {
                  localStorage.setItem("Username", usernmame);
                  localStorage.setItem("UserId", res);
                  this.loggedIn = true;
                }
                return res;
            })

           // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
           .catch(this.handleError)
    }

        //Gets columns of alert explorer.
        setUserCredentials(usernmame: string,password:string): Observable<any> {
            
            return this.http.get("http://localhost:5000/setUserParkMe?Username="+usernmame+"&Password=" + password)
            .map(res => res.json())
                .map((res) => {
                   
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
