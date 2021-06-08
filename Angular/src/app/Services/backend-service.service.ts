import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  constructor(private http: HttpClient) { }

  get userList (){

    return ["qusai" , "ahmad" , "khallaf" ] ;
  }  


   
  get(url, bShowLoading: boolean = true): Promise<any> {
    if (url) {
        var _url = url  ;  
        return this.http.get(_url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
            .finally(() => {
     
            });
    }
 }

 private extractData(res: any) {
  if (typeof (res) === "object" /*&& res.text() == ''*/) {
      return res;
  }
  else {
      var result = (typeof (res) === "object") ? res.json() || {} : res;
      return result;
  }
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error);
}


}
