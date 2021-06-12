import { element, browser } from 'protractor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendServiceService } from './../../Services/backend-service.service';
import {Chart} from 'node_modules/chart.js';

import jsPDF from 'jspdf'
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
import autoTable from 'jspdf-autotable'
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';
import { transition } from '@angular/animations';

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
  ngOnInit(): void {
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

  test() {
    alert('sdfsdf');
  }


  GetCollections() {
    this.Backend.get('api/Admin/GetCollections').then(data => {
      this.Collections = data;

    });
  }
  
  deleteCollection(id) {
    var r = confirm("are sure of the deleting process ?");
    if (r == true) {
      this.Backend.post('api/Admin/DeleteCollection?Id=' + id, null).then(data => {
        if (data == true) {
          this.GetCollections();
        }
      });
    } 

  }

  EditAdminInfoSucess: any = null;
  EditAdminInfo(Email/*FacebookURL,InstagramURL*/,Phone, Address) {
    
    this.Backend.post('api/Admin/EditAdminInfo?Email=' + Email + '&Phone=' + Phone + '&Address=' + Address, null).then(data => {
      this.EditAdminInfoSucess = data;
    });
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

  
}


