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

   baseUrl = "http://localhost/TempProject/API/";


  get(url, bShowLoading: boolean = true): Promise<any> {
    if (url) {
     // var a = "http://localhost/TempProject/API/";

      var _url = this.baseUrl + url;  
        return this.http.get(_url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
            .finally(() => {
     
            });
    }
  }

  headers: any;
  //post(url, data, _files?: any): Promise<any> {
  //  if (url) {
  //    this.headers = new Headers();
  //    this.headers.set('Content-Type', 'multipart/form-data');

  //    var a = "http://localhost/TempProject/API/";

  //    var _url = a + url;
  //    var formData = new FormData();

  //    if (_files != undefined) {
  //      formData.append("name", "Name");
  //      formData.append("file", _files.files[0]);
  //    }

  //    return this.http.post(_url,
  //      formData,
  //      {
  //        headers: this.headers

  //      }).toPromise()
  //      .then(this.extractData)
  //      .catch(this.handleError)
  //      .finally(() => {

  //      });



  //  }
  //}


  post(url, obj, files?: any[]): Promise<any> {
    var HasUploadFile = false;
    if (!(obj instanceof Array)) {
      Object.keys(obj).forEach(key => {
        if (obj[key] && obj[key].Id && (typeof (obj[key]) == 'object') && !(obj[key] instanceof Date) && !(obj[key] instanceof Array) && !(obj[key] instanceof File)) {
          obj[key] = obj[key].Id;
        }
        if (key == 'Id' && !obj[key]) {
          obj[key] = undefined;
        }
        else if ((obj[key] instanceof Date)) {
          var Offset = (new Date(obj[key]).getTimezoneOffset() * -1 / 60);
          var _date: Date = new Date(obj[key]);
          _date.setHours(_date.getHours() + Number(Offset));
          obj[key] = _date;
        }
        if ((obj[key] instanceof File)) {
          HasUploadFile = true;
        }
        if (files) {
          if (obj[key] && obj[key][0] instanceof File)
            HasUploadFile = true;
        }
      }
      );
    }
    if (HasUploadFile || files) {
      const formdata = new FormData();
      if (obj instanceof Array)
        formdata.append("data", JSON.stringify(obj));
      else {
        Object.keys(obj).forEach(key => {
          if (!(obj[key] instanceof Array))
            formdata.append(key, obj[key])
          else
            formdata.append(key, JSON.stringify(obj[key]));
        });
      }

      if (files) {
        files.forEach((file, index) => {
          formdata.append('file_' + index, file)
        });
      }
      return this.http.post<any>(this.baseUrl + url, formdata)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError)
        .finally(() => {
        });
    }
    else {
      return this.http.post<any>(this.baseUrl + url, obj)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError)
        .finally(() => {

        });
    }
  }


  put(url, obj, files?: any[]): Promise<any> {
  var HasUploadFile = false;

  if (!(obj instanceof Array)) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && obj[key].Id && (typeof (obj[key]) == 'object') && !(obj[key] instanceof Date) && !(obj[key] instanceof Array) && !(obj[key] instanceof File)) {

        obj[key] = obj[key].Id;
      }
      if (key == 'Id' && !obj[key]) {
        obj[key] = undefined;
      }
      else if ((obj[key] instanceof Date)) {
        var Offset = (new Date(obj[key]).getTimezoneOffset() * -1 / 60);
        var _date: Date = new Date(obj[key]);
        _date.setHours(_date.getHours() + Number(Offset));
        obj[key] = _date;

      }
      //else if ((obj[key] instanceof GregorianCalendarDate)) {
      //  obj[key] = `${obj[key].calendarStart.month}/${obj[key].calendarStart.day}/${obj[key].calendarStart.year}`; //Missing locale data for the locale "ar-jo".
      //}

      if ((obj[key] instanceof File)) {
        HasUploadFile = true;
      }
      if (files) {
        if (obj[key] && obj[key][0] instanceof File)
          HasUploadFile = true;
      }
    }
    );
  }

  if (HasUploadFile || files) {
    const formdata = new FormData();
    if (obj instanceof Array)
      formdata.append("data", JSON.stringify(obj));
    else {
      Object.keys(obj).forEach(key => {
        if (!(obj[key] instanceof Array))
          formdata.append(key, obj[key])
        else
          formdata.append(key, JSON.stringify(obj[key]));
      });
    }

    if (files) {
      files.forEach((file, index) => {
        formdata.append('file_' + index, file)
      });
    }
    return this.http.put<any>(this.baseUrl + url, formdata)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
      .finally(() => {

      });
  }
  else {
    return this.http.put<any>(this.baseUrl + url, obj)
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
