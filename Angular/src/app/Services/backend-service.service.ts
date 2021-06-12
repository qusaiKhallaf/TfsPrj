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
      var a = "http://localhost/TempProject/API/";

        var _url = a +  url  ;  
        return this.http.get(_url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
            .finally(() => {
     
            });
    }
  }

  headers: any;
  post(url, data, _files?: any): Promise<any> {
    if (url) {
      this.headers = new Headers();
      this.headers.set('Content-Type', 'multipart/form-data');

      var a = "http://localhost/TempProject/API/";

      var _url = a + url;
      var formData = new FormData();

      if (_files != undefined) {
        formData.append("name", "Name");
        formData.append("file", _files.files[0]);
      }

      return this.http.post(_url,
        formData,
        {
          headers: this.headers

        }).toPromise()
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
