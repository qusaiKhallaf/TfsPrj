import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService } from './../../Services/backend-service.service';

import * as $ from "jquery";
@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {



  constructor(public Backend: BackendServiceService) {
   
    //translate.addLangs(['ar' , 'en']);
    //translate.setDefaultLang('en');
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|ar/) ?  browserLang  : 'en' );
    //// translate.getParsedResult('','',{  })

    //Backend.get('https://jsonplaceholder.typicode.com/posts').then(data => {
    ////  this.listOfUser = data;
    //   console.log(data);
    //});
}
  feedbackData: any = [];
  feedback: any = [];

  AdminInfo: any;

  Email: any;
  FacebookURL: any;
  InstagramURL: any;
  Phone: any;
  Address: any;
  Collections: any = [];
  Islogin: boolean = false;

  ngOnInit(): void {
    
  }


  NotCorrectPasswordAndUserName: boolean = false;
  Login(userName, password) {
    //alert($("#test").val());
  
    var loginData = {
      UserName: userName,
      Password: password,
    }
    this.Backend.post('api/Admin/Login', loginData).then(data => {
      if (data == true) {
        this.NotCorrectPasswordAndUserName = false;
        this.Islogin = true;
        this.init();
      } else {
        this.NotCorrectPasswordAndUserName = true;
      }
     
      

    });
  }

  init() {
    this.Backend.get('api/Admin/GetFeedback').then(data => {
      this.feedbackData = data;
      this.feedback = data.slice(0, 10);
    });

    this.Backend.get('api/Admin/GetAdminInfo').then(data => {
      this.AdminInfo = data;
      this.Email = data.Email;
      this.FacebookURL = data.FacebookURL;
      this.InstagramURL = data.InstagramURL;
      this.Phone = data.Phone;
      this.Address = data.Address;
    });

    this.GetCollections();
  }


  GetCollections() {
    this.Backend.get('api/Admin/GetCollections').then(data => {
      this.Collections = data;

    });
  }

  _CollectionToDelete = null;
  CollectionToDelete(id) {
    this.DeleteCollectionStatus = null;
    this._CollectionToDelete = id;
  }
  DeleteCollectionStatus = null;
  deleteCollection(password) {
    this.DeleteCollectionStatus = null;
    var r = confirm("are sure of the deleting process ?");
    if (r == true) {
      var collectionToDeleteData = {
        Id: this._CollectionToDelete,
        Password: password,
      }
      this.Backend.put('api/Admin/DeleteCollection', collectionToDeleteData , []).then(data => {
        if (data == 1) 
          this.GetCollections();

        this._CollectionToDelete = null;
        this.DeleteCollectionStatus = data;
         
      });
    } 

  }

  EditAdminInfoSucess: any = null;
  EditAdminInfo(Email, FacebookURL, InstagramURL, Phone, Address, Password) {
    if (Password != "") {
      var AdminInfo = {
        Email: Email,
        FacebookURL: FacebookURL,
        InstagramURL: InstagramURL,
        Phone: Phone,
        Address: Address,
        Password: Password
      }
      this.Backend.post('api/Admin/EditAdminInfo', AdminInfo).then(data => {
        this.EditAdminInfoSucess = data;
      });
    }
  }


  pageNumber = 1; 
  pagination(pNumber) {
    if (this.feedbackData.slice((((pNumber - 1) * 10) - 1), (pNumber*10 -1) ).length > 0 || pNumber == 1 ) {
      this.pageNumber = pNumber;
      if (pNumber == 1) {
        this.feedback = this.feedbackData.slice(0, 10);
      } else {
        this.feedback = this.feedbackData.slice((((pNumber - 1) * 10) - 1), (pNumber * 10 - 1) );

      }
    }
  }

  Next() {
    if (this.feedbackData.slice((((this.pageNumber) * 10) - 1), (this.pageNumber + 1  * 10 - 1) ).length > 0) {
      this.pageNumber = this.pageNumber + 1;
      this.feedback = this.feedbackData.slice((((this.pageNumber - 1) * 10) - 1), (this.pageNumber * 10 - 1));
    }

  }

  Previous() {

    if (this.pageNumber > 1 ) {
      this.pageNumber = this.pageNumber - 1;

      if (this.pageNumber == 1) {
        this.feedback = this.feedbackData.slice(0, 10);
      } else {
        this.feedback = this.feedbackData.slice((((this.pageNumber - 1) * 10) - 1), (this.pageNumber * 10 - 1));
      }
    }
  }

  AddCollectionStatus = null;

  //_CollectionPassword;
  allFile: any = [];
  AddCollection(Name, Description, Password) {
    if (Password != "" && Description != "" && Name != "") {
      if (this.file != null && this.file2 != null) {
        var collectionInfo = {
          Name: Name,
          Description: Description,
          Password: Password
        }
        this.allFile.push(this.file);
        for (var i = 0; i < this.file2.length; i++) {
          this.allFile.push(this.file2[i])
        }
        this.Backend.put('api/Admin/AddCollection', collectionInfo, this.allFile).then(data => {
          $("#inputfile").val(null);
          $("#inputfile2").val(null);
          this.clearFile(1);
          this.clearFile(2);
          this.AddCollectionStatus = data;
          this.GetCollections();

        });
      }
    }
  }


  clear(a) {
    if (a == 1)
      $("#inputfile").val(null);
    else
      $("#inputfile2").val(null);
  }


  file = null;
  fileName = null;

  file2 = null;
  fileName2 = null;

  clearFile(data) {
    if (data == 1) {
      this.file = null;
      this.fileName = '';
    } else {
      this.file2 = null;
      this.fileName2 = '';
    }
  }


  fileInputChange(file) {
    this.clearFile(1);
    if (file?.target?.files[0]?.name) {
      this.file = file.target.files[0];
      this.fileName = file.target.files[0].name;
    }
  }


  fileInputChange2(file2) {
    this.clearFile(2);
    if (file2?.target?.files[0]?.name) {
      this.file2 = file2.target.files;

     
      this.fileName2 = file2.target.files[0].name;
    }
  }


}


